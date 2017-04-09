var React = require("react");
var {Link, IndexLink} = require("react-router");

var Navigation = () => {
    return (
        <div>
            <div>
                Fiji Logo
            </div>
            <ul>
                <li>
                    <IndexLink to="/" activeClassName="">Home</IndexLink>
                </li>
                <li>
                    <Link to="/aboutme" activeClassName="">About Me</Link>
                </li>
                <li>
                    <Link to="/store" activeClassName="">Store</Link>
                </li>
            </ul>  
        </div>
    )
};

module.exports = Navigation;
