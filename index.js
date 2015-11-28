var express = require('express');
var app = express();
var request = require('request');
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index');
});

//NSString * requestLocationUrl = [NSString stringWithFormat: @"https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyBRPB09q2AnUNja2p_AdVbbwOmS0eI7n2A"];

app.get('/getGeocodeData/:latitude/:longitude', function(req, res, next) {
    console.log(req.params.latitude);
    console.log(req.params.longitude);
    var qLatitude = req.params.latitude;
    var qLongitude = req.params.longitude;


    // input value from search
    var val = req.query.search;
    //console.log(val);

    // url used to search yql
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + qLatitude + "," + qLongitude + "&key=YOUR SERVER KEY";

    console.log(url);

    // request module is used to process the yql url and return the results in JSON format
    request(url, function(err, resp, body) {
        body = JSON.parse(body);
        console.log(body);
        res.json(body.results[1].formatted_address);
    });

    // pass back the results to client side
    //    res.send(craig);


});



app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
