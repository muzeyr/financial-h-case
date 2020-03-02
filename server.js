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

console.log('Server is running...');
app.get('/*',cors(corsOptions), function(req,res) {
  /*
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
*/
  res.sendFile(path.join(__dirname+'/dist/financial-case/index.html'));
});
app.listen(process.env.PORT || 8080);