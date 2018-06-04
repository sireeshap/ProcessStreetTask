(function() {
    'use strict';
    angular.module('wistiaUpload').factory('FileHandleService',['$http','$q', function($http,$q){
        var deferred = $q.defer();
        console.log("hhh")
        var url='https://upload.wistia.com';
        return{
            postFile: function(file){
                $http.post(url,file).success(function(data) {
                    deferred.resolve(data);
                });
            
                return deferred.promise;
            }
        }
    }]);
})();