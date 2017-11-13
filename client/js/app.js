var app = angular.module('myBlogApp', ['ngRoute', 'ngResource', 'myBlogApp.controllers', 'myBlogApp.factories', 'myBlogApp.services']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode (true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/blogposts.html',
        controller: 'blogPostsController'
    })
    .when('/newpost', {
        templateUrl: 'views/newpost.html',
        controller: 'newPostController',
        requiresLogin: true
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/user_create', {
        templateUrl: 'views/user_create.html',
        controller: 'UserListController',
        requiresLogin: true,
        requiresAdmin: true
    })
    .when('/users_view', {
        templateUrl: 'views/users_view.html',
        controller: 'UserListController',
        requiresLogin: true
    })
    .when('/user_edit/:id', {
        templateUrl: 'views/user_edit.html',
        controller: 'UserListController',
        requiresLogin: true,
        requiresAdmin: true
    })
    .when('/singlepost/:id', {
        templateUrl: 'views/singlepost.html',
        controller: 'singlePostController'
    })
    .when('/updatepost/:id', {
        templateUrl: 'views/updatepost.html',
        controller: 'updatePostController',
        requiresLogin: true
    })
    .otherwise({
        redirectTo: '/'
    });
}])
.run(['$rootScope', '$location', 'UserService', function($rootScope, $location, UserService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, previousRoute) {
        if (nextRoute.$$route.requiresLogin && !UserService.isLoggedIn()) {
            event.preventDefault();
            UserService.loginRedirect();
        }
    });
}])
.run(['$rootScope', '$location', 'UserService', function($rootScope, $location, UserService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, previousRoute){
        if (nextRoute.$$route.requiresAdmin && !UserService.isAdmin()) {
            event.preventDefault();
            UserService.loginRedirect();
        }
    });
}]);