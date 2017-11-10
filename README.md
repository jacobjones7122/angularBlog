# Blog Site with Angular
The objective of this project is build a blog site with angular and interact with a REST API.

## Initial Setup
Clone the assignment from GitHub. Make sure you are in the root of your project folder in terminal. Then, run the following command:
```
npm install
```
This will install the various node modules that the server requires. These can be quite large, and we don't want them polluting our GitHub repository. To tell git to ignore them, we need to create a `gitignore` file. To do so, create a new file in the root of your project folder called `.gitignore` (there is nothing before the dot). In the `gitignore` file, simply add the following line:
```
node_modules
```

Finally, **to start the server**, run:
```
npm start
```

## API
The API for this lab is being provided for you. It is available at http://localhost:3000/api. To start it up, make sure your terminal is opened to the root of your project folder. Then run `nodemon`. This server follows standard REST guidelines. Specifically, you have access to the following endpoints:

**Collection**
* GET `http://localhost:3000/api/posts` - Get an array of all blog posts
* POST `http://localhost:3000/api/posts` - Store the blog post. Returns the unique id of the newly stored post (standard behavior for APIs).

**Detail**
* GET `http://localhost:3000/api/posts/[some_id]` - Get the specific blog post with the given id
* PUT `http://localhost:3000/api/posts/[some_id]` - Update the blog post specified by the given id
* DELETE `http://localhost:3000/api/posts/[some_id]` - Delete the blog post specified by the given id

### Post Format
A blog post should have the following properties:
* `id`: Don't worry about including this when submitting a new blog post. The server creates a unique string value for the id of a blog post when you POST one to the server.
* `title`: The title of the blog post
* `author`: The author of the blog post
* `content`: The long body of the blog post
* `createdAt`: Don't worry about including this when submitting a new blog post. The server creates this timestamp when you POST a new blog post.

#### Further Reading
Angular [docs](https://docs.angularjs.org/api/ng)
Angular usage [examples](https://github.com/curran/screencasts/tree/gh-pages/introToAngular)

[Angular - what goes where](http://demisx.github.io/angularjs/2014/09/14/angular-what-goes-where.html)

### Basic Req's
Utilize Angular's built in functionality to simplify your client side code. Consult the angular [docs](https://docs.angularjs.org/guide/introduction)
Note: During this project, always choose to code using angular templating instead of using plain javascript and html. Review Dependency Injection, '$location','$scope', $resource', 'ngResource', 'ngRoute', '$routeProvider', '$http', '$rootScope' as they may be needed

You should use `$resource` for this project, instead of using `$http`.

##### client

* factory(shared for both controllers/views):
		-Return a $resource for communicating with the API
* createpost:
	html:
		-form to submit new post should bind title, content, author to $scope
		-submit should navigate back to main page
	controller:
		-send a post request to local API to store the tweet on the server
        -should rely on your factory to interact with the API
* singlepost:
    html:
        -show the title, author, content, and createdAt timestamp of a single blog post
    controller:
        -should GET one specific blog post from the local API based on its id
        -should rely on your factory to interact with the API
* listposts:
	html:
		-display a list of all posts with most recent at the top.
		hint: (ng-repeat)[https://docs.angularjs.org/api/ng/directive/ngRepeat]
        -show just the title, author, createdAt, and a button labeled Read Post
        -when the button is clicked, navigate to the singlepost view and show just that one post
	controller:
		-enable user to switch between views (navigating to the single post view)
		-using factory service make a query to retrive all post .then (see what i did there (: ) set the posts on the $scope property for display

##### server (provided)
* server.js - ALREADY IMPLEMENTED - server side code with [nodejs](https://nodejs.org/en/docs/)

### Extra Credit
* Add a view/controller to allow for editing an existing blog post. You will need to make a PUT request to the local API.
* Provide a means for deleting a blog post. You will need to make a DELETE request to the API.

### Extra Extra Credit
* Use [Firebase](https://www.firebase.com) to store your blog data
* The free tier is all you need
* If you get this working, you will no longer be using the local API or making HTTP Requests at all. You will use their JS library/SDK.




<!-- UPDATE MYSQL PROCEDURES NEED TO BE DONE -->