(function () {
  'use strict';

  /**
  * @ngdoc function
  * @name angular.module
  * @function
  * @description Initialize angular module tesco
  * @param {Module} ui.router routing module for angularjs {@link https://github.com/angular-ui/ui-router}
  **/

  angular.module('tesco', [
    'ui.router',
    'ngAnimate',
    'mobile-angular-ui'
    ]);

  angular.module('tesco').constant('BASE_PATH', "http://test-basket-api.foodity.com/api/tesco");

  //App run
  angular.module('tesco').run(function(BASE_PATH,tescoErrLog) {
    // Default base URI api link
    tescoErrLog.logMessage(BASE_PATH, 'init.run - tesco');                   
  });

}());
