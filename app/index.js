'use strict';

var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.send('home');
});

app.get('/apps/new', function(req, res){
  res.render('apps/new');
});

app.post('/apps', function(req, res){
  console.log(req.body);
  res.redirect('/');
});

app.listen(7777, function(){
  console.log('Raptor is listening...');
});

