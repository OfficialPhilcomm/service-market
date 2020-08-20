import React, { Component } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";

export default class LoginLogout extends Component {
  static contextType = ApplicationContext;

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
