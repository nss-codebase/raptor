'use strict';

var express = require('express');
var app = express();

var morgan = require('morgan');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('raptor');
});

var server = require('http').Server(app);

server.listen(7003, function(){
  console.log('Raptor is listening...');
});

var connection = require('./controllers/connection');
var io = require('socket.io')(server);
io.of('/app').on('connection', connection);

