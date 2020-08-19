import React, { Component } from "react";
import axios from "axios";
import OrderBox from "../order/OrderBox";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";

export default class AllOrders extends Component {
  static contextType = AuthenticationContext;

  state = {
    orderList: null,
  };

  async componentDidMount() {
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

    if (result.success) {
      console.log(response.data);
      this.setState({
        logged_in: true,
        auth_token: result.auth_token,
        username: result.username,
      });
    }
  }

  render() {
    const { logged_in } = this.context;

    return (
      <div className="all-requests">
        {logged_in ? (
          <React.Fragment>
            {this.state.orderList ? (
              <React.Fragment>
                {this.state.orderList.map((order) => (
                  <OrderBox />
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
