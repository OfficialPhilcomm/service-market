import React, { Component, createContext } from "react";
import BackendAPI from "../api/BackendAPI";

export const ApplicationContext = createContext();

class ApplicationContextProvider extends Component {
  state = {
    logged_in: false,
    username: null,
    auth_token: null,
    my_oders: [],
    accepted_orders: [],
    all_orders: [],
    more_information_order_id: null,
  };

  login = async (u, p) => {
    const result = await BackendAPI.login(u, p);

    if (result.success) {
      this.setState({
        logged_in: true,
        auth_token: result.auth_token,
        username: result.username,
      });
    }

    this.request_all_orders();
    this.request_my_orders();
    this.request_accepted_orders();
  };

  logout = async () => {
    this.setState({
      logged_in: false,
      username: null,
      auth_token: null,
      my_orders: [],
      all_orders: [],
    });
  };

  request_all_orders = async () => {
    const result = await BackendAPI.requestAllOrders(this.state.auth_token);

    this.setState({ all_orders: result.orders });
  };

  request_my_orders = async () => {
    const result = await BackendAPI.requestMyOrders(this.state.auth_token);

    this.setState({ my_orders: result.orders });
  };
  request_accepted_orders = async () => {
    const result = await BackendAPI.requestAcceptedOrders(
      this.state.auth_token
    );

    this.setState({ accepted_orders: result.orders });
  };

  show_advanced_information = (order_id) => {
    this.setState({ more_information_order_id: order_id });
  };

  render() {
    return (
      <ApplicationContext.Provider
        value={{
          ...this.state,
          login: this.login,
          logout: this.logout,
          request_my_orders: this.request_my_orders,
          request_accepted_orders: this.request_accepted_orders,
          request_all_orders: this.request_all_orders,
          show_advanced_information: this.show_advanced_information,
        }}
      >
        {this.props.children}
      </ApplicationContext.Provider>
    );
  }
}

export default ApplicationContextProvider;
