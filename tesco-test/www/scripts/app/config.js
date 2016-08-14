(function() {
	'use strict';

	/**
		* @ngdoc function
		* @name config
		* @function
		* @description angular application configurations here like routes
		* @param {Object} $stateProvider {@link https://github.com/angular-ui/ui-router}
		* @param {Object} $urlRouterProvider {@link https://github.com/angular-ui/ui-router}
		**/
		
	function config($stateProvider, $urlRouterProvider) {
		
		/**
		* Default route
		**/

		$urlRouterProvider.otherwise("/intro");

		/**
		* Init route
		**/

		$stateProvider.state('intro', {
			url:"/intro",
			templateUrl: "views/intro.html",
			title: 'Intro'
		});			

		/**
		* Basket route
		**/

		$stateProvider.state('basket', {
			url:"/basket",
			templateUrl: 'scripts/app/basket/views/view.html',
			controller: 'basketController',
			title: 'Basket'
		});

	}


	angular.module('tesco').config([
		'$stateProvider',
		'$urlRouterProvider',
		config
		]);
}());
