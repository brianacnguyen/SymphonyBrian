var React = require("react");
var ReactDOM = require("react-dom");
var {Route, Router, IndexRoute, hashHistory} = require("react-router");
var Main = require("Main");
var Home = require("Home");
var Store = require("Store");
var ApiDemo = require("ApiDemo");

// App css
require("style!css!sass!applicationStyles");

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}> 
            <Route path="/store" component={Store}/>
            <Route path="/apidemo" component={ApiDemo}/>
            <IndexRoute component={Home}/>
        </Route>         
    </Router>,
     document.getElementById("app")
);
