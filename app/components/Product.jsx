var React = require("react");
var helper = require("helper");

var Product = React.createClass({
    onProductAdd: function(productObj) {
        return () => {
            this.props.onProductAdd(productObj);
        }
    },
    render: function() {
        var {name, defaultPriceInCents, discountedPriceInCents, mainImage, id, viewAs} = this.props;
        var formatedPrice = helper.centsToDollars(defaultPriceInCents);
        var formatedDiscountedPrice = helper.centsToDollars(discountedPriceInCents);
        var product = {
            id: id,
            name: name,
            mainImage: mainImage,
            defaultPriceInCents: defaultPriceInCents, 
            discountedPriceInCents: discountedPriceInCents
        }
        var renderPrices = () => {
            if (viewAs === "retailer") {
                return(
                    <div className="product__price">{formatedPrice}</div>
                )
            } else {
                return (
                    <div className="product__discounted-price__container">
                        <div className="product__discounted-price__display">
                            <div className="product__discounted-price__display__discounted">{formatedDiscountedPrice}</div>
                            <div className="product__discounted-price__display__original">{formatedPrice}</div>
                        </div>
                        <div className="product__discounted-price__text-display">
                            25% wholesale discount!
                        </div>
                    </div>
                )
            } 
        }
        return (
            <li className="product__container">
                <img className="product__img"src={mainImage.ref} alt=""/>
                <div className="product__name">{name}</div>
                {renderPrices()}
                <button className="product__add-btn" onClick={this.onProductAdd(product)}>Add to cart</button>
            </li>
        )
    }
});

module.exports = Product;
