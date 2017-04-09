var React = require("react");
var {Link, IndexLink} = require("react-router");

var Navigation = () => {
    return (
        <div className="navigation__container">
            <ul className="navigation__links-list">
                <li>
                    <IndexLink to="/" className="navigation__link" activeClassName="">Home</IndexLink>
                </li>
                <li>
                    <Link to="/aboutme" className="navigation__link" activeClassName="">About Me</Link>
                </li>
                <li>
                    <Link to="/store" className="navigation__link" activeClassName="">Store</Link>
                </li>
            </ul>  
        </div>
    )
};

module.exports = Navigation;
