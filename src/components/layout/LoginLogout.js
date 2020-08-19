import React, { Component } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";

export default class LoginLogout extends Component {
  static contextType = AuthenticationContext;

  render() {
    const { logged_in, login, logout } = this.context;
    return (
      <div>
        {logged_in ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={() => login()}>Login</button>
        )}
      </div>
    );
  }
}
