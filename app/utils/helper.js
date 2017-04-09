module.exports = {
    mapObject: function(object, callback){
        return Object.keys(object).map(function (key) {
            return callback(key, object[key]);
        });     
    },
    centsToDollars: function(n) {
        n = Number(n)/100;
        return "$" + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    },
    calculateRetailPriceFromWholesale: function(wholesalePrice) {
        var retailPrice = (wholesalePrice/75)*100;
        return retailPrice; 
    },
    calculateWholesalePriceFromRetail: function(retailPrice) {
        var wholesalePrice = (retailPrice/100)*75;
        return wholesalePrice; 
    },
}
