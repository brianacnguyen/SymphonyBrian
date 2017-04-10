var React = require("react");
var SymphonyApi = require("SymphonyApi");
var ProductsList = require("ProductsList");
var CartModal = require("CartModal");
var ViewAsControl = require("ViewAsControl");
var helper = require("helper");

var Store = React.createClass({
    getInitialState: function() {
        // state == "error", "viewMenu", "viewCart" 
        return {
            status: "viewMenu",
            productsList: [],
            cart: {},
            cartSummary: {
                subtotal: 0,
                discountedSubtotal: 0
            },
            viewAs: "retailer"
        }
    },
    componentWillMount: function() {
        var that = this;
        SymphonyApi.getSymphonyData().then(function(data) {
            var productsList = [];
            $.each(data.products, (index, product) => {
                var productObj = {};
                productObj.id = product.id;
                productObj.name = product.name;
                productObj.mainImage = product.mainImage;
                productObj.defaultPriceInCents = product.defaultPriceInCents;
                productObj.discountedPriceInCents = helper.calculateWholesalePriceFromRetail(product.defaultPriceInCents);
                productsList.push(productObj);
            })
            that.setState({
                productsList: productsList
            });
        }, function(e){
            that.setState({
                status: "error"
            });
        })
    },
    addProductToCart: function(productObj) {
        var {cart, cartSummary} = this.state;
        var productId = productObj.id;
        if (cart.hasOwnProperty(productId)) {
            cart[productId].quantity ++
        } else {
            cart[productId] = productObj;
            cart[productId].quantity = 1;
        }
        cartSummary.subtotal += productObj.defaultPriceInCents;
        cartSummary.discountedSubtotal += productObj.discountedPriceInCents;

        this.setState({
            status: "viewCart",
            cart: cart,
            cartSummary: cartSummary
        })
    },
    removeProductFromCart: function(productObj) {
        var {cart, cartSummary} = this.state;
        var productId = productObj.id;
        if (cart[productId].quantity > 1) {
            cart[productId].quantity --;
        } else {
            delete cart[productId];
        }

        cartSummary.subtotal -= productObj.defaultPriceInCents;
        cartSummary.discountedSubtotal -= productObj.discountedPriceInCents;
        this.setState({
            status: helper.isEmptyObject(cart) ? "viewMenu" : "viewCart",
            cart: cart,
            cartSummary: cartSummary
        })
    },
    handleProductAdd: function(productObj) {
        this.addProductToCart(productObj);
    },
    handleProductMinus: function(productObj) {
        this.removeProductFromCart(productObj);
    },
    handleContinueShopping: function() {
        this.setState({
            status: "viewMenu"
        })
    },
    handleViewChange: function(viewAs) {
        this.setState({
            viewAs: viewAs
        })
    },
    render: function() {
        var {status, productsList, cart, cartSummary, viewAs} = this.state;
        var renderCart = () => {
            if (status === "viewCart") {
                return(
                    <div>
                        <CartModal cart={cart} cartSummary={cartSummary} onProductAdd={this.handleProductAdd} onProductMinus={this.handleProductMinus} onContinueShopping={this.handleContinueShopping} viewAs={viewAs}/>
                    </div>
                )
            }
        }
        const bannerStyle = {
            "backgroundImage": "url(https://d20b8ckvu6gb0w.cloudfront.net/fijiwater/images/FIJI-extra-banner.png)"
        }
        return (
            <div>
                <div className="store__container">
                    <div className="store__banner__container">
                        <div className="store__banner" style={bannerStyle}> </div>
                    </div>
                    <div  className="store__main">
                      <ViewAsControl viewAs={viewAs} onViewChange={this.handleViewChange}/>
                      <ProductsList productsList={productsList} onProductAdd={this.handleProductAdd} viewAs={viewAs}/>
                    </div>
                </div>
              {renderCart()}
            </div>
        )
    }
});

module.exports = Store;
