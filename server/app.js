//BASE MODULES
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//DATABASE MODULE
var db = require('./modules/db.js');

//ROUTE MODULES
var index = require('./routes/index.js');
var movies = require('./routes/movies.js');

//APP CONFIG
app.set('port', (process.env.PORT || 5000));

//MIDDLEWARE CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

//ROUTES
app.use('/', index);
app.use('/movies', movies);


//LISTEN
app.listen(app.get('port'), function(){
    console.log('Listening on port: ', app.get('port'));
});

module.exports = app;
