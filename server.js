const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors');
var forceSsl = require('force-ssl-heroku');
var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
app.use(express.static(__dirname + '/dist/financial-case'));


app.get('/*',cors(corsOptions), function(req,res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

res.sendFile(path.join(__dirname+'/dist/financial-case/index.html'));
});
app.listen(process.env.PORT || 8080);