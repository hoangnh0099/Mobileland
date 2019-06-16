import React, { Component } from 'react';
// import './ProductDetailComponent.css';
import firebase from './../../FirebaseConfig';

class ProductDetailComponent extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      address: "",
      phone: ""
    }
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
      total: this.props.price,
      amount: "1",
      product: this.props.name
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
    const { name, thumbnail, price } = this.props;
    return (
      <div className="ProductDetailComponent">
        <h1>{name}</h1>

        <div className="detail">
          <img src={thumbnail} alt={name} />

          <div className="information">
            <p>Giá sản phẩm: {price}</p>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="Họ và tên"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                required />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                required />
              <input
                type="text"
                placeholder="Địa chỉ"
                name="address"
                value={this.state.address}
                onChange={this.onChange}
                required />
              <input
                type="text"
                placeholder="Số điện thoại"
                name="phone"
                value={this.state.phone}
                onChange={this.onChange}
                required />
              <button>Đặt mua sản phẩm</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetailComponent;