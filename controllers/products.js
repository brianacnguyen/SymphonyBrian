var request = require('request');

const SYMPHONY_API_URL = "https://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js";

var centsToDollars =  function(n) {
    n = Number(n) / 100;
    return "$" + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

module.exports = {
    getPrice: function(req, res) {
        var id = req.query.id;
        var user = req.query.user || "retailer";
        var request = require('request');
        request(SYMPHONY_API_URL, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var productPrice = undefined;
                var productsList = JSON.parse(body).products;
                for (var i=0; i < productsList.length; i++) {
                    var productObj = productsList[i];
                    if (productObj.id == id) {
                        productPrice = productObj.defaultPriceInCents;
                    }
                }
                if (productPrice) {
                    if (user == "wholesaler") {
                        productPrice = (productPrice / 100) * 75;
                    }
                    res.send({
                        "price": centsToDollars(productPrice)
                    });
                } else {
                    res.statusCode = 401;
                    res.send('No product found');
                }
            }
        })
    }
}
