import React, { Component } from "react";

import AllOrders from "../all_orders/AllOrders";
import UserInfo from "../userinfo/UserInfo";
import MyOrders from "../my_orders/MyOrders";

import "./Main.css";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import AuthPopup from "../../popups/auth_popup/AuthPopup";
import MoreInformation from "../more_information/MoreInformation";

export default class Main extends Component {
  static contextType = ApplicationContext;

  componentDidMount() {
    this.context.check_auth_token_validity();
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
        <MoreInformation orderID={this.context.more_information_order_id} />
        <UserInfo />
        <MyOrders />
      </main>
    );
  }
}
