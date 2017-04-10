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
        var {name, defaultPriceInCents, mainImage, id, quantity, discountedPriceInCents, viewAs} = this.props;
        var formatedPrice = helper.centsToDollars(defaultPriceInCents);
        var formatedDiscountedPrice = helper.centsToDollars(discountedPriceInCents);
        var product = {
            id: id,
            name: name,
            img: mainImage.ref,
            defaultPriceInCents: defaultPriceInCents,
            discountedPriceInCents: discountedPriceInCents
        }
        var renderPrices = () => {
            if (viewAs === "retailer") {
                return (
                    <div className="cartmodel__item__info__price">{formatedPrice}</div>
                )
            } else {
                return (
                    <div className="cartmodel__item__info__price">{formatedDiscountedPrice}</div>
                )
            }
        };
        return (
            <div className="cartmodel__item__container">
                <img className="cartmodel__item__img" src={mainImage.ref} alt=""/>
                <div className="cartmodel__item__info">
                    <div className="cartmodel__item__info__name">{name}</div>
                    {renderPrices()}
                    <div className="cartmodel__item__info__quantity">{quantity}</div>
                    <div className="cartmodel__item__info__btns">
                        <button className="cartmodel__item__info__btn" onClick={this.onProductMinus(product)}>-</button>
                        <button className="cartmodel__item__info__btn" onClick={this.onProductAdd(product)}>+</button>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = CartModalitem;
