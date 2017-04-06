var myApp = angular.module('myApp', []);

myApp.controller('InputController', ['$scope', 'MovieService', function($scope, MovieService){
  $scope.defaultMovie = {};
  $scope.movie = MovieService.movie;
  $scope.saveMovie = MovieService.saveMovie;
  $scope.clear = function() {
    $scope.movie = $scope.defaultMovie;
    $scope.defaultMovie = {};
  };
}]);

myApp.controller('DisplayController', ['$scope', 'MovieService', function($scope, MovieService){
  $scope.movieListObj = MovieService.movieListObj;
  console.log("display movieList:" , $scope.movieListObj);

}]);

myApp.factory('MovieService', [function(){
  //Private
  var movie = {
    name : "",
    desc: "",
    director: "",
    length: "",
  };
  var movieList = [];
  var movieListObj = {
    movieList : movieList
  };

  function saveMovie(movie){
    console.log("movie to save: ", movie);
    movieListObj.movieList.push({
      name: movie.name,
      desc: movie.desc,
      director: movie.director,
      length: movie.length
    });

    console.log("movielist post-push: ", movieListObj.movieList);
  }

  //Public
  return {
    movie : movie,
    saveMovie : saveMovie,
    movieListObj: movieListObj
  };
}]);//end factory
