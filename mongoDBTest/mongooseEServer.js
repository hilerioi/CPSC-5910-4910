var express = require('express');
var url = require('url');
var mongoose = require('mongoose');
var app = express();

var Transport;

//put config url behind file to hide passwords and username
var mongoDBConnection = require('./db.config');

console.log(mongoDBConnection.uri);
mongoose.connect(mongoDBConnection.uri);

mongoose.connection.on('open', function() {
	var Schema = mongoose.Schema;
	var transportationSchema = new Schema( 
	   {vehicle: String,
		speed: String},
	   {collection: 'newCollection'}
	);
	Transport = mongoose.model('Transport', transportationSchema);
	console.log('connected to the dB');
});

function accessTransportation(res, query, flag) {
	if (flag === true) {
		var query = Transport.where(query);
		query.exec(function (err, itemArray) {
			res.json(itemArray);
		});
	}
	else {
		var query = Transport.where(query);
		query.exec(function (err, itemArray) {
			var list = "<h1>Request One</h1>";
			for (var i = 0; i < itemArray.length; i++) {
				list += "<h3>" + itemArray[i].vehicle + " : " + itemArray[i].speed + "</h3>";
			}
			res.send(list);
		});
	}
}

//serve static content for the app from the 'pages' directory in the app dir
//app.use('/images', express.static('./img'));

app.get('/all', function (req, res) {
	accessTransportation(res, {}, false);
	//res.send('request one');
});

app.get('/search', function (req, res) {
	var urlParts = url.parse(req.url, true);
	var query = urlParts.query;
//	var sum = query.var1 + query.var2;
	var msg = 'search for ' + query.var1;
	console.log(msg);
	accessTransportation(res, {speed: query.var1}, false);
//	res.send(msg);
});

app.get('/vehicle/:vname', function (req, res) {
	var vname = req.param('vname');
	console.log('Query for vehicle name: ' + vname);
	accessTransportation(res, {vehicle: vname}, false);	
	//res.send("Your name is: "  + vname);
});

app.get('/all/json', function(req, res) {
	accessTransportation(res, {}, true);	
	console.log('sending back json object');
});

app.param('vname', function (req, res, next, value) {
	console.log('The param value is: ' + value);
	next();
});

app.use(express.static('./pages3'));

app.listen(80);