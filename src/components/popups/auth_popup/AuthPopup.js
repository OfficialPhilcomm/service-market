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
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);

    this.loginUsername.focus();
  }

  switchLoginOpen = () => {
    this.setState({ loginOpen: !this.state.loginOpen });
  };

  handleLoginSubmit = (event) => {
    event.preventDefault();

    const un = this.loginUsername.value;
    const pw = this.loginPassword.value;

    this.context.login(un, pw);
  };

  handleRegisterSubmit = (event) => {
    event.preventDefault();

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
            <form onSubmit={this.handleLoginSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>Username</td>
                    <td>
                      <input
                        type="text"
                        name="username"
                        required
                        minLength={1}
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
                        ref={(input) => (this.loginPassword = input)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input type="submit" value="Login" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          ) : (
            <form onSubmit={this.handleRegisterSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>Email</td>
                    <td>
                      <input
                        type="email"
                        name="email"
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
                        ref={(input) => (this.registerPassword = input)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input type="submit" value="Register" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          )}
        </div>
      </Popup>
    );
  }
}
