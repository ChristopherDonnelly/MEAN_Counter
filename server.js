
var express = require("express");
var session = require('express-session');
var path = require("path");

// create the express app
var app = express();

app.use(session({
    secret: 'counter_secret', 
    saveUninitialized: true,
    resave: true
}));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// static content
app.use(express.static(path.join(__dirname, "./static")));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function(req, res) {

    if(!req.session.count) req.session.count = 0;

    req.session.count = parseInt(req.session.count) + 1;

    res.render("index", {count: req.session.count});
});

// post route for adding one more to the session count
app.post('/count', function(req, res) {
    
    req.session.count = parseInt(req.session.count) + 1;

    res.redirect('/');
});

// post route for resetting the session count
app.post('/reset', function(req, res) {
    
    req.session.count = 0;

    res.redirect('/');
});

// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});