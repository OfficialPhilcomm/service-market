import React, { Component } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import "./Popup.css";
import CloseablePopup from "./CloseablePopup";

export default class AuthPopup extends Component {
  static contextType = ApplicationContext;

  state = {
    loginOpen: true,
  };

  switchLoginOpen = () => {
    this.setState({ loginOpen: !this.state.loginOpen });
  };

  render() {
    return (
      <CloseablePopup>
        <div className="content">
          <button onClick={this.switchLoginOpen}>
            {this.state.loginOpen ? (
              <React.Fragment>
                You don't have an account? Create one here
              </React.Fragment>
            ) : (
              <React.Fragment>Back to login</React.Fragment>
            )}
          </button>
        </div>
        <div className="buttons">
          <button>Button One</button>
          <button>Button Two</button>
        </div>
      </CloseablePopup>
    );
  }
}
