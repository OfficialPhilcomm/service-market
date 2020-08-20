import React, { Component } from "react";

import AllOrders from "../all_orders/AllOrders";
import UserInfo from "../userinfo/UserInfo";
import MyOrders from "../my_orders/MyOrders";

import "./Main.css";
import { ApplicationContext } from "../../../contexts/ApplicationContext";

export default class Main extends Component {
  static contextType = ApplicationContext;

  render() {
    return (
      <main>
        <AllOrders />
        <div className="more-information">more-information</div>
        <UserInfo />
        <MyOrders />
      </main>
    );
  }
}
