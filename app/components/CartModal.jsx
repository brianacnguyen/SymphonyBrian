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
            <div className="cartmodal__container">
                <div className="cartmodal__wrapper">
                  <div className="cartmodal__header">Your Cart</div>
                  <div className="cartmodal__cart">{renderCartItems()}</div>
                  <div className="cartmodal__summary">
                      <div className="cartmodal__summary__description">Subtotal</div>
                      <div className="cartmodal__summary__price">{formattedSubtotal}</div>
                  </div>
                  <button className="cartmodal__continue-btn" onClick={this.onContinueShopping}>Continue Shopping</button>
                </div>
            </div>
        )
    }
});

module.exports = CartModal;
