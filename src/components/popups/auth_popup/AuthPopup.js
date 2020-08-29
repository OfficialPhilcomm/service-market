import React, { Component } from "react";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import "../Popup.css";
import "./AuthPopup.css";
import Popup from "../Popup";

export default class AuthPopup extends Component {
  static contextType = ApplicationContext;

  state = {
    loginOpen: true,
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.login();
    }
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
      <Popup>
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
            <table>
              <tbody>
                <tr>
                  <td>Username</td>
                  <td>
                    <input
                      type="text"
                      name="username"
                      onKeyPress={this.handleKeyPress}
                      ref={(input) => (this.loginUsername = input)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td>
                    <input
                      type="text"
                      name="password"
                      onKeyPress={this.handleKeyPress}
                      ref={(input) => (this.loginPassword = input)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
      </Popup>
    );
  }
}
