'use strict';

var add = require('./add');
var reboot = require('./reboot');
var deleteAll = require('./delete-all');

module.exports = function(socket){
  socket.on('add', add);
  socket.on('reboot', reboot);
  socket.on('delete-all', deleteAll);
};

