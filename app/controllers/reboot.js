'use strict';

var spawn = require('child_process').spawn;

module.exports = function(data){
  spawn('/home/ubuntu/apps/code/raptor/app/bash/reboot.sh');
};

