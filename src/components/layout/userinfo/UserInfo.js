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
    const { logged_in, username, my_orders, accepted_orders } = this.context;

    return (
      <div className="user-info">
        <div className="login-text">
          {logged_in ? `You are logged in as: ${username}` : "Not logged in"}
        </div>
        <Logout />
        {logged_in ? (
          <div className="counters">
            <IconCounter
              icon={PackageIcon}
              counter={my_orders ? my_orders.length : 0}
            />
            <IconCounter
              icon={EggIcon}
              counter={accepted_orders ? accepted_orders.length : 0}
            />
            {false ? <IconCounter icon={BellIcon} counter={2} /> : null}
          </div>
        ) : null}
      </div>
    );
  }
}
