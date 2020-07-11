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
    let artEn = readData('articles-en');
    artEn.push(article);

    let artDe = readData('articles-de');
    artDe.push(article);

    writeData(artEn, 'articles-en');
    writeData(artDe, 'articles-de');

    var title = article.title;

    for(let lang of ['en', 'de']) {        
        translate(article.title, {to: lang}).then(res=>{
            let articles = readData('articles-'+lang);
            // console.log(articles);
            for(let art of articles){
                if (art.title === title){
                    art.title = res.text;
                }
            }
            writeData(articles, 'articles-'+lang);
        });
        translate(article.body, {to: lang}).then(res=>{
           let articles = readData('articles-'+lang);
            // console.log(articles);
            for(let art of articles){
                if (art.title === title){
                    art.body = res.text;
                }
            }
            writeData(articles, 'articles-'+lang); 
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
    const artEn = readData('articles-en');
    for (let u of artEn) {
        if (u.title == title) {
            return false;
        }
    }
    const artDe = readData('articles-de');
    for (let u of artDe) {
        if (u.title == title) {
            return false;
        }
    }
    return true;
}


// This is the controler per se, with the get/post
module.exports = {
    controller: function(app){

        // parse application/x-www-form-urlencoded
        app.use(bodyParser.urlencoded({ extended: false }))

        // parse application/json
        app.use(bodyParser.json())

        app.get('/home/:language', function(req, res){
            let data = {};
            data.games = readData('games');
            // console.log(req);
            res.send(data);
        });

        app.get('/search/:title/:language', urlencodedParser, function(req, res){
            
            // console.log(req.params.title);
            // writeData(req, 'method');     
            // console.log(req.params);       
            let data = {};
            const title = req.params.title;
            let allGames = readData('games');
            let allArticles = readData('articles-'+req.params.language);

            data.games = allGames;
            if ( title.length !== 0 ){                
                data.games = data.games.filter(function(item){
                    return title == item.title;
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

        app.get('/article/:title/:language', urlencodedParser, function(req, res){

            let title = req.params.title;
            var data = {};

            data.article = getArticleByTitle(title, readData('articles-'+req.params.language));

            // for (let article of data.article) {
            //     // translate title
            //     translateText(article.title, req.params.language, (response) => {
            //         article.title = response.text;
            //         done++;
            //     });
            //     // translate body
            //     translateText(article.body, req.params.language, (response) => {
            //         article.body = response.text;
            //         done++;
            //     });                
            // }
            if (data.article) {     
                let transTitle = myTranslateFn(data.article.title, req.params.language);           
                let transBody = myTranslateFn(data.article.body, req.params.language);           
                // translate(data.article.title, {to: req.params.language}).then(res=>{
                    
                //     data.article.title = res.text;

                //     translate(data.article.body, {to: req.params.language}).then(res=>{

                //         data.article.body = res.text;

                //     }); 
                // });    
                // while (typeof transTitle !== 'string' && typeof transBody !== 'string') {

                // }
                // data.article.title = transTitle;
                // data.article.body = transBody;
                data.game = getGameByTitle(data.article.game ,readData('games')); 

                console.log(data);     
                res.send(data);
                
            
            } else {
                res.send(data);    
            }             
        });

        app.post('/log-in', urlencodedParser, (req, res) => {
            console.log('logging in');
            let user = auth(req.body.username, req.body.password);
            if (user === undefined) {
                user = {
                    valid: false,
                    message: 'No such user exists'
                };
            } else {
                user.valid = true;
                user.password = undefined;
            }
            res.send(user);
            console.log('logging in');
        });

        app.post('/edit/article/:language/:userId', urlencodedParser, async (req, res) => {
            console.log(req.body);
            console.log(req.params);
            const language = req.params.language;
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

            const articles = readData('articles-'+language);
            const users = readData('users');

            if (validUser(userId)) {
                if(validTitle(newArticle.title)) {
                    console.log('valid title and user');    
                    data.valid = true;
                    // translate title
                    translateTextAndInsert(newArticle);
                } else {
                    console.log('notvalid');
                    data.valid = false;
                    data.titleInvalid = true;
                    data.message = 'TITLE_UNAVAILABLE';                    
                }
            } else {
                console.log('notvalid');
                data.valid = false;
                data.message = 'NO_SUCH_USER';
            }

            res.send(data);
        });

        app.post('/sign-up', urlencodedParser, (req, res) => {
            console.log('signing up');
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
            console.log('signing up');
        });

        app.post('/comment/:language/:commentId', urlencodedParser, (req, res) => {
            console.log('signing up');
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
            console.log('signing up');
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
            let val = 0;
            for ( let d of discount ) {
                if (d.restriction) {

                } else {
                    // console.log(d.discount);
                    val += d.discount;
                }
            }

            data.discount = val;

            // console.log('payment data');
            // console.log(data);
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
