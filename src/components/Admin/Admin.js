import React, { Component } from 'react';
import './Admin.css';
import { Redirect } from 'react-router-dom';
import firebase from '../../FirebaseConfig';

class Admin extends Component {
  constructor() {
    super();

    this.state = {
      isSignOut: false,
      newsTitle: "",
      newsContent: "",
      newsThumbnail: "",
      productName: "",
      productPrice: "",
      productThumbnail: "",
      newsData: [],
      productData: [],
      order: []
    }
  }

  signOut = () => {
    localStorage.removeItem("users")
    this.setState({
      isSignOut: !this.state.isSignOut
    });
  }

  componentDidMount() {
    // Get data from news collection
    const database = firebase.firestore();
    database.collection("news").onSnapshot(snapshot => {
      const newsData = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          title: doc.data().title
        }
      })
      this.setState({ newsData });
    })

    // Get data from product collection
    database.collection("products").onSnapshot(snapshot => {
      const productData = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          name: doc.data().name,
          price: doc.data().price
        }
      })
      this.setState({ productData });
    })

    // Get data from order collection
    database.collection("order").onSnapshot(snapshot => {
      const order = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          name: doc.data().name,
          phone: doc.data().phone,
          address: doc.data().address,
          product: doc.data().product,
          amount: doc.data().amount,
          total: doc.data().total
        }
      })
      this.setState({ order });
    })
  }

  // Upload News
  onNewsUpload = (event) => {
    event.preventDefault();

    const { newsTitle, newsContent, newsThumbnail } = this.state;
    const database = firebase.firestore();
    database.collection("news").add({
      title: newsTitle,
      content: newsContent,
      thumbnail: newsThumbnail
    })
    this.setState({
      newsTitle: "",
      newsContent: "",
      newsThumbnail: ""
    })
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Delete News
  onDeleteNews = (id) => {
    return () => {
      const database = firebase.firestore();
      database.collection("news").doc(id).delete();
    }
  }

  // Delete Order
  onDeleteOrder = (id) => {
    return () => {
      const database = firebase.firestore();
      database.collection("order").doc(id).delete();
    }
  }

  render() {
    const loggedInUser = localStorage.getItem("users");
    if (loggedInUser === null) {
      return (
        <Redirect to="/admin" />
      )
    }
    return (
      <div className="Admin">
        <div className="manage-order" id="order">
          <table>
            <thead>
              <tr>
                <td>STT</td>
                <td>Tên khách hàng</td>
                <td>Số điện thoại</td>
                <td>Địa chỉ</td>
                <td>Tên sản phẩm</td>
                <td>Số lượng</td>
                <td>Thành tiền</td>
                <td>Xóa</td>
              </tr>
            </thead>
            <tbody>
              {
                this.state.order.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{order.name}</td>
                      <td>{order.phone}</td>
                      <td>{order.address}</td>
                      <td>{order.product}</td>
                      <td>{order.amount}</td>
                      <td>{order.total}</td>
                      <td>
                        <button onClick={this.onDeleteOrder(order.id)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>


        <div className="add-product" id="addProduct">

          <form onSubmit={this.onNewsUpload}>
            <h1>Thêm sản phẩm</h1>
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={this.state.newsTitle}
              onChange={this.onChange}
            />

            <input
              type="text"
              name="productThumbnail"
              placeholder="Product Thumbnail Link"
              value={this.state.newsThumbnail}
              onChange={this.onChange}
            />

            <input
              type="text"
              name="productPrice"
              placeholder="Product Price"
              value={this.state.newsThumbnail}
              onChange={this.onChange}
            />
            <button type="submit">Đăng</button>
          </form>
        </div>

        <div className="manage-product" id="manageProduct">
          <table>
            <thead>
              <tr>
                <td>STT</td>
                <td>Tên sản phẩm</td>
                <td>Giá</td>
                <td>Xóa</td>
              </tr>
            </thead>
            <tbody>
              {
                this.state.productData.map((productData, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{productData.name}</td>
                      <td>{productData.price}</td>
                      <td><button onClick={this.onDeleteNews(productData.id)}><i className="fas fa-trash-alt"></i></button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        <div className="add-news" id="addNews">

          <form onSubmit={this.onNewsUpload}>
            <h1>Thêm tin tức</h1>
            <input
              type="text"
              name="newsTitle"
              placeholder="News Title"
              value={this.state.newsTitle}
              onChange={this.onChange}
            />

            <input
              type="text"
              name="newsThumbnail"
              placeholder="News Thumbnail Link"
              value={this.state.newsThumbnail}
              onChange={this.onChange}
            />

            <textarea
              type="text"
              name="newsContent"
              placeholder="News Content"
              value={this.state.newsContent}
              onChange={this.onChange}>
            </textarea>
            <button type="submit">Đăng</button>
          </form>
        </div>

        <div className="manage-news" id="manageNews">
          <table>
            <thead>
              <tr>
                <td>STT</td>
                <td>Tiêu đề</td>
                <td>Xóa</td>
              </tr>
            </thead>
            <tbody>
              {
                this.state.newsData.map((newsData, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{newsData.title}</td>
                      <td><button onClick={this.onDeleteNews(newsData.id)}><i className="fas fa-trash-alt"></i></button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        <div className="menu">
          <ul>
            <li><a href="#order">Khách đặt hàng</a></li>
            <li><a href="#addProduct">Thêm sản phẩm</a></li>
            <li><a href="#manageProduct">Quản lý sản phẩm</a></li>
            <li><a href="#addNews">Thêm tin tức</a></li>
            <li><a href="#manageNews">Quản lý tin tức</a></li>
          </ul>
        </div>

        <button className="sign-out-button" onClick={this.signOut}>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    );
  }
}

export default Admin;