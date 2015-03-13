'use strict';

/* Controllers */

var gitMatchControllers = angular.module('gitMatchControllers', []);

gitMatchControllers.controller('GitMatchCtrl', ['$scope', 'gitMatch',
  function($scope, gitMatch) {
    $scope.userNameOne = '';
    $scope.userNameTwo = '';

    $scope.compare = function(){
      reset();
      gitMatch.getWinner($scope.userNameOne, $scope.userNameTwo, onWinnerGivenSuccess, onWinnerGivenError); 
    };

    function onWinnerGivenSuccess(winner){
      $scope.winner = winner;
      if($scope.winner){
        $scope.winnerText = "The winner is "+winner;
        $scope.details = '';
      } else {
        $scope.winnerText = "No one won";
      }
    }

    function onWinnerGivenError (error){
      $scope.error = "One or all of given users don't exist";
    }

    function reset(){
      $scope.winnerText = '';
      $scope.error = '';
    }

}]);

gitMatchControllers.controller('DetailCtrl', ['$scope', 'gitMatch', '$routeParams',
  function($scope, gitMatch, $routeParams) {
    $scope.username = $routeParams.username;
    $scope.followers = [];
    
    gitMatch.getWinnerDetail($scope.username, onWinnerDetailSucces, onWinnerDetailError);

    function onWinnerDetailSucces(details){
        $scope.followers = details;

    };

    function onWinnerDetailError(error){
        $scope.errorMsg = error;
    };
}]);
