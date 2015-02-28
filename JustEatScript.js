ApiClient = (function() {
    var self = {};

    var baseURI = 'http://api-interview.just-eat.com/';

    self.setUp = function () {
        $.ajaxSetup({
            headers: {
                'Accept-Tenant': 'uk',
                'Authorization': 'Basic VGVjaFRlc3RBUEk6dXNlcjI='
            }
        });
    };

    self.getProductsForRestaurant = function (restaurantId, callback) {
        $.getJSON(baseURI + 'restaurants/' + restaurantId + '/productcategories?type=delivery&time' + new Date().toUTCString(), function (results) {
            console.log(results);
            callback(results.Menu);
        });
    };
	
	self.searchByPostcode = function (postcode, callback) {
        $.getJSON(baseURI + 'restaurants?q=' + postcode, function (results) {
            console.log(results);
            callback(results.Menu);
        });
    };
    return self;
})();