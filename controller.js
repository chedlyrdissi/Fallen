// required packages
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var fs = require('fs');
// const {Translate} = require('@google-cloud/translate').v2;
const translate = require("@vitalets/google-translate-api");

// read the data file
function readData(fileName){
    let dataRead = fs.readFileSync('./data/' + fileName + '.json');
    let infoRead = JSON.parse(dataRead);
    return infoRead;
}

// read the data file
function writeData(info, fileName){
    let data = JSON.stringify(info);
    fs.writeFileSync('./data/' + fileName + '.json', data);
}

function getGameByTitle(title, games) {
    // console.log('getGameByTitle');
    // console.log(title);
    for ( let game of games ) {
        // console.log(game);
        if ( game.title == title ) {
            return game;
        }
    }
}

function getArticleByGameTitle(title, articles) {
    let res = [];
    for (let art of articles) {
        if (art.game == title) {
            res.push(art);
        }
    }
    return res;
}

function getArticleByTitle(title, articles) {
    for ( let art of articles ) {
        // console.log(game);
        if ( art.title == title ) {
            return art;
        }
    }
}

function auth(username, password, strict = true) {
    for (let user of readData('users')) {
        if (user.username === username){
            if ( strict ) {
                if (user.password === password) {
                    return user;
                }      
            } else {
                return user;
            }
        }
    }
}

function addUser(username, password) {
    let users = readData('users');
    let newUser = {
        username: username,
        password: password,
        id: generateId(username, password)
    };
    users.push(newUser);
    writeData(users, 'users');
    return newUser;
}

function generateId(username, password) {
    let res = username.slice(0);
    for(let i=0; i<password.length; i++) {
        res += String.fromCharCode(password.charCodeAt(i)+i);
    }
    return res;
}

async function translateText(text, language, done){
    translate(text, {to: language}).then(res=>{
        // return Promise.resolved(res);
        done(res);
        return res;
    });
}

async function translateTextAndInsert(article){
    var title = article.title;
    var body = article.body;
    var translated = 0;
    article.body = {};
    for(let lang of ['en', 'de']) {        
        translate(body, {to: lang}).then(res=>{
            article.body[lang] = res.text;
            translated++;
            if (translated === 2) {
                let data = readData('articles');
                data.push(article);
                writeData(data, 'articles');
            }
        });       
    }
}

function validUser(id) {
    const users = readData('users');
    for (let u of users) {
        if (u.id === id) {
            return true;
        }
    }
    return false;
}

function validTitle(title) {
    const artDe = readData('articles');
    for (let u of artDe) {
        if (u.title == title) {
            return false;
        }
    }
    return true;
}

function findCommentBase(base, comments) {
    // console.log('base');
    // console.log(base);
       
    for(let com of comments) {
        // console.log(com);
        if (base === com.id) {
            // console.log('match');
            return com;
        }
        // console.log('no match');
        let val = findCommentBase(base, com.replies, "id");
        if (val) {
            // console.log('no return');
            return val;
        }
    }
}

