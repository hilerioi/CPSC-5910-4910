var express = require('express');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var mongoDBConnection = 'mongodb://admin/Password1p@localhost:28008';

var dbHandle;

MongoClient.connect(mongoDBConnection, function (err, db) {
	dbHandle = db;
});
	
function accessTransportation(res, query) {
	var myDB = dbHandle.db('classSample');
	myDB.collection('newCollection', function(err, nCollection) {
		nCollection.find(query, function (err, cursor) {
			cursor.toArray(function(err, itemArray) {
				var list = "<h1>Request One</h1>";
				for (var i = 0; i < itemArray.length; i++) {
					list += "<h3>" + itemArray[i].vehicle + " : " + itemArray[i].speed + "</h3>";
				}
				res.send(list);
			});
		});
	});
}

//serve static content for the app from the 'pages' directory in the app dir
app.use('/images', express.static('./img'));

app.get('/all', function (req, res) {
	accessTransportation(res, {});
	//res.send('request one');
});

app.get('/search', function (req, res) {
	var urlParts = url.parse(req.url, true);
	var query = urlParts.query;
//	var sum = query.var1 + query.var2;
	var msg = 'search for ' + query.var1;
	console.log(msg);
	accessTransportation(res, {speed: query.var1});
//	res.send(msg);
});

app.get('/vehicle/:vname', function (req, res) {
	var vname = req.param('vname');
	console.log('Query for vehicle name: ' + vname);
	accessTransportation(res, {vehicle: vname});	
	//res.send("Your name is: "  + vname);
});

app.param('vname', function (req, res, next, value) {
	console.log('The param value is: ' + value);
	next();
});

app.use(express.static('./pages'));

app.listen(80);