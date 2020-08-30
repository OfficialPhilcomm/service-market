import React, { Component } from "react";
import BackendAPI from "../../../api/BackendAPI";
import { ApplicationContext } from "../../../contexts/ApplicationContext";

export default class MoreInformation extends Component {
  static contextType = ApplicationContext;

  state = {
    order: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.orderID !== this.props.orderID) {
      const result = await BackendAPI.requestOrderInfo(
        this.context.auth_token,
        this.props.orderID
      );

      console.log(result.order);

      this.setState({ order: result.order });
    }
  }

  render() {
    const order = this.state.order;

    return (
      <div className="more-information">
        {order ? (
          <React.Fragment>
            {order.is_my_order ? (
              <React.Fragment>
                {order.state != null ? (
                  <div>Order is accepted by: {order.breeder}</div>
                ) : (
                  <div>Order is not accepted yet</div>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment />
            )}
          </React.Fragment>
        ) : (
          <div>
            Click on Show Information to get advanced information about an order
          </div>
        )}
      </div>
    );
  }
}
