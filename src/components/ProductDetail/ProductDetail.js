import React, { Component } from 'react';
import './ProductDetail.css';
import firebase from './../../FirebaseConfig';

class ProductDetail extends Component {
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
    const paramsID = this.props.match.params.id;
    return (
      <div className="ProductDetail">
        {
          this.state.products.map((product, index) => {
            if (paramsID === product.id) {
              return (
                <div key={index}>
                  <h1>ProductDetail Component</h1>
                </div>
              )
            }
          })
        }
      </div>
    )
  }
}

export default ProductDetail;