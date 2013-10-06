
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var BadRequestError = require('./errors/BadRequestError');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var config = require('./config');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var User = mongoose.model('User');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());

// Important: This must come before the app.router middleware
app.use(expressValidator);

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// set the 'dbUrl' to the mongodb url that corresponds to the
// environment we are in
app.set('dbUrl', config.db[app.settings.env]);
// connect mongoose to the mongo dbUrl
mongoose.connect(app.get('dbUrl'));

//mongoose connection event handlers
mongoose.connection.on('connected', function () {
   	console.log('Mongoose connected to ' + app.get('dbUrl'));
});
mongoose.connection.on('error',function (err) {
	console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});
});


// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

app.get('/', routes.index);
app.get('/users', user.list);

//Simple Test Route
app.get('/add/:first/:second', function(req, res){
	var sum = parseFloat(req.params.first) + parseFloat(req.params.second);
	res.send(200, String(sum));
});

//User Routes
app.post('/user', user.createUser);
app.get('/user/:id', user.findById);

app.use(function(err, req, res, next){
	//console.log("Error: "+JSON.stringify(err));
  	res.send(err.code, {error: err.msg});
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
