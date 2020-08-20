import React, { Component } from "react";
import "./MyOrders.css";

export default class MyOrders extends Component {
  render() {
    return (
      <div className="own-requests">
        <div className="title">
          <span>This is the title</span>
          <button className="add">add</button>
        </div>
        <div className="my-orders-container"></div>
      </div>
    );
  }
}
