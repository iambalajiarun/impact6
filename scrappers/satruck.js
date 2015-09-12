var needle = require("needle");

module.exports = {

	getSalvationArmy: function (zipcode, callback) {

		var url = "https://satruck.org/apiservices/pickup/donategoods/locations?Type=3&ZipCode=";
	
		needle.get(url + zipcode, function (error, response) {

			if(!error && response.statusCode == 200) {
				var json = response.body;
				var locations = json.RetVal.Locations;
				var retLocations = [];
				for(location of locations) {
					retLocations.push({ 
						"Latitude" : location.Latitude,
						"Longitude": location.Longitude
					});
				}
				callback(retLocations);
			}
		});
	}
}

