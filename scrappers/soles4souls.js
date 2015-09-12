var needle = require("needle");
var util = require("util");

module.exports = {

	getLocations: function (latitude, longitude, callback) {

		var url = "https://soles4souls.org/wp-admin/admin-ajax.php?action=store_search&lat=%s&lng=%s&max_results=50&radius=50";
	
		needle.get(util.format(url, latitude, longitude), function (error, response) {
			var retLocations = [];
			if(!error && response.statusCode == 200) {
				var locations = response.body;
				for(location of locations) {
					retLocations.push({ 
						"Latitude" : location.lat,
						"Longitude": location.lon
					});
				}
				callback(retLocations);
			}
		});
	}
}

