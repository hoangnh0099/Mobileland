import React, { Component } from 'react';
import './Products.css';
import firebase from './../../FirebaseConfig';
import { Link } from 'react-router-dom';

class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    // Get products
    const database = firebase.firestore();
    database.collection("products").onSnapshot(snapshot => {
      const products = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          name: doc.data().name,
          price: doc.data().price,
          thumbnail: doc.data().thumbnail,
          brand: doc.data().brand
        }
      })
      this.setState({ products });
    })
  }

  render() {
    return (
      <div className="Products">
        <h1>Products</h1>
        <div className="card-area">
          {
            this.state.products.map((product, index) => {
              return (
                <div className="card" key={index}>
                  <Link to={this.props.match.path + "/" + product.id}>
                    <img src={product.thumbnail} alt={product.name} />
                  </Link>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>{product.price}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Products;