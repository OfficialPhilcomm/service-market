import React, { Component } from "react";
import "./MyOrders.css";
import OrderBox from "../order/OrderBox";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import CreateOrderPopup from "../../popups/create_order_popup/CreateOrderPopup";

export default class MyOrders extends Component {
  static contextType = ApplicationContext;

  state = {
    createPopupOpen: false,
  };

  openCreatePopup = () => {
    this.setState({ createPopupOpen: true });
  };
  closeCreatePopup = () => {
    console.log("try to close");
    this.setState({ createPopupOpen: false });
  };

  render() {
    const { logged_in, my_orders } = this.context;

    return (
      <div className="own-requests">
        {this.state.createPopupOpen ? (
          <CreateOrderPopup closeCallback={this.closeCreatePopup} />
        ) : (
          <React.Fragment />
        )}
        <div className="title">
          <span>This is the title</span>
          <button className="add" onClick={this.openCreatePopup}>
            add
          </button>
        </div>
        <div className="my-orders-container">
          {logged_in ? (
            <React.Fragment>
              {my_orders && my_orders.length > 0 ? (
                <React.Fragment>
                  {my_orders.map((order) => (
                    <OrderBox order={order} />
                  ))}
                </React.Fragment>
              ) : (
                <div>No orders found</div>
              )}
            </React.Fragment>
          ) : (
            <span>Log in to see your own orders</span>
          )}
        </div>
      </div>
    );
  }
}
