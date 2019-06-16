import React, { Component } from 'react';
import './Navbar.css';
import { BrowserRouter, Route, NavLink, Switch, Link } from 'react-router-dom';

// Component
import Home from './../Home/Home';
import Products from './../Products/Products';
import ProductDetail from '../ProductDetail/ProductDetail';

class Navbar extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="Navbar">
          <div className="brand-logo">
            <Link to="/">Mobileland</Link>
          </div>

          <nav>
            <NavLink to="/" exact activeClassName="active">Home</NavLink>
            <NavLink to="/products/" exact activeClassName="active">Products</NavLink>
            <NavLink to="/news" exact activeClassName="active">News</NavLink>
            <NavLink to="/about" exact activeClassName="active">About</NavLink>
          </nav>
        </div>
        
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products" exact component={Products} />
          <Route path="/products/:id" exact component={ProductDetail} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Navbar;