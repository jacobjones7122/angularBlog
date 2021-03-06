angular.module('myBlogApp.services', [])
.service('UserService', ['$http', '$location', function($http, $location) {
   let currentUser;

   this.isLoggedIn = function() {
       if (currentUser) {
           return true;
       } else {
           return false;
       }
   }

   this.isAdmin = function() {
       if (currentUser.roll === 'admin') {
           return true;
       } else {
           return false;
       }
   }

   this.loginRedirect = function() {
        if (this.isLoggedIn() === true) {
            $location.replace().path('/');
        } else {
            let current = $location.path();
            $location.replace().path('/login').search('dest', current);
        }
   }

   this.login = function(email, password) {
        return $http({
           method: 'POST',
           url: '/api/users/login',
           data: { 
               email: email, 
               password: password 
            }
       }).then(function(response) {
           currentUser = response.data;
           return currentUser;
       });
   }

   this.logout = function() {
       return $http({
           method: 'GET',
           url: '/api/users/logout'
       }).then(function(){
           currentUser = undefined;
       });
   }

   this.me = function() {
       if (currentUser) {
           return Promise.resolve(currentUser);
       } else {
           return $http({
               url: 'http://localhost:3000/api/users/me'
           }).then((response) => {
               currentUser = response.data;
               return currentUser;
           });
       }
   }


}])
    //Root Scope SEO
.service('SEOService', ['$rootScope', function($rootScope) {
    this.setSEO = function(data) {
        $rootScope.seo = {};
        for(var p in data) {
            $rootScope.seo[p] = data[p];
        }
    }
}]);