// This is the controler per se, with the get/post
module.exports = {
    controller: function(app){

        // parse application/x-www-form-urlencoded
        app.use(bodyParser.urlencoded({ extended: false }))

        // parse application/json
        app.use(bodyParser.json())

        app.get('/home', function(req, res){
            let data = {};
            data.games = readData('games');
            // console.log(req);
            res.send(data);
        });

        app.get('/search/:title', urlencodedParser, function(req, res){
 
            let data = {};
            const title = req.params.title;
            let allGames = readData('games');
            let allArticles = readData('articles');

            data.games = allGames;
            if ( title.length !== 0 ){                
                data.games = data.games.filter(function(item){
                    return title === item.title;
                }, title);
            }

            // data.articles = readData('articles');
            let art = allArticles;
            data.articles = [];
            if ( title.length === 0 ) {
                data.articles = allArticles;
                for ( let article of data.articles ) {
                    article.game = getGameByTitle(article.game, allGames);
                }
            } else {
                for (let game of data.games) {
                    for (let a of getArticleByGameTitle(game.title, art)) {
                        data.articles.push( a );
                    }
                }

                for ( let article of data.articles ) {
                    article.game = getGameByTitle(article.game, data.games);
                }
            }
            // console.log(data);
            res.send(data);
            // res.send("works");
        });

        app.get('/article/:title', urlencodedParser, function(req, res){

            let title = req.params.title;
            var data = {};

            data.article = getArticleByTitle(title, readData('articles'));

            if (data.article) {           
                data.game = getGameByTitle(data.article.game ,readData('games'));
                data.comments = [];
                let coms = readData('comments');
                for (let com of coms) {
                    if (com.article === req.params.title) {
                        data.comments = com.comments;
                    }
                }             
            }             
            res.send(data);    
        });

        app.post('/log-in', urlencodedParser, (req, res) => {
            // console.log('logging in');
            let user = auth(req.body.username, req.body.password);
            if (user === undefined) {
                user = {
                    valid: false,
                    message: 'NO_SUCH_USER'
                };
            } else {
                user.valid = true;
                user.password = undefined;
            }
            res.send(user);
            // console.log('logging in');
        });

        app.post('/edit/article/:userId', urlencodedParser, async (req, res) => {
            // console.log(req.body);
            // console.log(req.params);
            const userId = req.params.userId;
            let data = {};
            // get data
            let newArticle = {
                title: req.body.title,
                body: req.body.body,
                rank: 99,
                game: req.body.game,
                user: req.params.userId
            }

            data.article = newArticle;

            const articles = readData('articles');
            const users = readData('users');

            if (validUser(userId)) {
                if(validTitle(newArticle.title)) {
                    // console.log('valid title and user');    
                    data.valid = true;
                    // translate title
                    newArticle.title = newArticle.title.trim();
                    translateTextAndInsert(newArticle);
                } else {
                    // console.log('notvalid');
                    data.valid = false;
                    data.titleInvalid = true;
                    data.message = 'TITLE_UNAVAILABLE';                    
                }
            } else {
                // console.log('notvalid');
                data.valid = false;
                data.message = 'NO_SUCH_USER';
            }

            res.send(data);
        });

        app.post('/sign-up', urlencodedParser, (req, res) => {
            // console.log('signing up');
            // console.log(req.body);
            let user = auth(req.body.username, req.body.password, false);
            if ( user ) {
                // user exists
                user = {
                    valid: false,
                    message: 'username is unavailable'
                }
            } else {
                user = addUser(username, password);
                user.valid = true;
                user.password = undefined;
            }
            res.send(user);
            // console.log('signing up');
        });

        app.post('/comment/:title', urlencodedParser, (req, res) => {
            // console.log(req.params);
            // console.log(req.body);

            let data = readData('comments');
            let comments;
            let found = false;
            for(let sec of data) {
                if (sec.article === req.params.title) {
                    comments = sec.comments;
                    found = true;
                    break;
                }
            }

            if (found) {
                // console.log(comments);
                let dest;
                // console.log(req.body.base);
                // console.log(req.params.title);
                if (req.body.base !== req.params.title) {
                    // there's a base
                    // console.log('base exists');
                    // console.log(findCommentBase(req.body.base, comments));
                    findCommentBase(req.body.base, comments).replies.push({
                        "id": req.body.commentId,
                        "userId": req.body.id,
                        "username": req.body.username, 
                        "comment": req.body.comment,
                        "replies": []
                    });

                    for(let sec of data) {
                        if (sec.article === req.params.title) {
                            sec.comments = comments;
                            break;
                        }
                    }
                    writeData(data, 'comments');
                    // console.log(JSON.stringify(comments));
                    // writeData(comments, 'comments');
                    // console.log(dest);
                } else {
                    // article comment
                    comments.push({
                        "id": req.body.commentId,
                        "userId": req.body.id,
                        "username": req.body.username, 
                        "comment": req.body.comment,
                        "replies": []
                    });
                    for(let sec of data) {
                        if (sec.article === req.params.title) {
                            sec.comments = comments;
                        }
                    }
                    writeData(data, 'comments');
                    // console.log('base doesn\'t exist');
                    // console.log(comments);                
                }
            } else {
                data.push(
                    {
                        article: req.params.title,
                        comments: [
                            {
                                "id": req.body.commentId,
                                "userId": req.body.id,
                                "username": req.body.username, 
                                "comment": req.body.comment,
                                "replies": []
                            }
                        ]
                    }
                );
                writeData(data, 'comments');
            }

            // console.log(findCommentBase(req.body.base, comments, (req.body.base.indexOf('.') > 0)? 'id':'title'));

            res.send({});
        });

        app.get('/payment/:title', urlencodedParser, function(req, res){
            // console.log(req.params.title);

            let title = req.params.title;
            let data = {};
            
            for (let game of readData('games')) {
                if (game.title == title) {
                    data.game = game;
                    break;
                }
            }

            let discount = readData('discount');
            data.discount = discount.discount;

            res.send(data);
        });
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function wait(ms) {
    await sleep(ms);
}
async function myTranslateFn(text, lang){
    let res = await translate(text, {to: lang}); 
    return res.text;
}
