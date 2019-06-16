import React, { Component } from 'react';
import './Home.css';
import firebase from './../../FirebaseConfig';
import Slider from "react-slick";


class Home extends Component {
  constructor() {
    super();
    this.state = {
      backgroundVideo: "",
      products: []
    }
  }

  componentDidMount() {
    // Get backgroundVideo
    const database = firebase.firestore();
    database.collection("background").onSnapshot(snapshot => {
      const backgroundVideo = snapshot.docs.map(doc => {
        return doc.data().video;
      })
      this.setState({ backgroundVideo });
    })

    // Get products
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
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };
    return (
      <div className="Home">
        <h1>Home</h1>

        <div className="banner">
          <video src={this.state.backgroundVideo} autoPlay loop muted></video>

          <div className="banner-content">
            <h1>Welcome to Mobileland</h1>
            <h3>Cheapest but not worst</h3>
          </div>

        </div>

        <h1>Products</h1>
        <br />
        <br />
        <Slider {...settings}>
          {
            this.state.products.map((product, index) => {
              return (
                <div key={index} className="product">
                  <img src={product.thumbnail} alt="" />
                  <div className="product-title">
                    <p>{product.name}</p>
                  </div>
                  <div className="product-price">
                    <p>{product.price} đ</p>
                  </div>
                </div>
              )
            })
          }
        </Slider>
      </div>
    )
  }
}

export default Home;