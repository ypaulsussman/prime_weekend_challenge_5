var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');

var MovieSchema = mongoose.Schema({
  title: String,
  director: String,
  cast: String,
  plot: String,
  poster: String,
  runtime: String,
  year: Number
});

var Movies = mongoose.model("movies", MovieSchema);

router.get('/search/:title',function(req,res) {
  var title = req.params.title;
  var url = 'http://www.omdbapi.com/?apikey='+ process.env.OMDBAPI + '&t=' + title;
  request(url, function(err, resp, body) {
    if (err) {
      res.sendStatus(500);
    }
    res.send(body);
  });//end request
});//end router.get


router.get('/saved',function(req,res) {
  Movies.find(function(err, favMovies) {
    if (err) {
      res.sendStatus(500);
    }
    res.send(favMovies);
  });
});//end router.get


router.post('/', function(req, res) {
  var newMovie = new Movies();
  newMovie.title = req.body.Title;
  newMovie.director = req.body.Director;
  newMovie.cast = req.body.Actors;
  newMovie.plot = req.body.Plot;
  newMovie.poster = req.body.Poster;
  newMovie.runtime = req.body.Runtime;
  newMovie.year = req.body.Year;
  newMovie.save(function(err, savedMovie) {
    if (err) {
      res.sendStatus(500);
    }
    res.send(savedMovie);
  });
});//end router.post


router.delete('/:id', function(req, res) {
  var removeID = req.params.id;
  Movies.findByIdAndRemove(removeID, function(err, deletedFav){
    if(err){
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});//end router.delete


module.exports = router;
