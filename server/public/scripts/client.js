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
  console.log('ssm just finished');
  $scope.removeFav = WriteService.removeFav;
}]);

//================================================================================================================//

myApp.factory('SearchService', ['$http', function($http){
  var movie = {
    searchString: '',
  };
  var searchResults = {};
  function findMovie(movie){
    var copy = angular.copy[movie];
    $http.get('http://www.omdbapi.com/?t=' + movie.searchString).then(function(response) {
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
      console.log('mlo.ml is now: ', movieListObj.movieList);
      });
    }//end showSavedMovies

  function saveMovie(newMovie) {
    var copy = angular.copy[newMovie];
    $http.post('/movies', newMovie.movie).then(function() {
      showSavedMovies();
      });
    }//end saveMovie

  function removeFav(index) {
    console.log(index);
    var removeID = movieListObj.movieList[index]._id;
    console.log(removeID);
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
}]);//end factory
