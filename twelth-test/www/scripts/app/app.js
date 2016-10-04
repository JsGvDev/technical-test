(function () {
  'use strict';

  /**
  * @ngdoc function
  * @name angular.module
  * @function
  * @description Initialize angular module assetCache
  * @param {Module} ui.router routing module for angularjs {@link https://github.com/angular-ui/ui-router}
  **/

angular.module('assetCache', [
  'ui.router',
  'ngAnimate',
  'mobile-angular-ui'
])
.value('cachedAssets', {
    'http://domain.com/image.jpg': 'blob:d3958f5c-0777-0845-9dcf-2cb28783acaf',
    'http://domain.com/video.mp4': 'blob:f3523fcs-3242-2346-gw34-1345nginb234'
})
.factory('downloadBlob', function($q)
{
    return function(url)
    {
        var defer = $q.defer();

        var xhr = new window.XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';

        xhr.onload = function(e)
        {
            if (this.status == 200) {
                defer.resolve(this.response);
            }
            else {
                defer.reject(this.response);
            }
        }

        xhr.send();

        return defer.promise;
    };
});
  
  //App run
  angular.module('assetCache').run(function(cachedAssets,twelthErrLog) {
    // Default base URI api link
    twelthErrLog.logMessage(cachedAssets, 'init.run - twelth');    
  });

}());
