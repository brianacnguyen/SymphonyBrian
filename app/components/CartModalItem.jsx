var React = require("react");
var helper = require("helper");

var CartModalitem = React.createClass({
    onProductAdd: function(productObj) {
        return () => {
            this.props.onProductAdd(productObj);
        }
    },
    onProductMinus : function(productObj) {
        return () => {
            this.props.onProductMinus(productObj);
        }
    },
    render: function() {
        var {name, defaultPriceInCents, mainImage, id, quantity} = this.props;
        var formatedPrice = helper.centsToDollars(defaultPriceInCents);
        var product = {
            id: id,
            name: name,
            img: mainImage.ref,
            defaultPriceInCents: defaultPriceInCents
        }
        return (
            <div>
                <img src={mainImage.ref} alt=""/>
                <div>{name}</div>
                <div>{formatedPrice}</div>
                <div>{quantity}</div>
                <button onClick={this.onProductAdd(product)}>Plus</button>
                <button onClick={this.onProductMinus(product)}>Minus</button>
            </div>
        )
    }
});

module.exports = CartModalitem;
