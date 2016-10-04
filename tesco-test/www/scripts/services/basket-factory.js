(function() {
	"use strict";
	/**
	* @ngdoc factory
	* @name basket
	* @description help save articles for this session
	* @params {object} tescoErrLog errologer class  
	**/

	function basketService(tescoErrLog) {
        basketService = {};

		basketService.items = [];
		basketService.amount = 0;
        
        basketService.saveData = function(storeData, callBackfun) {
            basketService.items.push(storeData);
            tescoErrLog.logMessage(basketService.items);
            basketService.amount += storeData.products[0].price * storeData.qty;             
        };
        basketService.deleteData = function(item) {
        	var found = false;
            var j = 0;
            while((j < basketService.items.length)&&(!found)) {
                if (item.id == basketService.items[j].id){
                    basketService.items.splice(j,1);
                    found = true;
                }
                j++;
            }
            basketService.amount -= item.products[0].price * item.qty;
            tescoErrLog.logMessage(basketService.items);            
        };
        basketService.deleteItems = function(pos) {            
            basketService.items.splice(pos,basketService.items.length);
            if (pos == 0) {
            	basketService.items = [];
            	basketService.amount = 0;
            }
        };

        return basketService;
	}

	angular.module('tesco').factory('basketService', [
		'tescoErrLog',
        basketService
		]);
}());