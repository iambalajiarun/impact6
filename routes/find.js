var express = require('express');
var router = express.Router();
var satruck = require('../scrappers/satruck');
var goodwill = require('../scrappers/goodwill');
var soles4souls = require('../scrappers/soles4souls')

/* GET users listing. */
router.get('/:zip', function(req, res, next) {
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

	goodwill.getLocations("39.00653839111328", "-77.52937316894531", function(response) {
		list.push (response);
		done();
	});

	soles4souls.getLocations("39.00653839111328", "-77.52937316894531", function(response) {
		list.push (response);
		done();
	});

});

module.exports = router;
