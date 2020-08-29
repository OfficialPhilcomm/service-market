import React, { Component } from "react";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import "../Popup.css";
import CloseablePopup from "../CloseablePopup";
import "./AuthPopup.css";

export default class AuthPopup extends Component {
  static contextType = ApplicationContext;

  state = {
    loginOpen: true,
  };

  switchLoginOpen = () => {
    this.setState({ loginOpen: !this.state.loginOpen });
  };

  login = () => {
    const un = this.loginUsername.value;
    const pw = this.loginPassword.value;

    this.context.login(un, pw);
  };

  render() {
    return (
      <CloseablePopup>
        <div className="content">
          <span
            className="auth-popup-register-switch"
            onClick={this.switchLoginOpen}
          >
            {this.state.loginOpen ? (
              <React.Fragment>
                You don't have an account? Create one here
              </React.Fragment>
            ) : (
              <React.Fragment>Back to login</React.Fragment>
            )}
          </span>
          {this.state.loginOpen ? (
            <React.Fragment>
              <input
                type="text"
                name="username"
                ref={(input) => (this.loginUsername = input)}
              />
              <input
                type="text"
                name="password"
                ref={(input) => (this.loginPassword = input)}
              />
            </React.Fragment>
          ) : (
            <div>Register open</div>
          )}
        </div>
        <div className="buttons">
          {this.state.loginOpen ? (
            <button onClick={this.login}>Login</button>
          ) : (
            <button>Register</button>
          )}
        </div>
      </CloseablePopup>
    );
  }
}
