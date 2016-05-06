/// <reference path="database.ts"/>

var express = require('express');
var app = express();
var http = require('http').Server(app);
var socket_io = require('socket.io')(http);
var mongoose = require('mongoose');

var dbconfig = require('./dbconfig.json');
var database = new Database(mongoose, dbconfig.server, dbconfig.port, dbconfig.database, dbconfig.options);

/// <reference path="socket.ts"/>

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});

app.use('/app', express.static(__dirname + '/app/'));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));

http.listen(3000, function(){
  console.log('listening on Port:3000');
});