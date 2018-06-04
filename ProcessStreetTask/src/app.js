(function() {
    'use strict';
    var app = angular.module('wistiaUpload', ['ngRoute']);
    app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "src/views/main.html",
            controller:"mainController"
        });
    })
    .filter('trusted', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);
})();