import React, { Component } from "react";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import "../Popup.css";
import "./AuthPopup.css";
import Popup from "../Popup";
import BackendAPI from "../../../api/BackendAPI";

export default class AuthPopup extends Component {
  static contextType = ApplicationContext;

  state = {
    loginOpen: true,
    registerFormValid: false,
  };

  componentDidMount() {
    this.loginUsername.focus();
  }

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

  register = () => {
    const email = this.registerEmail.value;
    const un = this.registerUsername.value;
    const pw = this.registerPassword.value;
    const rpw = this.registerRepeatPassword.value;

    if (un === "") {
      this.setState({ registerError: "Fill in a username" });
    } else if (pw === "") {
      this.setState({ registerError: "Fill in a password" });
    } else if (pw !== rpw) {
      this.setState({ registerError: "Passwords dont match" });
    } else {
      this.setState({ registerError: null, loginOpen: true });
      BackendAPI.register(email, un, pw);
    }
  };

  validateRegisterForm = () => {
    const stateValid = this.state.registerFormValid;

    let isValid = true;
    if (this.registerEmail.value === "") {
      isValid = false;
    }
    if (this.registerUsername.value === "") {
      isValid = false;
    }
    if (this.registerPassword.value.length < 8) {
      isValid = false;
    }
    if (isValid !== stateValid) this.setState({ registerFormValid: isValid });
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
            <table>
              <tbody>
                <tr>
                  <td>E-Mail</td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      onChange={this.validateRegisterForm}
                      ref={(input) => (this.registerEmail = input)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>
                    <input
                      type="text"
                      name="username"
                      onChange={this.validateRegisterForm}
                      ref={(input) => (this.registerUsername = input)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td>
                    <input
                      type="password"
                      name="password"
                      onChange={this.validateRegisterForm}
                      ref={(input) => (this.registerPassword = input)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Repeat Password</td>
                  <td>
                    <input
                      type="password"
                      name="repeat-password"
                      onChange={this.validateRegisterForm}
                      ref={(input) => (this.registerRepeatPassword = input)}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">{this.state.registerError}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <div className="buttons">
          {this.state.loginOpen ? (
            <button onClick={this.login}>Login</button>
          ) : (
            <button
              disabled={!this.state.registerFormValid}
              onClick={this.register}
            >
              Register
            </button>
          )}
        </div>
      </Popup>
    );
  }
}
