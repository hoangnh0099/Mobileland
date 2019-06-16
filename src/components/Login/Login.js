import React, { Component } from 'react';
import './Login.css';
import firebase from '../../FirebaseConfig';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    }
  }

  onLogin = (event) => {
    event.preventDefault();
    const database = firebase.firestore();
    database.collection("users").onSnapshot(snapshot => {
      const users = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          username: doc.data().username,
          password: doc.data().password
        }
      })
      const { username, password } = this.state;
      if (username === users[0].username && password === users[0].password) {
        localStorage.setItem("users", JSON.stringify({
          username: username,
          password: password
        }));
        this.setState({ 
          username: "", 
          password: "" 
        });
      } else {
        alert("Sai tài khoản hoặc mật khẩu");
      }
    })
    
  }

  onChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    this.setState({
      [inputName]: inputValue
    })
  }

  render() {
    const loggedInUser = localStorage.getItem("users");
    if (loggedInUser !== null) {
      return (
        <Redirect to="/admin/administrator" />
      )
    }
    return (
      <div className="Login">
        <form onSubmit={this.onLogin}>
          <h1>Đăng nhập</h1>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            required />
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    );
  }
}

export default Login;