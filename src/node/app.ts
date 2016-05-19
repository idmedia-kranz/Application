/// <reference path="database.ts"/>
/// <reference path="events.ts"/>
/// <reference path="session.ts"/>

const bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));

var express = require('express');
var app = express();
var http = require('http').Server(app);
var socket_io = require('socket.io')(http);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('extend');

var dbconfig = require('./dbconfig.json');
var database = new Database(mongoose, dbconfig.server, dbconfig.port, dbconfig.database, dbconfig.options);

/// <reference path="socket.ts"/>

var session = new Session();

/// <reference path="playground.ts"/>

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});

app.get('/editor', function(req, res){
  res.sendFile(__dirname + '/app/editor.html');
});

app.get('/playground', function(req, res){
  res.sendFile(__dirname + '/app/playground.html');
});

app.use('/app', express.static(__dirname + '/app/'));
app.use('/img', express.static(__dirname + '/app/public/img'));

http.listen(3000, function(){
  console.log('listening on Port:3000');
});