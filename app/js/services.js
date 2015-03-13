'use strict';

/* Services */

var gitMatchServices = angular.module('gitMatchServices', ['ngResource']);

gitMatchServices.factory('gitMatch', ['$http', '$q',
	function($http, $q) {
		var gitMatch = {};

		function setUserFollowers(res){
			return res.data.length;
		};

		gitMatch.getUserFollowers = function(username){
			return $http.get('https://api.github.com/users/'+username+'/followers');
		};

		gitMatch.getWinner = function(userOne, userTwo, succes, error){
			var promises = {
								userOne: this.getUserFollowers(userOne).then(setUserFollowers),
								userTwo: this.getUserFollowers(userTwo).then(setUserFollowers)
							};

			var promise = $q.all(promises) ;
			promise.then (
				function(res){
					var winner = '';
					if(res.userOne > res.userTwo){
						winner = userOne;
					} else if(res.userOne < res.userTwo){
						winner = userTwo;
					}
					succes(winner);
				},
				function(e) {
					error(e);
				}
			);
		};

		gitMatch.getWinnerDetail = function(username, succes, error){
			var promise = this.getUserFollowers(username);
			promise.then(
				function(res){
					succes(res.data);
				},
				function(e){
					error(e);
				}
			);
		};

		return gitMatch;
}]);
