/* global $, io, document */

(function(){
  'use strict';

  $(document).ready(initialize);

  var socket;

  function initialize(){
    $('#add').click(add);
    $('#reboot').click(reboot);
    $('#delete-all').click(deleteAll);
    $('#free-mem').click(freeMem);
    $('#cpu').click(cpu);
    initializeSocketIo();
  }

  function reboot(){
    socket.emit('reboot');
  }

  function deleteAll(){
    socket.emit('delete-all');
  }

  function add(){
    var repository = $('#repository').val();
    var install = $('#install').val();
    var startup = $('#startup').val();
    socket.emit('add', {repository:repository, install:install, startup:startup});
  }

  function freeMem(){
    socket.emit('free-mem');
  }

  function cpu(){
    socket.emit('cpu');
  }

  function initializeSocketIo(){
    socket = io.connect('/app');
    socket.on('stdout', stdout);
    socket.on('stderr', stderr);
    socket.on('close', close);
  }

  function stdout(data){
    console.log(data);
  }

  function stderr(data){
    console.log(data);
  }

  function close(data){
    console.log(data);
  }
})();

