import React, { Component } from "react";
import axios from "axios";
import OrderBox from "../order/OrderBox";
import LoginContext from "../../../contexts/LoginContext";

export default class AllRequests extends Component {
  state = {
    orderList: null,
  };

  render() {
    return (
      <div className="all-requests">
        {this.state.orderList ? (
          <React.Fragment>
            {this.state.orderList.map((order) => (
              <OrderBox />
            ))}
          </React.Fragment>
        ) : (
          <div>Please log in to see orders</div>
        )}
      </div>
    );
  }
}
