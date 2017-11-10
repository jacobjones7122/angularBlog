var app = angular.module('myBlogApp.controllers', []);

app.controller('newPostController', ['$scope', '$location', 'Post', 'Categories', 'User', function($scope, $location, Post, Categories, User){
    $scope.username = User.query();
    $scope.categories = Categories.query();
    $scope.contentPost = function(){
        var p = new Post({
            title: $scope.newTitle,
            userId: $('#userOption').val(),
            categoryId: $('#categoriesOption').val(),
            content: $scope.newContent
        });
        p.$save(function(success){
            alert('Post was saved!');
            console.log('success')
            $location.path('/');
        }, function(error){
            $location.path('/');
            console.log('error'); 
        });
    };
}]);

app.controller('blogPostsController', ['$scope', '$location', 'Post', 'Categories', 'User', function($scope, $location, Post, Categories, User){
    $scope.blogPosts = Post.query();
    $scope.composeBtn = function(){
        $location.path('/newpost');
    };
}]);

app.controller('singlePostController', ['$scope', '$routeParams', '$location', 'Post', 'Categories', 'User', function($scope, $routeParams, $location, Post, Categories, User){
    let postId = $routeParams.id;
    function onePost(){
        $scope.post = Post.get({ id: postId}, function(success){
                console.log('working');
            }, function(err){
                console.log('error');
            }
        );
    }
    onePost();
}]);

app.controller('updatePostController', ['$scope', '$routeParams', '$location', 'Post', 'Categories', 'User', 'UserService', function($scope, $routeParams, $location, Post, Categories, User, UserService){
    let postId = $routeParams.id;
    $scope.username = User.query();
    $scope.categories = Categories.query();
    function onePost(){
        $scope.post = Post.get({ id: postId}, function(success){
                document.getElementById('postTitle').value = $scope.post.title;
                document.getElementById('categoriesOption').value = $scope.post.categoryid;
                document.getElementById('messageBox').value = $scope.post.content;
            }, function(err){
                console.log('error');
            }
        );
    }
    onePost()
    $scope.updatePost = function(){
        console.log('Here');
        var p = new Post({
            id: postId,
            title: $scope.newTitle,
            categoryId: $('#categoriesOption').val(),
            content: $scope.newContent
        });
        console.log(p);
        p.$save({id: postId}, function(success){
            console.log('success')
            alert('Post was Updated!');
            $location.path('/singlepost/' + postId);
        }, function(error){
            console.log('error'); 
            $location.path('/singlepost/' + postId);
        });
    };
    $scope.deletePost = function deleteBlogPost(){
        if ( UserService.isAdmin() === true ) {        
            if (confirm('Are you sure you wish to delete this post?')) {
                $scope.post = new Post({
                    id: postId
                });
                $scope.post.$delete(function(success){
                    console.log('Post Deleted!');
                    $location.path('/');
                }, function(err){
                    console.log('error');
                })
            }
        } else {
            alert('You must be an Admin to delete posts.');
        }    
    };
}]);

app.controller('UserListController', ['$scope', '$routeParams', 'User', '$location', function($scope, $routeParams, User, $location){
    $scope.users = User.query();
    console.log(User.query());
    var userId = $routeParams.id;

    $scope.CreateUser = function(){
        var u = new User($scope.newUser);
        console.log($scope.newUser);
        u.$save(function(success) {
            console.log('success');
            alert('New User Created! Please login when returned to the homepage.');
            $location.path('/');
        }, function(error) {
            console.log('error')
        });
    }

    $scope.DeleteUser = function(){
        if (confirm('Are you sure you wish to delete this user?')) {
            $scope.user = new User({
                id: userId
            });
            $scope.user.$delete(function(success){
                $location.path('/users_view');
                console.log('User Deleted!');
            }, function(err){
                console.log('Error!');
            });
        };
    }

    $scope.UpdateUser = function(){
        var userId = $routeParams.id;
        var p = new User({
            id: userId,
            firstname: $scope.Firstname,
            lastname: $scope.Lastname,
            email: $scope.Email
        });
        p.$save({id: userId}, function(success){
            console.log('success')
            alert('User was updated!');
            $location.path('/users_view');
        }, function(error){
            console.log('error'); 
        });
    };
}]);

app.controller('LoginController', ['$scope', '$location', 'UserService', function ($scope, $location, UserService) {
    UserService.me().then((success) => {
        redirect();
    });
    
    function redirect() {
        let dest = $location.search().dest;
        if (!dest) { dest = '/'; }
        $location.replace().path(dest).search('dest', null);
    }

    $scope.login = function() {
        UserService.login($scope.email, $scope.password)
        .then(() => {
            redirect();
        }, (err) => {
            alert("Oh snap it's an error!")
            console.log("Oh snap it's an error!" + err);
        });
    }

    $scope.logout = function(){
        UserService.logout().then($location.path('/'));
    }
}]);