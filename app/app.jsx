var React = require("react");
var ReactDOM = require("react-dom");
var {Route, Router, IndexRoute, hashHistory} = require("react-router");
var Main = require("Main");
var Home = require("Home");
var AboutMe = require("AboutMe");
var Store = require("Store");

// App css
require("style!css!sass!applicationStyles");

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}> 
            <Route path="/aboutme" component={AboutMe}/>
            <Route path="/store" component={Store}/>
            <IndexRoute component={Home}/>
        </Route>         
    </Router>,
     document.getElementById("app")
);
