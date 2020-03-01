const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors');
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

var corsOptions = {
    origin: 'https://sandbox-reporting.rpdpymnt.com',
    optionsSuccessStatus: 200
  }
app.use(express.static(__dirname + '/dist/financial-case'));

app.get('/*',cors(corsOptions), function(req,res) {
res.sendFile(path.join(__dirname+'/dist/financial-case/index.html'));
});
app.listen(process.env.PORT || 8080);