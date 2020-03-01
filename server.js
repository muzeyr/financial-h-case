const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors');
var forceSsl = require('force-ssl-heroku');
var corsOptions = {
    origin: 'https://sandbox-reporting.rpdpymnt.com',
    optionsSuccessStatus: 200
  }
app.use(express.static(__dirname + '/dist/financial-case'));

app.get('/*',cors(corsOptions), function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/financial-case/index.html'));
});
app.listen(process.env.PORT || 8080);