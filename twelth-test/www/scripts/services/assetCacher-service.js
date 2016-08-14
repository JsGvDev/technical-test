(function() {
	"use strict";
	/**
	* @ngdoc factory
	* @name basket
	* @description help save articles for this session
	* @params {object} tescoErrLog errologer class  
	**/

	function assetCacher($q, cachedAssets, downloadBlob, twelthErrLog) {
        assetCacher = {};
        assetCacher.url = [];

        assetCacher.saveURL = function(key, value) {
            var i = assetCacher.url.length;
            assetCacher.url[assetCacher.url.length] = [];
            assetCacher.url[i] [0] = key;
            assetCacher.url[i] [1] = value;
            twelthErrLog.logMessage(assetCacher.url);
        };

        assetCacher.cache = function(url) {
            var deferred = $q.defer();
            downloadBlob(url).then(function(blob) {
                twelthErrLog.logMessage(blob, 'cache - assetCacher');            
                var blob_url = window.URL.createObjectURL(blob);
                twelthErrLog.logMessage(blob_url, 'blob cache - assetCacher');
                assetCacher.saveURL(url,blob_url);
                deferred.resolve(url);               
            }, function(error) {
                twelthErrLog.logMessage(error, 'error_cache - assetCacher');
                deferred.reject(error);
            });
            return deferred.promise;            
        };


        function init() {
            var iterator = 0;

            angular.forEach(cachedAssets, function(value, key) {
                assetCacher.url[iterator] = [];
                assetCacher.url[iterator] [0] = key;
                assetCacher.url[iterator] [1] = value;
                iterator++;                
                //this.push(key + ': ' + value);
            });            
            twelthErrLog.logMessage(assetCacher.url, 'init - assetCacher');
            twelthErrLog.logMessage(assetCacher.url.length, 'init - assetCacher');    
        }		

        init();

        return assetCacher;
	}

	angular.module('assetCache').factory('assetCacher', [
        '$q',
        'cachedAssets',
        'downloadBlob',
		'twelthErrLog',
        assetCacher
		]);
}());