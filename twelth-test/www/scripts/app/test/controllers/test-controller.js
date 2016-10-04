(function () {
    'use strict';

    /**
    * @ngdoc function
    * @name testController
    * @function
    * @description Controller for a test in Angular
    * @params {object} $scope angular object
    * @params {object} twelthErrLog Simple error loging service
    * @params {object} assetCacher service
    **/
    function testController($scope, twelthErrLog, assetCacher) {

        init();

        
        /*-----------------------------------------------------------------------
        |
        |  Private Functions
        |
        |*/

        
        /**
        * @ngdoc function
        * @name init
        * @function
        * @description Constructor function
        **/
        function init() {
            $scope.assetService =  assetCacher;
            
            //init and empty object
            $scope.asset = {};            
            twelthErrLog.logMessage('init test', 'twelth');
        }
        
    }
    /**
    * Attach function to AngularJs
    **/

    angular.module('assetCache').controller('testController', [
        '$scope',
        'twelthErrLog',
        'assetCacher',
        testController
    ]);
}());
