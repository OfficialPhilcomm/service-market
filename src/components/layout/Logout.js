import React, { Component } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";

export default class Logout extends Component {
  static contextType = ApplicationContext;

  render() {
    const { logged_in, logout } = this.context;
    return (
      <div>{logged_in ? <button onClick={logout}>Logout</button> : null}</div>
    );
  }
}
