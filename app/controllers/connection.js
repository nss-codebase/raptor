'use strict';

var add = require('./add');

module.exports = function(socket){
  socket.on('add', add);
};

