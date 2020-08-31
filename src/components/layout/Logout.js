import React, { Component } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";

export default class Logout extends Component {
  static contextType = ApplicationContext;

  render() {
    const { logged_in, logout } = this.context;
    return (
      <React.Fragment>
        {logged_in ? (
          <button className="logout rounded" onClick={logout}>
            Logout
          </button>
        ) : null}
      </React.Fragment>
    );
  }
}
