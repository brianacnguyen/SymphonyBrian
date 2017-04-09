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
                subtotal: 0
            },
            viewAs: "retailer"
        }
    },
    componentWillMount: function() {
        var that = this;
        SymphonyApi.getSymphonyData().then(function(data) {
            that.setState({
                productsList: data.products
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

        this.setState({
            status: cart.length ? "viewMenu": "viewCart",
            cart: cart,
            cartSummary: cartSummary
        })
    },
    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.viewAs != prevState.viewAs) {
            var {productsList, cart, cartSummary} = this.state;

            if (this.state.viewAs === "retailer") {
                productsList.map((product) => {
                    product.defaultPriceInCents = helper.calculateRetailPriceFromWholesale(product.defaultPriceInCents);
                })
                helper.mapObject(cart, (key, item) => {
                    item.defaultPriceInCents = helper.calculateRetailPriceFromWholesale(item.defaultPriceInCents);
                })
                cartSummary.subtotal = helper.calculateRetailPriceFromWholesale(cartSummary.subtotal);
            } else if (this.state.viewAs === "wholesaler") {
                productsList.map((product) => {
                    product.defaultPriceInCents = helper.calculateWholesalePriceFromRetail(product.defaultPriceInCents);
                })
                helper.mapObject(cart, (key, item) => {
                    item.defaultPriceInCents = helper.calculateWholesalePriceFromRetail(item.defaultPriceInCents);
                })
                cartSummary.subtotal = helper.calculateWholesalePriceFromRetail(cartSummary.subtotal);
            }
            this.setState({
                productsList: productsList,
                cart: cart,
                cartSummary: cartSummary
            })
        }
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
                        <CartModal cart={cart} cartSummary={cartSummary} onProductAdd={this.handleProductAdd} onProductMinus={this.handleProductMinus} onContinueShopping={this.handleContinueShopping}/>
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
                      <ProductsList productsList={productsList} onProductAdd={this.handleProductAdd}/>
                    </div>
                </div>
              {renderCart()}
            </div>
        )
    }
});

module.exports = Store;
