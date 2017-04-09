var React = require("react");
var Product = require("Product");

var ProductsList = React.createClass({
    propType: {
        productsList : React.PropTypes.array.isRequired
    },
    handleProductAdd: function(productObj) {
        this.props.onProductAdd(productObj);
    },
    render: function() {
        var {productsList} = this.props;
        var renderProductsList = () => {
            return productsList.map((product) => {
                return (
                    <Product key={product.id} {...product} onProductAdd={this.handleProductAdd}/>
                );
            });
        };
        return (
            <div>
                  <div>{renderProductsList()}</div>
            </div>
        )
    }
});

module.exports = ProductsList;
