var express = require('express');
var url = require('url');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var app = express();

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var Lists;
var Tasks;

var idGenerator = 100;

//put config url behind file to hide passwords and username
var mongoDBConnection = require('./db.toDoSample.config');

console.log(mongoDBConnection.uri);

mongoose.connect(mongoDBConnection.uri);
mongoose.connection.on('open', function() {
	var Schema = mongoose.Schema;
	var ListsSchema = new Schema( 
		{
			name: String,
			description: String,
			listId: Number,
			due: String,
			state: String,
			owner: String
		},
	   {collection: 'lists'}
	);
	Lists = mongoose.model('Lists', ListsSchema);	
	var TasksSchema = new Schema( 
		{
			listId: Number,
			tasks: [ {
			   description: String,
			   taskId: Number,
			   shared: String,
			   status: String
			}]
		},
	   {collection: 'tasks'}
	);
	Tasks = mongoose.model('Tasks', TasksSchema);
	console.log('models have been created');
});

function retrieveAllLists(res) {
	var query = Lists.find({});
	query.exec(function (err, itemArray) {
		res.json(itemArray);
	});
}

function retrieveTasksDetails(res, query) {
	var query = Tasks.findOne(query);
	query.exec(function (err, itemArray) {
		res.json(itemArray);		
	});
}

function retrieveTasksCount(res, query) {
	var query = Tasks.find({listId:1}).select('tasks').count();
	query.exec(function (err, numberOfTasks) {
		console.log('number of tasks: ' + numberOfTasks);
		res.json(numberOfTasks);
	});
}

app.use('/', express.static('./public/'));
app.use('/app/json/', express.static('./app/json'));

app.get('/app/lists/:listId/count', function (req, res) {
	var id = req.params.listId;
	console.log('Query single list with id: ' + id);
	retrieveTasksCount(res, {listId: id});
});

app.post('/app/lists/', jsonParser, function(req, res) {
	console.log(req.body);
	var jsonObj = req.body;
	jsonObj.listId = idGenerator;
	Lists.create([jsonObj], function (err) {
		if (err) {
			console.log('object creation failed');
		}
	});
	res.send(idGenerator.toString());
	idGenerator++;
});

app.get('/app/lists/:listId', function (req, res) {
	var id = req.params.listId;
	console.log('Query single list with id: ' + id);
	retrieveTasksDetails(res, {listId: id});
});

app.get('/app/lists/', function (req, res) {
	console.log('Query All list');
	retrieveAllLists(res);
});

app.listen(80);