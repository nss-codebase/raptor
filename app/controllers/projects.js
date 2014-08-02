'use strict';

var Project = require('../models/project');

exports.add = function(data){
  Project.add(this, data);
};

exports.reboot = function(){
  Project.reboot(this);
};

exports.deleteAll = function(){
  Project.deleteAll(this);
};

exports.freeMem = function(){
  Project.freeMem(this);
};

exports.cpu = function(){
  Project.cpu(this);
};

exports.list = function(){
  Project.list(this);
};

exports.proxy = function(){
  Project.proxy(this);
};

exports.raptor = function(){
  Project.raptor(this);
};

exports.deleteProject = function(data){
  Project.deleteProject(this, data);
};

exports.updateProject = function(data){
  Project.updateProject(this, data);
};

