module.exports = function(app){
    var products = require('./controllers/products');
    app.get('/getprice', products.getPrice);
}
