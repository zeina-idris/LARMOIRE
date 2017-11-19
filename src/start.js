import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import App from './app'
import Register from './register'
import Welcome from './welcome'
import Login from './login'

const notLoggedIn = (
    <Router history={hashHistory}>
    <Route path="/" component={Welcome}>
        <Route path="/login" component={Login} />
            <IndexRoute component={Register} />
        </Route>
    </Router>
)

const loggedIn = (
    <Router history={browserHistory} >
        <Route path="/" component={App} />
    </Router>
)

let router = location.pathname === '/welcome' ? notLoggedIn : loggedIn;


ReactDOM.render(
  router,
  document.getElementById('main')
);
