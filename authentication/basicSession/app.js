var express = require('express')
  , util = require('util')
  , ejs = require('ejs')
  , http = require('http')
  , morgan = require('morgan')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , cookieParser = require('cookie-parser')
  , session = require('express-session');

var app = express();
var server = http.createServer(app);

// configure Express
//app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.engine('html', ejs.renderFile);
  //  app.use(express.logger());
  app.use(morgan('combined'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extend: false}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({ secret: 'keyboard cat', cookie: {"maxAge": 60*60*1000}, }));
//});

app.get('/awesome', function(req, res) {
    console.log('Your Awesome.');
 	var u = req.session;
	Object.keys(u).forEach(function (key) {
		console.log("Key:" + key);
		console.log("Value:" + u[key]);
		var cookie = u[key];
		console.log('Cookie details --');
		Object.keys(cookie).forEach(function (k) {
			console.log("Key:" + k);
			console.log("Value:" + cookie[k]);
		});
	});
	req.session.lastPage = {page: '/awesome'};
    res.send('Your Awesome.');
});
app.get('/radical', function(req, res) {
    console.log('What a radical visit!');
  	var u = req.session;
	Object.keys(u).forEach(function (key) {
		console.log("Key:" + key);
		console.log("Value:" + u[key]);
		var cookie = u[key];
		console.log('Cookie details --');
		Object.keys(cookie).forEach(function (k) {
			console.log("Key:" + k);
			console.log("Value:" + cookie[k]);
		});
	});
	req.session.lastPage = {page: '/radical'};
    res.send('What a radical visit!');
});
app.get('/tubular', function(req, res) {
	console.log('Are you a surfer?');
	var u = req.session;
	Object.keys(u).forEach(function (key) {
		console.log("Key:" + key);
		console.log("Value:" + u[key]);
		var cookie = u[key];
		console.log('Cookie details --');
		Object.keys(cookie).forEach(function (k) {
			console.log("Key:" + k);
			console.log("Value:" + cookie[k]);
		});
	});
	req.session.lastPage = {page: '/tubular'};
    res.send('Are you a surfer?');
});
app.get('/', function(req, res) {
    console.log('Are you a surfer?');
	var u = req.session;
	Object.keys(u).forEach(function (key) {
		console.log("Key:" + key);
		console.log("Value:" + u[key]);
		var cookie = u[key];
		console.log('Cookie details --');
		Object.keys(cookie).forEach(function (k) {
			console.log("Key:" + k);
			console.log("Value:" + cookie[k]);
		});
	});
	req.session.lastPage = {page: '/'};
    res.send('Are you a surfer?');
});

var port = process.env.PORT || 3000;

server.listen(port, function() {
	console.log("Express server listening on port " + port);
});