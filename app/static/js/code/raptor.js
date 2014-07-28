/* global $, io, document */

(function(){
  'use strict';

  $(document).ready(initialize);

  var socket;

  function initialize(){
    $('#add').click(add);
    initializeSocketIo();
  }

  function add(){
    var repository = $('#repository').val();
    var install = $('#install').val();
    var startup = $('#startup').val();
    socket.emit('add', {repository:repository, install:install, startup:startup});
  }

  function initializeSocketIo(){
    socket = io.connect('/app');
    socket.on('bash', bash);
  }

  function bash(data){
    console.log(data);
  }
})();

