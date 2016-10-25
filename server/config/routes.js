 // This is our routes.js file located in server/config/routes.js
// This is where we will define all of our routing rules!
// We will have to require this in the server.js file (and pass it app!)

// First at the top of your routes.js file you'll have to require the controller
var buckets = require('../controllers/buckets.js');

module.exports = function(app) {

	//buckets routes
	app.post('/buckets', function(req, res) {
		buckets.getOrder(req, res);
	});
};