// axios
// .get("/")
// .then(response => {
//     // manipulate the response here
// })
// .catch(function(error) {
//     // manipulate the error response here
// });

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
    data = JSON.stringify(info);
    fs.writeFileSync('./data/' + fileName + '.json', data);
}

// This is the controler per se, with the get/post
module.exports = {
    controller: function(app){

        app.get('/home', function(req, res){
            let data = {};
            data.games = readData('games');
            res.send(data);
            console.log(req.body);
            console.log(data);
            console.log('/');
        });

        // when a user types SUBMIT in localhost:3000/niceSurvey 
        // the action.js code will POST, and what is sent in the POST
        // will be recuperated here, parsed and used to update the data files
        // app.post('/home', urlencodedParser, function(req, res){
        //     console.log(req);
        //     res.send("works");
        // });

        app.post('/search', urlencodedParser, function(req, res){
            console.log(req.body);
            let data = {};
            data.games = readData('games');
            res.send(data);
            // res.send("works");
        });

        app.get('/survey', function(req, resp) {
            // resp.send('survey', {src: 1});
            resp.send({title: 'chedli'});
            console.log('here');
        });
        
    }
}