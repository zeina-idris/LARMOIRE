import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import App from './app'
import Register from './register'
import Welcome from './welcome'
import Login from './login'
import SingleProductView from './SingleProductView'
import UploadProduct from './uploadProduct'
import ProductList from './productList'
import Home from './home'
import Inbox from './inbox'

const notLoggedIn = (
    <Router history={hashHistory}>
    <Route path="/" component={Welcome}>
        <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <IndexRoute component={Home} />
        </Route>
    </Router>
)

const loggedIn = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={ProductList} />
            <Route path='/products/:id' component={SingleProductView} />
            <Route path='/uploadProduct' component={UploadProduct} />
            <Route path='/inbox' component={Inbox} />
        </Route>
    </Router>
)

let router = location.pathname === '/welcome' ? notLoggedIn : loggedIn;


ReactDOM.render(
  router,
  document.getElementById('main')
);
