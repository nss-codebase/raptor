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
    $('#list').click(list);
    $('#projects').on('click', '.delete', deleteProject);
    $('#projects').on('click', '.update', updateProject);
    initializeSocketIo();
  }

  function deleteProject(e){
    var id = $(this).parent().parent().data('id');
    socket.emit('delete-project', {id:id});
    e.preventDefault();
  }

  function updateProject(e){
    var id = $(this).parent().parent().data('id');
    socket.emit('update-project', {id:id});
    e.preventDefault();
  }

  function reboot(){
    socket.emit('reboot');
  }

  function deleteAll(){
    socket.emit('delete-all');
  }

  function add(){
    var subdomain = $('#subdomain').val().trim();
    var port = $('#port').val().trim();
    var repository = $('#repository').val().trim();
    var install = $('#install').val().trim();
    var startup = $('#startup').val().trim();
    socket.emit('add', {subdomain:subdomain, port:port, repository:repository, install:install, startup:startup});
  }

  function freeMem(){
    socket.emit('free-mem');
  }

  function cpu(){
    socket.emit('cpu');
  }

  function list(){
    socket.emit('list');
  }

  function initializeSocketIo(){
    socket = io.connect('/app');
    socket.on('project', project);
    socket.on('stdout', stdout);
    socket.on('stderr', stderr);
    socket.on('close', close);
  }

  function project(){
    $.ajax({url:'/projects', type:'get', dataType:'html', data:{}, success:function(html){
      $('#projects').empty().append(html);
    }});
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

