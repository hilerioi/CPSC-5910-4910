/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var http = require("http");
var uriUtil = require("mongodb-uri");
var util = require('util');
var morgan = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var crypto = require('crypto');

//put config url behind file to hide passwords and username
var mongoDBConnection = require('./db.toDoSample.config');
console.log("mongodb URI: " + mongoDBConnection.uri);

var mongooseUri = uriUtil.formatMongoose(mongoDBConnection.uri);
console.log("mongooseDB URI:" + mongooseUri);

var app = express();
app.set('port', process.env.PORT || 8080); //3000);
app.use(morgan('combined'));
//app.use(cookieParser());
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());
app.use(methodOverride());

/*
app.use(session({ 
		secret: 'keyboard cat',
		store: new MongoStore({ 
			url: 'mongodb://dbAdmin/test@localhost:3000/toDoSample',
			collection: 'sessions'})
}));
*/
// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var Lists;
var Tasks;

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } }; 
mongoose.connect(mongooseUri, options);

app.use(session({ 
		secret: 'keyboard cat',
		store: new MongoStore({ 
			mongooseConnection: mongoose.connection,
			collection: 'sessions'
		})
}));

console.log('Sending connecting request with Mongo db');
mongoose.connection.on('error', function() {
	console.log("problems connecting to the MongoDB server");
});
mongoose.connection.on('open', function() {
	console.log("After connecting to Mongo");
	var Schema = mongoose.Schema;
	var UsersSchema = new Schema (
		{
			fName: String,
			lName: String,
			username: String,
			email: String,
			extra: String,
			hashed_pwd: String		
		},
		{collection: 'users'}
	);	
	Users = mongoose.model('Users', UsersSchema);
	var ListsSchema = new Schema( 
		{ 
			name: String,
			description: String,
			listId: String,
			due: String,
			state: String,
			owner: String
		},
	   {collection: 'lists'}
	);
	Lists = mongoose.model('Lists', ListsSchema);	
	var TasksSchema = new Schema( 
		{
			listId: String,
			owner: String,
			tasks: [ {
			   description: String,
			   taskId: String,
			   shared: String,
			   status: String
			}]
		},
	   {collection: 'tasks'}
	);
	Tasks = mongoose.model('Tasks', TasksSchema);
	console.log('models have been created');
});

function displayDBError(err){
	if (err) { 
		console.log("error 1: " + err);
		for (p in err) {
			console.log(p + ":" + err[p]);
		}
	}
	else {
		console.log("no errors querying the db");
	}
}

console.log("before creating query functions");
function retrieveAllLists(req, res) {
	if (req.session.user) {
		console.log("calling retrieveAllLists");
		//console.log(JSON.stringify(req.session, null, 2));
		console.log("user id:" + req.session.user);
		var query = Lists.find({owner: req.session.user});
		query.exec(function (err, itemArray) {
			displayDBError(err);
			console.log("result: " + itemArray);
			res.json(itemArray);
		});
	}
	else {
		res.send('need to login');
	}
}

function retrieveListDetails(req, res, queryParams) {
	console.log("calling retrieveListDetails");
	queryParams.owner = req.session.user;
	var query = Lists.findOne(queryParams);
	query.exec(function (err, itemArray) {
		displayDBError(err);
		console.log("result: " + itemArray);
		res.json(itemArray);
	});
}

function retrieveListTasksDetails(res, query) {
	console.log("calling retrieveListTaskDetails");
	var query = Tasks.findOne(query);
	query.exec(function (err, itemArray) {
		displayDBError(err);
		console.log("result: " + itemArray);
		res.json(itemArray);		
	});
}

function retrieveTasksCount(res, query) {
	console.log("calling retrieveTasksCount");
	var query = Tasks.find(query).select('tasks').count();
	query.exec(function (err, numberOfTasks) {
		displayDBError(err);
		res.json(numberOfTasks);
	});
}

function retrieveUserId(req, res, query) {
	console.log("calling retrieve user Id");
	var query = Users.findOne(query);
	query.exec(function (err, user) {
		if (!user) {
			res.sendStatus(404);
		}
		else {
			//req.session.regenerate(function(){
				req.session.user = user.id.valueOf();
				req.session.username = user.username;
				req.session.email = user.email;
			//});
		}
		if (err) {
			console.log("errors accessing users");
		}
		else {
			console.log("----------->user info:" + user);
			res.sendStatus(200);
		}
	});	
}

function retrieveUserIdWithPwd(req, res, query) {
	console.log("calling retrieve user Id");
	var query = Users.findOne(query);
	query.exec(function (err, user) {
		if (!user) {
			req.session.user = undefined;
			res.sendStatus(404);
			return;
		}
		else {
			var pwd = req.query.password;
			var hashedPwd = crypto.createHash('sha256').update(pwd).digest('base64').toString();
			
			if (hashedPwd === user.hashed_pwd) {
				req.session.user = user.id.valueOf();
				req.session.username = user.username;
				req.session.email = user.email;
				console.log('user information is correct');
			}
			else {
				console.log('incorrect password');
			}
		}
		if (err) {
			console.log("errors accessing users");
		}
		else {
			console.log("----------->user info:" + user);
			res.sendStatus(200);
		}
	});	
}


console.log("before defining app static route");
app.use('/', express.static('./public'));

app.get('/app/login/:username', function (req, res) {
	console.log("making a login request to server");
	console.log(req);
	var id = req.params.username;
	retrieveUserId(req, res, {username: id});
});

app.get('/app/login/', function (req, res) {
	console.log("making a login request to server via form");
	console.log(req);
	var id = req.query.username;
	retrieveUserIdWithPwd(req, res, {username: id});
});


app.get('/app/lists/:listId/count', function (req, res) {
	var id = req.params.listId;
	retrieveTasksCount(res, {listId: id});
});

app.post('/app/lists/', jsonParser, function(req, res) {
	var jsObj = req.body;
	jsObj.listId = new mongoose.Types.ObjectId;
	jsObj.owner = req.session.user;
	console.log('new list submitted' + JSON.stringify(jsObj));
	
	Lists.create([jsObj], function (err) {
		if (err) {
			console.log('object creation failed');
			displayDBError(err);
		}
		else {
			console.log('object created: ' + jsObj);
		}
	});
	res.send(jsObj.listId.valueOf());
});

app.put('/app/lists/:listId', jsonParser, function(req, res) {
	var id = req.params.listId;
	var jsObj = req.body;
	jsObj.owner = req.session.user;
	Lists.update({listId: id}, jsObj, {multi: false}, function (err) {
		if (err) {
			console.log('object update failed');
		}
	});
	res.sendStatus(200);
});

app.get('/app/lists/:listId', function (req, res) {
	var id = req.params.listId;
	retrieveListDetails(req, res, {listId: id});
});

app.get('/app/tasks/:listId', function (req, res) {
	var id = req.params.listId;
	retrieveListTasksDetails(res, {listId: id, owner: req.session.user});
});

app.get('/app/lists/', function (req, res) {
	retrieveAllLists(req, res);
});

console.log("after defining all dynamic routes");


http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});	
console.log("after callintg http: createServer");