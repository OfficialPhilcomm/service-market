import React, { Component } from "react";

import AllOrders from "../all_orders/AllOrders";
import UserInfo from "../userinfo/UserInfo";
import MyOrders from "../my_orders/MyOrders";

import "./Main.css";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import AuthPopup from "../../popups/auth_popup/AuthPopup";

export default class Main extends Component {
  static contextType = ApplicationContext;

  componentDidMount() {
    this.context.login("Philcomm", "");
  }

  render() {
    return (
      <main>
        {!this.context.logged_in ? (
          <AuthPopup />
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <AllOrders />
        <div className="more-information">more-information</div>
        <UserInfo />
        <MyOrders />
      </main>
    );
  }
}
