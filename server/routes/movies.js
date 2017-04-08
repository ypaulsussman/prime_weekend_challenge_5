var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

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

router.post('/', function(req, res) {
  console.log('request received: ', req.body);
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
      console.log('error saving to db: ', err);
      res.sendStatus(500);
    }
    res.send(savedMovie);
  });

});



module.exports = router;
