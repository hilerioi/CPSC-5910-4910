var express = require('express');
var url = require('url');
var app = express();

app.use('/', express.static('./public/'));
app.use('/app/json/', express.static('./app/json'));

app.listen(80);