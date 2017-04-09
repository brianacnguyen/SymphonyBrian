var React = require("react");
var {Link} = require("react-router");

var Home = React.createClass({
    render: function() {
        return (
            <div className="home">
                <div className="home__header">
                  Hello Phil. I've been expecting you...
                </div>
                  <Link to="/aboutme" className="home__continue-btn" activeClassName="">Click to Continue</Link>
            </div>
        )
    }
});

module.exports = Home;
