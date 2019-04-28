// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string", function (req, res) {
  if (req.params.date_string && req.params.date_string.length > 0) {
    var regex = /^\d+$/;
    var myDateString = req.params.date_string;
    if (regex.test(myDateString)) {
      myDateString = Number(myDateString);
    }
    var myDate = new Date(req.params.date_string);
    if (myDate !== 'Invalid Date') {
      res.json({"unix": myDate.getTime(), "utc" : myDate.toUTCString()});
    } else {
      res.json({"unix": null, "utc" : "Invalid Date" });
    }
  }
});

app.get("/api/timestamp/", function (req, res) {
  var myDate = new Date();
  res.json({"unix": myDate.getTime(), "utc" : myDate.toUTCString()});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
