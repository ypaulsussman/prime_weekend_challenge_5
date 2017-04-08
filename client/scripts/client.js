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

  function saveMovie(newMovie) {
      var copy = angular.copy[newMovie];
      console.log('copy of new movie: ', newMovie);
      $http.post('/movies', newMovie.movie).then(function(response) {
        console.log('response from mongo: ', response);
      });


      // movieListObj.movieList.push(newMovie.movie);
      // console.log(movieListObj);
    }
  return{
    saveMovie : saveMovie,
    movieListObj : movieListObj,
  };
}]);//end factory
