var React = require("react");
var {Link} = require("react-router");

var Home = React.createClass({
    render: function() {
        return (
            <div className="home">
                <div className="home__header">
                  Hello Phil. I've been expecting you...
                </div>
                  <Link to="/store" className="home__continue-btn" activeClassName="">Continue to Store</Link>
            </div>
        )
    }
});

module.exports = Home;
