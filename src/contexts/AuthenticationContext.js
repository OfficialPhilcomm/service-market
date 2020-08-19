import React, { useState, Component, createContext } from "react";
import axios from "axios";

export const AuthenticationContext = createContext();

class AuthenticationContextProvider extends Component {
  state = {
    logged_in: false,
    username: null,
    auth_token: null,
  };

  login = async (u, p) => {
    const response = await axios({
      method: "post",
      url: "https://philcomm.dev/servicemarket/api/login.php",
      data: {
        user: "Philcomm",
        pass: "",
      },
      headers: { "Content-Type": "application/json" },
    });

    const result = response.data;

    if (result.success) {
      console.log(response.data);
      this.setState({
        logged_in: true,
        auth_token: result.auth_token,
        username: result.username,
      });
    }
  };

  logout = async () => {
    this.setState({ logged_in: false, username: null, auth_token: null });
  };

  render() {
    return (
      <AuthenticationContext.Provider
        value={{ ...this.state, login: this.login, logout: this.logout }}
      >
        {this.props.children}
      </AuthenticationContext.Provider>
    );
  }
}

export default AuthenticationContextProvider;
