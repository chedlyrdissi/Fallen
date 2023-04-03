// Entry point for the application
const port = process.env.PORT || 80

// express application
var express = require('express');
var cors = require('cors');
// require the controller we make
var c = require('./controller');
var controller = c.controller;

var app = express();

// set up template engine
// app.set('view engine', 'ejs');

// // static file serving
// app.use(express.static('./public'));
app.use(cors());
// fire function from surveyController
controller(app);

// listen to port
app.listen(port);
console.log(`listening port ${port}`);