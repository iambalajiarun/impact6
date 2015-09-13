var express = require('express');
var router = express.Router();
var satruck = require('../scrappers/satruck');
var goodwill = require('../scrappers/goodwill');
var soles4souls = require('../scrappers/soles4souls')

/* GET users listing. */
router.get('/:zip/:lat/:lon', function(req, res, next) {

	var responses = 0;
	var list = [];

	var done = function() {
		responses++;
		if(responses >= 3) {
			res.send(list);
		}
	}

	satruck.getLocations(req.params.zip, function(response) {
		list.push (response);
		done();
	});

	goodwill.getLocations(req.params.lat, req.params.lon, function(response) {
		list.push (response);
		done();
	});

	soles4souls.getLocations(req.params.lat, req.params.lon, function(response) {
		list.push (response);
		done();
	});

});

module.exports = router;
