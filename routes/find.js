var express = require('express');
var router = express.Router();
var satruck = require('../scrappers/satruck');
var goodwill = require('../scrappers/goodwill');
var soles4souls = require('../scrappers/soles4souls')

/* GET users listing. */
router.get('/', function(req, res, next) {
	if(!req.query.zip || !req.query.lat || !req.query.lon) {
		res.status(400).send("Missing parameters.");
		return;
	}

	var responses = 0;
	var list = [];

	var done = function() {
		responses++;
		if(responses >= 3) {
			res.send(list);
		}
	}

	satruck.getLocations(req.query.zip, function(response) {
		list.push (response);
		done();
	});

	goodwill.getLocations(req.query.lat, req.query.lon, function(response) {
		list.push (response);
		done();
	});

	soles4souls.getLocations(req.query.lat, req.query.lon, function(response) {
		list.push (response);
		done();
	});

});

module.exports = router;
