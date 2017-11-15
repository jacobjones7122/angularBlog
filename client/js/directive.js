angular.module('myBlogApp.directive.navBar', [])
    .directive('navBar', function () {
        return {
            restrict: 'E',
            templateUrl: "js/directive/navbar.html",
        };
    });