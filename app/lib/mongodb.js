'use strict';

var MongoClient = require('mongodb').MongoClient;

exports.connect = function(name, cb){
  cb = cb || function(){};

  var url = 'mongodb://localhost/' + name;
  MongoClient.connect(url, function(err, db){

    if(!err){
      console.log('MongoDB (' + name + '): Online');
      global.mongodb = db;
      cb();
    }else{
      console.log(err);
      setTimeout(function(){
        exports.connect(name, cb);
      }, 10000);
    }

  });
};

