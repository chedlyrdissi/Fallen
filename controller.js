// required packages
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var fs = require('fs');

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
            res.send(data);
        });

        app.get('/search/:title', urlencodedParser, function(req, res){
            
            // console.log(req.params.title);
            // writeData(req, 'method');            
            let data = {};
            const title = req.params.title;
            let allGames = readData('games');
            let allArticles = readData('articles');

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

        app.get('/article/:title', urlencodedParser, function(req, res){

            let title = req.params.title;
            let data = {};

            data.article = getArticleByTitle(title, readData('articles'));
            console.log(data.article);
            if (data.article) {
                data.game = getGameByTitle(data.article.game ,readData('games'));
            }
            console.log(data.game);
            res.send(data);
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
                    console.log(d.discount);
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