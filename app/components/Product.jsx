var React = require("react");
var helper = require("helper");

var Product = React.createClass({
    onProductAdd: function(productObj) {
        return () => {
            this.props.onProductAdd(productObj);
        }
    },
    render: function() {
        var {name, defaultPriceInCents, mainImage, id} = this.props;
        var formatedPrice = helper.centsToDollars(defaultPriceInCents);
        var product = {
            id: id,
            name: name,
            mainImage: mainImage,
            defaultPriceInCents: defaultPriceInCents
        }
        return (
            <div>
                <img src={mainImage.ref} alt=""/>
                <div>{name}</div>
                <div>{formatedPrice}</div>
                <button onClick={this.onProductAdd(product)}>Add to cart</button>
            </div>
        )
    }
});

module.exports = Product;
