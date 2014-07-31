'use strict';

var mongodb = require('./lib/mongodb');
var Project = require('./models/project');
var express = require('express');
var app = express();

var morgan = require('morgan');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  Project.all(function(err, projects){
    res.render('raptor', {projects:projects});
  });
});

app.get('/projects', function(req, res){
  Project.all(function(err, projects){
    res.render('projects', {projects:projects});
  });
});

var server = require('http').Server(app);

server.listen(7005, function(){
  console.log('Express (raptor): Online');
});

var connection = require('./controllers/connection');
var io = require('socket.io')(server);
io.of('/app').on('connection', connection);

mongodb.connect('raptor');

