var React = require("react");
var Product = require("Product");
var helper = require("helper");

var ProductsList = React.createClass({
    propType: {
        productsList : React.PropTypes.array.isRequired
    },
    handleProductAdd: function(productObj) {
        this.props.onProductAdd(productObj);
    },
    render: function() {
        var {productsList, viewAs} = this.props;
        var productsRows = helper.arrayChunk(productsList, 3);
        var renderProductsList = (productsList) => {
            return productsList.map((product) => {
                return (
                    <Product key={product.id} {...product} onProductAdd={this.handleProductAdd} viewAs={viewAs}/>
                );
            });
        };
        var renderProductsRows = () => {
            return productsRows.map((row) => {
                return (
                    <ul className="products-list__row">
                        {renderProductsList(row)}
                    </ul>
                )
            });
        }
        return (
            <div className="products-list">
                  {renderProductsRows()} 
            </div>
        )
    }
});

module.exports = ProductsList;
