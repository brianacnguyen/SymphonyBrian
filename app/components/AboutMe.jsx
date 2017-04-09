var React = require("react");
var {Link} = require("react-router");

var AboutMe = React.createClass({
    render: function() {
        return (
            <div className="home">
                  <div className="home__header">
                  About Me: I'm Awesome!
                </div>
                  <Link to="/store" className="home__continue-btn" activeClassName="">Click to Continue</Link>
            </div>
        )
    }
});

module.exports = AboutMe;
