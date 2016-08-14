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
		* css route
		**/

		$stateProvider.state('test_css', {
			url:"/css",
			templateUrl: "views/test_css.html",
			title: 'CSS'
		});			

		/**
		* test route
		**/

		$stateProvider.state('test', {
			url:"/test",
			templateUrl: 'scripts/app/test/views/view.html',
			controller: 'testController',
			title: 'Test'
		});

	}


	angular.module('assetCache').config([
		'$stateProvider',
		'$urlRouterProvider',
		config
		]);
}());
