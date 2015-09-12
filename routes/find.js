var express = require('express');
var router = express.Router();
var satruck = require('../scrappers/satruck');

/* GET users listing. */
router.get('/:zip', function(req, res, next) {
	satruck.getSalvationArmy(req.params.zip, function(response) {
		res.send(response);
	});
});

module.exports = router;
