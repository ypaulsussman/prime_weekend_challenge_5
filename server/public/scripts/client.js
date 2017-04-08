var myApp = angular.module('myApp', []);

myApp.controller('InputController', ['$scope', 'SearchService', function($scope, SearchService){
  $scope.movie = SearchService.movie;
  $scope.findMovie = SearchService.findMovie;
  $scope.clear = function() {
    $scope.movie = {};
  };
}]);

myApp.controller('DisplayController', ['$scope', 'SearchService', function($scope, SearchService){
  $scope.searchResults = SearchService.searchResults;
  // $scope.togglePoster = ShowService.togglePoster;
  // $scope.saveMovie = WriteService.saveMovie;
}]);//end DisplayController

myApp.controller('SavedController', ['$scope', 'SearchService', function($scope, SearchService){

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
      searchResults.movies = response.data;
      console.log(searchResults);
    });//end $http.get.then
  }//end findMovie
  return {
    movie : movie,
    findMovie : findMovie,
    searchResults : searchResults
  };//end return
}]);//end factory

// myApp.factory('ShowService', [function() {
//   function togglePoster (index) {
//     console.log("array is: ", searchResults.movies[index]);
//     console.log("before it was: ", searchResults.movies[index].Showing);
//     searchResults.movies[index].Showing = !searchResults.movies[index].Showing;
//     console.log("now it's: ", searchResults.movies[index].Showing);
//   }
// }]); //end factory
//
// myApp.factory('WriteService', [function() {
//   function saveMovie(index) {
//   }
//   return{
//     saveMovie : saveMovie,
//   };
// }]);//end factory
