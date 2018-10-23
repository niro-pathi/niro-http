var querystring = require('querystring');
var https = require('https');

var host = 'whitefriarsconnect.com.au';
var username = 'JonBob';
var password = '*****';
var apiKey = '*****';
var sessionId = null;
var deckId = '68DC5A20-EE4F-11E2-A00C-0858C0D5C2ED';

const express = require('express');  
const path = require('path');  
const app = express();

//login();

// view engine setup
app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'jade');


  app.get('/', function(req, res, next) {
    var tournaments = request({
      uri: 'https://whitefriarsconnect.com.au/admin/apiintegration/getactiveusers?email=cpathirana@whitefriars.vic.edu.au&password=Cpathirana@gradway1',
    })
    
    res.render('index', {tournaments});
    next()
  });

module.exports = app;  

function login() {
    
    performRequest('/admin/apiintegration/getactiveusers?email=cpathirana@whitefriars.vic.edu.au&password=Cpathirana@gradway1', 'POST', {
    }, function(data) {
     
    });
  }

function performRequest(endpoint, method, data, success) {
  var dataString = JSON.stringify(data);
  var headers = {};
  
  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length
    };
  }
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      console.log(responseString);
      
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  req.write(dataString);
  req.end();
}