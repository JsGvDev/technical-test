(function () {
    'use strict';

    /* 
    * Simple error logger service
    * @params {Object} supersonic appGyver debug logger framework
    */

    function twelthErrLog() {

        var errorLogService;

        errorLogService = {};

        // (true) displays logs (false) stops logs 
        // NOTE: always set to false in production enviroment
        errorLogService.debug = true; 

        /*
        * Outputs error messages to console 
        * @param {String, Object, Array} message 
        * @param {String} debugmessage (Optional)
        * @param {String} linenumber (Optional)
        * @param {String} controller (Optional)
        */

        errorLogService.logMessage = function(message, controller) {

          if (angular.isDefined(message) && errorLogService.debug === true) {
           
            console.log("%c <-- DEBUG -->", 'background: #222; color: #bada55');
            console.log(message);
            console.log("%c <-- END DEBUG --> ", 'background: #222; color: #bada55');
          }

          if (angular.isDefined(controller) && errorLogService.debug === true) {
           
            console.log("%c Debug Controller name: " + controller, 'background: #222; color: #bada55');
          }

        }

        return errorLogService;
    }

    /**
    * Attach function to AngularJs
    **/

    angular.module('assetCache').service('twelthErrLog',[
        twelthErrLog
        ]);

}());
