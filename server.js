"use strict";
const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      riot = require('riot'),
      app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/*
app.post('/project', function(req, res) {
  todos.push(req.body.todo);
  res.status(201).json({'todo': req.body.todo});
});


app.get('/project', function(req, res) {
  res.status(200).json({'todos': todos});
});
*/

app.listen(8080, function(){
  console.log("ready captain.");
});
