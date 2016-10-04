(function() {
    'use strict';

    function checkURL(assetCacher, twelthErrLog) {
        return {
            restrict: 'A',
            scope: {
              caSrc: '@'
            },
            controller: ['$scope', function ($scope) {
                console.log("$scope.caSrc",$scope.caSrc);                              
            }],
            link: function (scope, element, attrs) {
                twelthErrLog.logMessage(attrs, 'directive - checkURL');
                scope.$watch('caSrc', function(url) {
                    var i= 0;
                    var notFound = true;
                    while ((i < assetCacher.url.length) && (notFound)) {
                        if (assetCacher.url[i][0] == url) {
                            notFound = false;
                        }
                        i++;
                    }
                    var info = "url --> " +url;
                    element.attr( "alt", info );                        
                    if (notFound) {
                        //var url_blob = assetCacher.cache(url);
                        assetCacher.cache(url).then(function(url_blob) {
                            element.attr( "src", url_blob );
                        }, function(error) {
                            twelthErrLog.logMessage(error, 'error_url - directive - checkURL');                            
                        });
                    } else {
                        element.attr( "src", url );    
                    }                    
                });              
              
            }
        };
    }
    
    angular.module("assetCache").directive('caSrc', [
        'assetCacher',
        'twelthErrLog',
        checkURL
    ]);
}());