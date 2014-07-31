'use strict';

var MongoClient = require('mongodb').MongoClient;

exports.connect = function(name, cb){
  cb = cb || function(){};

  var url = 'mongodb://localhost/' + name;
  MongoClient.connect(url, function(err, db){
    console.log('MongoDB (' + name + '): Online');
    global.mongodb = db;
    cb();
  });
};

