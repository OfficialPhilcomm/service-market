import React, { Component } from "react";
import LoginContext from "../../../contexts/LoginContext";

export default class UserInfo extends Component {
  render() {
    return (
      <LoginContext.Consumer>
        {(data) => (
          <div className="user-info">
            <span>{data.logged_in ? data.username : "Not logged in"}</span>
          </div>
        )}
      </LoginContext.Consumer>
    );
  }
}
