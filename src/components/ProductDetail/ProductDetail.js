import React, { Component } from 'react';
import './ProductDetail.css';
import firebase from './../../FirebaseConfig';
import ProductDetailComponent from '../ProductDetailComponent/ProductDetailComponent';

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      name: "",
      email: "",
      address: "",
      phone: ""
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

  onSubmit = (event) => {
    event.preventDefault();
    alert("Đặt hàng thành công");
    const database = firebase.firestore();
    database.collection("order").add({
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      email: this.state.email,
      amount: "1",
    })
    this.setState({
      name: "",
      phone: "",
      address: "",
      email: ""
    })
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
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
                <ProductDetailComponent
                  key={index}
                  name={product.name}
                  thumbnail={product.thumbnail}
                  price={product.price}
                  />
              )
            }
          })
        }
      </div>
    )
  }
}

export default ProductDetail;