var React = require("react");
var {Link, IndexLink} = require("react-router");

var Navigation = () => {
    return (
        <div>
            <div>
                Fun League App    
            </div>
            <div>
                <IndexLink to="/" activeClassName="active-link">Home</IndexLink>
            </div>  
            <div>
                <Link to="/urfcooldown" activeClassName="active-link">URF Cooldowns</Link>
            </div>  
        </div>
    )
};

module.exports = Navigation;
