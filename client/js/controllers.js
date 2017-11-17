var app = angular.module('myBlogApp.controllers', []);

app.controller('newPostController', ['SEOService', '$scope', '$location', 'Post', 'Categories', 'User', function(SEOService, $scope, $location, Post, Categories, User){
    SEOService.setSEO({
        title: 'New Blog Post',
        image: 'https://static.pexels.com/photos/574073/pexels-photo-574073.jpeg',
        url: $location.url(),
        description: 'A user can create a new blog post.'
    });
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

app.controller('blogPostsController', ['SEOService', '$scope', '$location', 'Post', 'Categories', 'User', function(SEOService, $scope, $location, Post, Categories, User){
    SEOService.setSEO({
        title: "Homepage for Jacob's Blog",
        image: 'https://static.pexels.com/photos/574073/pexels-photo-574073.jpeg',
        url: $location.url(),
        description: "The homepage for Jacob's blog. The titles for all blog posts are avaliable for view here."
    });
    $scope.blogPosts = Post.query();
    $scope.composeBtn = function(){
        $location.path('/newpost');
    };
}]);

app.controller('singlePostController', ['SEOService', '$scope', '$routeParams', '$location', 'Post', 'Categories', 'User', function(SEOService, $scope, $routeParams, $location, Post, Categories, User){
    SEOService.setSEO({
        title: "Full Blog Post",
        image: 'https://static.pexels.com/photos/574073/pexels-photo-574073.jpeg',
        url: $location.url(),
        description: "Viewing of a single post."
    });
    
    let postId = $routeParams.id;
    function onePost(){
        $scope.post = Post.get({id: postId}, function(success){
                console.log('working');
            }, function(err){
                console.log('error');
            }
        );
    }
    onePost();    


}]);

app.controller('updatePostController', ["SEOService", '$scope', '$routeParams', '$location', 'Post', 'Categories', 'User', 'UserService', function(SEOService, $scope, $routeParams, $location, Post, Categories, User, UserService){
    
    SEOService.setSEO({
        title: 'Update Blog Post',
        image: 'https://static.pexels.com/photos/574073/pexels-photo-574073.jpeg',
        url: $location.url(),
        description: 'A user can update a blog post they made previously.'
    });

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

app.controller('UserListController', ['SEOService', '$scope', '$routeParams', 'User', '$location', function(SEOService, $scope, $routeParams, User, $location){
    
    SEOService.setSEO({
        title: 'User List',
        image: 'https://static.pexels.com/photos/574073/pexels-photo-574073.jpeg',
        url: $location.url(),
        description: 'Viewing, creating, or editing of users. This is only accessiable by admin.'
    });    
    $scope.users = User.query();
    var userId = $routeParams.id;

    $scope.CreateUser = function(){
        var u = new User($scope.newUser);
        u.$save(function(success) {
            console.log('success');
            alert('New User Created! Please login when returned to the homepage.');
            $location.path('/');
        }, function(error) {
            $location.path('/');
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
            email: $scope.Email,
            roll: document.getElementById('adminOptions').value
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

app.controller('LoginController', ['SEOService', '$scope', '$location', 'UserService', function (SEOService, $scope, $location, UserService) {
    SEOService.setSEO({
        title: 'Login Page',
        image: 'https://static.pexels.com/photos/574073/pexels-photo-574073.jpeg',
        url: $location.url(),
        description: 'Login Page for users.'
    });
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
            alert("Incorrect Username/Password");
            console.log("error");
        });
    }
    $scope.logout = function(){
        UserService.logout().then($location.path('/'));
    }
}]);

app.controller('ContactController', ['$scope', 'ContactForm', function($scope, ContactForm){
    $scope.send = function() {
        let contact = new ContactForm({
            from: $scope.email,
            subject: $scope.subject,
            message: $scope.message
        });
        contact.$save(function(){
            alert('Thank you for your message. We will get back to you shortly.')
        }, function(err){
            console.log('error');
        });
    }
}]);


app.controller('DonationController', ['$scope', 'CardForm', function($scope, CardForm) {
    let elements = stripe.elements();
    let card = elements.create('card');    
    card.mount('#card-field');

    $scope.process = function() {
                stripe.createToken(card).then((result) => {
            if (result.error) {
                $scope.error = result.error.message;
            } else {
                let payment = new CardForm({
                    token: result.token,
                    amount: $scope.amount
                });
                payment.$save(function(success){
                    console.log('success');
                }, function(err){
                    console.log('error');
                    console.log(err);
                })
            }
        })
    }
}]);