var React = require("react");

var ViewAsControl = React.createClass({
    getInitialState: function() {
        return{
            viewAs: "retailer"
        }
    },
    onViewChange: function(event) {
        this.setState({
            viewAs: event.target.value
        })
        this.props.onViewChange(event.target.value);
    },
    render: function() {
        var {viewAs} = this.state;

        return (
            <div>
                <div>
                    View as
                </div>
                <select value={viewAs} onChange={this.onViewChange}>
                    <option value="retailer">Retailer</option>
                    <option value="wholesaler">Wholesaler</option>
                </select>
            </div>
        )
    }
});

module.exports = ViewAsControl;
