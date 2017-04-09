module.exports = {
    mapObject: function(object, callback){
        return Object.keys(object).map(function (key) {
            return callback(key, object[key]);
        });     
    }
}
