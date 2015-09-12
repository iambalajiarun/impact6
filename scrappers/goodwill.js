var needle = require("needle");
var util = require("util");

module.exports = {

	getLocations: function (latitude, longitude, callback) {

		var url = "http://www.goodwill.org/?action=gii_locator_locations&points_only=1&lat=%s&lng=%s&faster_ajax=1&limit=10&services_included%5B%5D=3&services_included%5B%5D=1&services_included%5B%5D=2";
	
		needle.get(util.format(url, latitude, longitude), function (error, response) {
			var retLocations = [];
			if(!error && response.statusCode == 200) {
				var array = JSON.parse(response.body);
				for(item in array) {
					retLocations.push({ 
						"Latitude" : array[item][1],
						"Longitude": array[item][2]
					});
				}
				callback(retLocations);
			}
		});
	}
}

