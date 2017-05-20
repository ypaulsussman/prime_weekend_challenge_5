var myApp = angular.module('myApp', []);

myApp.controller('InputController', ['$scope', 'SearchService', function($scope, SearchService){
  $scope.movie = SearchService.movie;
  $scope.findMovie = SearchService.findMovie;
  $scope.clear = function() {
    $scope.movie = {};
  };
}]);

myApp.controller('DisplayController', ['$scope', 'SearchService', 'WriteService', function($scope, SearchService, WriteService){
  $scope.searchResults = SearchService.searchResults;
  $scope.saveMovie = WriteService.saveMovie;
}]);//end DisplayController

myApp.controller('SavedController', ['$scope', 'SearchService', 'WriteService', function($scope, SearchService, WriteService){
  $scope.movieListObj = WriteService.movieListObj;
  WriteService.showSavedMovies();
  $scope.removeFav = WriteService.removeFav;
}]);

//=======================================Factories=======================================//

myApp.factory('SearchService', ['$http', function($http){
  var omdbAPIkey = config.omdbAPIkey;
  var movie = {
    searchString: '',
  };
  var searchResults = {};
  function findMovie(movie){
    var copy = angular.copy[movie];
    $http.get('http://www.omdbapi.com/'+ omdbAPIkey + 't=' + movie.searchString).then(function(response) {
      searchResults.movie = response.data;
    });//end $http.get.then
  }//end findMovie
  return {
    movie : movie,
    findMovie : findMovie,
    searchResults : searchResults
  };//end return
}]);//end factory


myApp.factory('WriteService', ['$http', function($http){
  var movieList = [];
  var movieListObj = {
    movieList: movieList
  };

  function showSavedMovies() {
    $http.get('/movies').then(function(response) {
      movieListObj.movieList = response.data;
      });
    }//end showSavedMovies

  function saveMovie(newMovie) {
    var copy = angular.copy[newMovie];
    $http.post('/movies', newMovie.movie).then(function() {
      showSavedMovies();
      });
    }//end saveMovie

  function removeFav(index) {
    var removeID = movieListObj.movieList[index]._id;
    $http.delete('/movies/'+removeID).then(function() {
      showSavedMovies();
    });
    }

  return{
    saveMovie : saveMovie,
    showSavedMovies : showSavedMovies,
    movieListObj : movieListObj,
    removeFav : removeFav
  };
}]);
