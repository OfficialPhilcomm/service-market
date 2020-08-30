import React, { Component } from "react";
import "./AllOrders.css";
import OrderBox from "../order/OrderBox";
import { ApplicationContext } from "../../../contexts/ApplicationContext";

export default class AllOrders extends Component {
  static contextType = ApplicationContext;

  render() {
    const { logged_in, all_orders } = this.context;
    const { request_all_orders } = this.context;

    return (
      <div className="all-requests">
        <div className="title">
          <button onClick={request_all_orders}>Refresh</button>
        </div>
        <div className="all-orders-container">
          {logged_in ? (
            <React.Fragment>
              {all_orders && all_orders.length > 0 ? (
                <React.Fragment>
                  {all_orders.map((order) => (
                    <OrderBox key={order.id} order={order} />
                  ))}
                </React.Fragment>
              ) : (
                <div>No orders found</div>
              )}
            </React.Fragment>
          ) : (
            <span>Log in to see orders</span>
          )}
        </div>
      </div>
    );
  }
}
