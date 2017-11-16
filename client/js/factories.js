var app = angular.module('myBlogApp.factories', []);
    
    app.factory('User', ['$resource', function($resource){
        return $resource('/api/users/:id', { id: '@id' });  
    }]);

    app.factory('Categories', ['$resource', function($resource){
        return $resource('/api/categories/:id', { id: '@id' });  
    }]);

    app.factory('Post', ['$resource', function($resource){
        return $resource('/api/posts/:id', { id: '@id' }, {
            update: { method: 'PUT' }
        });  
    }]);

    app.factory('ContactForm', ['$resource', function($resource) {
        return $resource('/api/contactform/:id', { id: '@id' });
    }]);