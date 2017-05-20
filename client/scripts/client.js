var myApp = angular.module('myApp', []);

//=======================================Controllers=======================================//

//Controller for searching OMDb
myApp.controller('InputController', ['$scope', 'SearchService', function($scope, SearchService) {
  $scope.movie = SearchService.movie;
  $scope.findMovie = SearchService.findMovie;
  $scope.clear = function() {
    $scope.movie = {};
  };
}]);

//Controller for displaying/saving films returned by search
myApp.controller('DisplayController', ['$scope', 'SearchService', 'WriteService', function($scope, SearchService, WriteService) {
  $scope.searchResults = SearchService.searchResults;
  $scope.saveMovie = WriteService.saveMovie;
}]);

// Controller for displaying/removing saved movies
myApp.controller('SavedController', ['$scope', 'SearchService', 'WriteService', function($scope, SearchService, WriteService) {
  $scope.movieListObj = WriteService.movieListObj;
  WriteService.showSavedMovies();
  $scope.removeFav = WriteService.removeFav;
}]);

//=======================================Factories=======================================//

//Factory for searching OMDb
myApp.factory('SearchService', ['$http', function($http) {
  var movie = {
    searchString: '',
  };

  var searchResults = {};

  function findMovie(movie) {
    var copy = angular.copy[movie];
    $http.get('/movies/search/' + movie.searchString).then(function(response) {
      searchResults.movie = response.data;
    });
  }

  return {
    movie: movie,
    findMovie: findMovie,
    searchResults: searchResults
  };

}]); //end SearchService


//Factory for interacting with favorite-movies db 
myApp.factory('WriteService', ['$http', function($http) {
  var movieList = [];

  var movieListObj = {
    movieList: movieList
  };

  function showSavedMovies() {
    $http.get('/movies/saved').then(function(response) {
      movieListObj.movieList = response.data;
    });
  }

  function saveMovie(newMovie) {
    var copy = angular.copy[newMovie];
    $http.post('/movies', newMovie.movie).then(function() {
      showSavedMovies();
    });
  }

  function removeFav(index) {
    var removeID = movieListObj.movieList[index]._id;
    $http.delete('/movies/' + removeID).then(function() {
      showSavedMovies();
    });
  }

  return {
    saveMovie: saveMovie,
    showSavedMovies: showSavedMovies,
    movieListObj: movieListObj,
    removeFav: removeFav
  };

}]);  //end WriteService
