var express = require('express');
var url = require('url');
var app = express();

//serve static content for the app from the 'pages' directory in the app dir
app.use('/images', express.static('./img'));

app.get('/one', function (req, res) {
	res.send('request one');
});

app.get('/add', function (req, res) {
	var urlParts = url.parse(req.url, true);
	var query = urlParts.query;
	var sum = query.var1 + query.var2;
	var msg = 'addition of ' + query.var1 + ' plus ' + query.var2 + ' equals ' + sum;
	console.log(msg);
	res.send(msg);
});

app.get('/name/:fname', function (req, res) {
	var name;
	var fname = req.param('fname');
	if (fname === 'israelh') {
		name = fname + ' hilerio';
	}
	else {
		name = fname + ' world';
	}
	console.log(name);
	res.send("Your name is: "  + name);
});

app.param('fname', function (req, res, next, value) {
	console.log('The param value is: ' + value);
	next();
});

app.use(express.static('./pages'));


app.listen(80);