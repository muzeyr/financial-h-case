//Install express server
const express = require('express');
const path = require('path');

const app = express();
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/financial-case'));


app.get('/*',cors(corsOptions), function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/financial-case/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);