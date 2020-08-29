import React, { Component } from "react";
import "./AllOrders.css";
import axios from "axios";
import OrderBox from "../order/OrderBox";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import AuthPopup from "../../popups/AuthPopup";

export default class AllOrders extends Component {
  static contextType = ApplicationContext;

  render() {
    const { logged_in, all_orders } = this.context;
    const { request_all_orders } = this.context;

    return (
      <div className="all-requests">
        <button onClick={request_all_orders}>Refresh</button>
        {logged_in ? (
          <React.Fragment>
            {all_orders && all_orders.length > 0 ? (
              <React.Fragment>
                {all_orders.map((order) => (
                  <OrderBox order={order} />
                ))}
              </React.Fragment>
            ) : (
              <div>No orders found</div>
            )}
          </React.Fragment>
        ) : (
          <span>Log in to see orders</span>
        )}
        <AuthPopup />
      </div>
    );
  }
}
