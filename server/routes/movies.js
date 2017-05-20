var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');

// Schema for writing favorite-movies to db
var MovieSchema = mongoose.Schema({
  title: String,
  director: String,
  cast: String,
  plot: String,
  poster: String,
  runtime: String,
  year: Number
});

//Creates new db collection (and model) named "movies"
var Movies = mongoose.model("movies", MovieSchema);

//searches OMDb for films' titles matching the search text
router.get('/search/:title', function(req, res) {
  var title = req.params.title;
  var url = 'http://www.omdbapi.com/?apikey=' + process.env.OMDBAPI + '&t=' + title;
  request(url, function(err, resp, body) {
    if (err) {
      res.sendStatus(500);
    }
    res.send(body);
  });
});

//returns all saved films from mLab db
router.get('/saved', function(req, res) {
  Movies.find(function(err, favMovies) {
    if (err) {
      res.sendStatus(500);
    }
    res.send(favMovies);
  });
});

//saves new fillm to mLab db
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
});

//removes fillm from mLab db
router.delete('/:id', function(req, res) {
  var removeID = req.params.id;
  Movies.findByIdAndRemove(removeID, function(err, deletedFav) {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});


module.exports = router;
