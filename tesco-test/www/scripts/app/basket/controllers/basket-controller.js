(function () {
    'use strict';

    /**
    * @ngdoc function
    * @name basketController
    * @function
    * @description Controller create basket for shopping
    * @params {object} $scope angular object
    * @params {object} $state ui-router  service
    * @params {object} $stateParams ui-router  service, dependency $state
    * @params {object} webplunderErrLog Simple error loging service
    * @params {object} billsService Resource Js-Data - localforage
    * @params {object} membersService factory of list of members
    **/
    function basketController($scope, $http, $state, $stateParams, BASE_PATH, tescoErrLog, basketService) {

        init();

        $scope.chooseItem = function(item) {
            tescoErrLog.logMessage(this,'chooseItem');
            tescoErrLog.logMessage(this.values,'chooseItem - values');
            if (this.values['item_'+item.id]) {
                $scope.basket.saveData(item);    
            } else {
                $scope.basket.deleteData(item);
            }            
        };
        $scope.cantItem = function(item) {
            tescoErrLog.logMessage(item,'cantItem - item');
            tescoErrLog.logMessage(this.cant,'cantItem - cant');               
            item.qty = this.cant['item_'+item.id];
            tescoErrLog.logMessage(basketService.items);
        };
        $scope.selectAllItems = function() {
            if ($scope.allSelected) {
                for (var i = 0; i < $scope.products.length; i++) {
                    $scope.values['item_'+$scope.products[i].id] = false;
                }
                $scope.basket.deleteItems(0);                    
                $scope.allSelected = false;
            } else {
                $scope.basket.deleteItems(0);                    
                for (var i = 0; i < $scope.products.length; i++) {
                    $scope.values['item_'+$scope.products[i].id] = true;
                    $scope.basket.saveData($scope.products[i]);
                }
                $scope.allSelected = true;
            }
        };
        /**
        * @ngdoc $watch
        * @function (watch if all items selected or not)
        * @description watch if the number of items, the are selected
        **/
        $scope.$watch("basket.items.length", function(numItems) {            
            if (numItems == $scope.products.length) {
                $scope.allSelected = true;
            } else {
                $scope.allSelected = false; 
            }            
        });
        /*-----------------------------------------------------------------------
        |
        |  Private Functions
        |
        |*/

        function loadProducts() {
            $http.jsonp(BASE_PATH+'/products?callback=JSON_CALLBACK').then(function (response) {
                $scope.status = response.status;
                $scope.products = response.data;
                tescoErrLog.logMessage($scope.status,'loadProducts - status');
                tescoErrLog.logMessage($scope.products,'loadProducts - data');
                for (var i = 0; i < $scope.products.length; i++) {
                    if ($scope.products[i].isPrimary) {
                        $scope.items.primary.push($scope.products[i]);
                    } else {
                        $scope.items.notprimary.push($scope.products[i]);
                    }
               }
               tescoErrLog.logMessage($scope.items,'loadProducts - items');                               
            }).catch(function(error) {               
                tescoErrLog.logMessage(error,'error_loadProducts');               
            });
        }

        /**
        * @ngdoc function
        * @name init
        * @function
        * @description Constructor function
        **/
        function init() {
            $scope.basket =  basketService;
            //init and empty object
            $scope.products = {};
            $scope.items = {
                'primary' : [],
                'notprimary' : []
            };
            $scope.values = {};
            $scope.cant = {};
            $scope.allSelected = false;
            $scope.filter = 'id';
            $scope.reverse = false;
            loadProducts();            
        }
        
    }
    /**
    * Attach function to AngularJs
    **/

    angular.module('tesco').controller('basketController', [
        '$scope',
        '$http',
        '$state',
        '$stateParams',
        'BASE_PATH',
        'tescoErrLog',
        'basketService',
        basketController
    ]);
}());
