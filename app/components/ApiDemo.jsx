var React = require("react");
var SymphonyApi = require("SymphonyApi");

var Home = React.createClass({
    getInitialState: function() {
        return {
            productsList: [],
            id: undefined,
            viewAs: "retailer",
            url: undefined
        }
    },
    onViewChange: function(event) {
        var {id} = this.state;
        var url = "/getprice?id=" + id + "&user=" + event.target.value;
        this.setState({
            viewAs: event.target.value,
            url: url
        })
    },
    onIdChange: function(event) {
        var {viewAs} = this.state;
        var url = "/getprice?id=" + event.target.value + "&user=" + viewAs;
        this.setState({
            id: event.target.value,
            url: url
        })
    },
    componentWillMount: function() {
        var that = this;
        SymphonyApi.getSymphonyData().then(function(data) {
            var productsList = [];
            $.each(data.products, (index, product) => {
                productsList.push(product.id);
            })
            var url = "/getprice?id=" + productsList[0] + "&user=retailer";
            that.setState({
                productsList: productsList,
                id: productsList[0],
                url: url
            });
        }, function(e){
           alert(e);
        })
    },
    render: function() {
        var {viewAs, productsList, id, url} = this.state;
        var renderIdList = () => {
            if (productsList.length > 0) {
                return productsList.map((productId) => {
                    return (
                        <option value={productId}>{productId}</option>
                    );
                });
            }
        };

        return (
            <div className="apidemo">
                <div className="apidemo__header">
                  API Endpoint Demo
                </div>
                <div className="apidemo__query">
                    <div className="apidemo__query__header">
                        Query Parameters
                    </div>
                    <div className="apidemo__query__container">
                        <div>ID</div>
                        <select value={id} onChange={this.onIdChange}>
                            {renderIdList()}
                        </select>
                    </div>
                    <div className="apidemo__query__container">
                        <div>User</div>
                        <select value={viewAs} onChange={this.onViewChange}>
                            <option value="retailer">Retailer</option>
                            <option value="wholesaler">Wholesaler</option>
                        </select>
                    </div>
                    <div className="apidemo__query__container apidemo__query__container__url">
                        <div>Access Url:</div>
                        <div className="apidemo__query__url">
                            {url}
                        </div>
                    </div>
                    <div className="apidemo__query__container apidemo__query__container__url">
                        <a className="apidemo__query__btn" target="_blank" href={url}>Open link</a>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Home;
