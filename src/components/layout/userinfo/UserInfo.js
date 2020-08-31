import React, { Component } from "react";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import Logout from "../Logout";
import "./UserInfo.css";
import IconCounter from "../../icon_counter/IconCounter";
import PackageIcon from "../../../img/box-solid.svg";
import EggIcon from "../../../img/egg-solid.svg";
import BellIcon from "../../../img/bell-solid.svg";

export default class UserInfo extends Component {
  static contextType = ApplicationContext;

  componentDidMount() {}

  render() {
    const { logged_in, username } = this.context;

    return (
      <div className="user-info">
        <div className="login-text">
          {logged_in ? `You are logged in as: ${username}` : "Not logged in"}
        </div>
        <Logout />
        {logged_in ? (
          <div className="counters">
            <IconCounter icon={PackageIcon} counter={2} />
            <IconCounter icon={EggIcon} counter={2} />
            {/* <IconCounter icon={BellIcon} counter={2} /> */}
          </div>
        ) : null}
      </div>
    );
  }
}
