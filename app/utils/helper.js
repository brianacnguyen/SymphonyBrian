module.exports = {
    mapObject: function(object, callback) {
        return Object.keys(object).map(function(key) {
            return callback(key, object[key]);
        });
    },
    centsToDollars: function(n) {
        n = Number(n) / 100;
        return "$" + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    },
    calculateRetailPriceFromWholesale: function(wholesalePrice) {
        var retailPrice = (wholesalePrice / 75) * 100;
        return retailPrice;
    },
    calculateWholesalePriceFromRetail: function(retailPrice) {
        var wholesalePrice = (retailPrice / 100) * 75;
        return wholesalePrice;
    },
    arrayChunk: function(arr, size) {
        if (!Array.isArray(arr)) {
            throw new TypeError('Input should be Array');
        }

        if (typeof size !== 'number') {
            throw new TypeError('Size should be a Number');
        }

        var result = [];
        for (var i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, size + i));
        }

        return result;
    },
    isEmptyObject: function(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}
