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
    loginError: null,
    registerError: null,
  };

  componentDidMount() {
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);

    this.loginUsername.focus();
  }

  switchLoginOpen = () => {
    this.setState({ loginOpen: !this.state.loginOpen });
  };

  handleLoginSubmit = async (event) => {
    event.preventDefault();

    const un = this.loginUsername.value;
    const pw = this.loginPassword.value;

    const result = await BackendAPI.login(un, pw);

    if (result.success) {
      this.context.login(result.auth_token, result.username);
    } else {
      this.setState({ loginError: result.error });
    }
  };

  handleRegisterSubmit = async (event) => {
    event.preventDefault();

    const un = this.registerUsername.value;
    const pw = this.registerPassword.value;

    const result = await BackendAPI.register(un, pw);

    if (result.success) {
      this.setState({ loginOpen: true, registerError: null });
    } else {
      this.setState({ registerError: result.error });
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
                        type="password"
                        name="password"
                        ref={(input) => (this.loginPassword = input)}
                      />
                    </td>
                  </tr>
                  {this.state.loginError ? (
                    <tr>
                      <td className="auth-error" colSpan={2}>
                        {this.state.loginError}
                      </td>
                    </tr>
                  ) : null}
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
                    <td>Username</td>
                    <td>
                      <input
                        className="validation"
                        type="text"
                        name="username"
                        minLength={4}
                        required
                        placeholder="min 4 characters"
                        ref={(input) => (this.registerUsername = input)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Password</td>
                    <td>
                      <input
                        className="validation"
                        type="password"
                        name="password"
                        minLength={8}
                        required
                        placeholder="min 8 characters"
                        ref={(input) => (this.registerPassword = input)}
                      />
                    </td>
                  </tr>
                  {this.state.registerError ? (
                    <tr>
                      <td className="auth-error" colSpan={2}>
                        {this.state.registerError}
                      </td>
                    </tr>
                  ) : null}
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
