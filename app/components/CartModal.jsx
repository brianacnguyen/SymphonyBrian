var React = require("react");
var helper = require("helper");
var CartModalItem = require("CartModalItem");

var CartModal = React.createClass({
    handleProductAdd: function(productObj) {
        this.props.onProductAdd(productObj);
    },
    handleProductMinus: function(productObj) {
        this.props.onProductMinus(productObj);
    },
    onContinueShopping: function() {
        debugger;
        this.props.onContinueShopping();
    },
    render: function() {
        var {cart, cartSummary} = this.props;
        var formattedSubtotal = helper.centsToDollars(cartSummary.subtotal);

        var renderCartItems= () => {
            return helper.mapObject(cart, (key, item) => {
                return (
                    <CartModalItem key={key} {...item} onProductAdd={this.handleProductAdd} onProductMinus={this.handleProductMinus}/>
                )
            })
        };
        return (
            <div>
                  <div>Your Cart</div>
                  <div>{renderCartItems()}</div>
                  <div>
                      <div>Subtotal</div>
                      <div>{formattedSubtotal}</div>
                  </div>
                  <div>
                      <button onClick={this.onContinueShopping}>Continue Shopping</button>
                  </div>
            </div>
        )
    }
});

module.exports = CartModal;
