// require express so that we can build an express app
var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');

var bodyParser = require('body-parser');

// instantiate the app
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// store the function in a variable
var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app);

var port = process.env.PORT || 8888;

// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './build')));
app.listen(port, function() {
	console.log('cool stuff on: 8888');
});