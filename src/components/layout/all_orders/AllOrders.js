import React, { Component } from "react";
import axios from "axios";
import OrderBox from "../order/OrderBox";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";

export default class AllOrders extends Component {
  static contextType = AuthenticationContext;

  state = {
    orderList: [],
  };

  requestAllOrders = async () => {
    console.log(this.context.auth_token);
    const response = await axios({
      method: "post",
      url: "https://philcomm.dev/servicemarket/api/all_orders.php",
      data: {},
      headers: {
        "Content-Type": "application/json",
        "Api-Token": "486ce77a-e1f9-11ea-af0d-001a4a150180",
        "Auth-Token": this.context.auth_token,
      },
    });

    const result = response.data;

    console.log(result);

    this.setState({ orderList: result.orders });
  };

  render() {
    const { logged_in } = this.context;

    //const allOrders = this.requestAllOrders();

    return (
      <div className="all-requests">
        <button onClick={this.requestAllOrders}>Refresh</button>
        {logged_in ? (
          <React.Fragment>
            {this.state.orderList && this.state.orderList.length > 0 ? (
              <React.Fragment>
                {this.state.orderList.map((order) => (
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
      </div>
    );
  }
}
