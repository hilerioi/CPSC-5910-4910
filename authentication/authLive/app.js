var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , ejs = require('ejs')
  , http = require('http')
  , morgan = require('morgan')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , WindowsLiveStrategy = require('passport-windowslive').Strategy;

var WINDOWS_LIVE_CLIENT_ID = "AppId"; //"--insert-windows-live-client-id-here--"
var WINDOWS_LIVE_CLIENT_SECRET = "AppSecret"; //"--insert-windows-live-client-secret-here--";

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,w.
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Windows Live profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  console.log('1. serializeUser');
  console.log('1. user id:' + user.id);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('2. deserializeUser');
  console.log('2. obj id:' + obj.id);
  done(null, obj);
});


// Use the WindowsLiveStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Windows Live
//   profile), and invoke a callback with a user object.
passport.use(new WindowsLiveStrategy({
    clientID: WINDOWS_LIVE_CLIENT_ID,
    clientSecret: WINDOWS_LIVE_CLIENT_SECRET,
	callbackURL: "http://me.localtest.me:3000/auth/windowslive/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Windows Live profile is returned
      // to represent the logged-in user.  In a typical application, you would
      // want to associate the Windows Live account with a user record in your
      // database, and return that user instead.
      return done(null, profile);
    });
  }
));

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
  app.use(session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.Router());
  //app.use(express.static(__dirname + '/public'));
//});


app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/layout', function(req, res){
  if (req.isAuthenticated()) {
	res.render('layout', { user: req.user });
  }
  else {
	res.render('error', {});
  }
});

//app.get('/account', ensureAuthenticated, function(req, res){
app.get('/account', function(req, res){
	if (req.isAuthenticated()) {
	console.log('=============>user authenticated');
	  res.render('account', { user: req.user });
	  console.log('user info');
	  var u = req.user;
	  Object.keys(u).forEach(function (key) {
		console.log("Key:" + key);
		console.log("Value:" + u[key]);
	  });
	  console.log('email info');
	  var e = req.user.emails[0];
	  Object.keys(e).forEach(function (key) {
		console.log("2.Key:" + key);
		console.log("2.Value:" + e[key]);
	  });
  }
  else {
	console.log('------------->user not authenticated');
	res.render('error', {});	  
  }
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user } );
});

// GET /auth/windowslive
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Windows Live authentication will involve
//   redirecting the user to live.com.  After authorization, Windows Live
//   will redirect the user back to this application at
//   /auth/windowslive/callback
app.get('/auth/windowslive',
  passport.authenticate('windowslive', { scope: ['wl.signin', 'wl.basic', 'wl.emails'] }),
  function(req, res){
    // The request will be redirected to Windows Live for authentication, so
    // this function will not be called.
  });

// GET /auth/windowslive/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/windowslive/callback',
  passport.authenticate('windowslive', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

var port = process.env.PORT || 3000;

server.listen(port, function() {
	console.log("Express server listening on port " + port);
});


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
