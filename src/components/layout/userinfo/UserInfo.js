import React, { Component } from "react";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import Logout from "../Logout";
import "./UserInfo.css";
import IconCounter from "../../icon_counter/IconCounter";
import PackageIcon from "../../../img/box-solid.svg";

export default class UserInfo extends Component {
  static contextType = ApplicationContext;

  componentDidMount() {}

  render() {
    const { logged_in, username } = this.context;

    return (
      <div className="user-info">
        <span>{logged_in ? username : "Not logged in"}</span>
        <Logout />
        <div class="counters">
          <IconCounter icon={PackageIcon} counter={2} />
        </div>
      </div>
    );
  }
}
