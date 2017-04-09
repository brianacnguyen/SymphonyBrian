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
            <li className="product__container">
                <img className="product__img"src={mainImage.ref} alt=""/>
                <div className="product__name">{name}</div>
                <div className="product__price">{formatedPrice}</div>
                <button className="product__add-btn" onClick={this.onProductAdd(product)}>Add to cart</button>
            </li>
        )
    }
});

module.exports = Product;
