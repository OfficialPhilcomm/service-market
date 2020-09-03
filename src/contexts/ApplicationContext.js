import React, { Component, createContext } from "react";
import BackendAPI from "../api/BackendAPI";
import Cookies from "js-cookie";

export const ApplicationContext = createContext();

class ApplicationContextProvider extends Component {
  state = {
    logged_in: false,
    username: null,
    auth_token: null,
    my_orders: [],
    accepted_orders: [],
    all_orders: [],
    more_information_order_id: null,
  };

  login = (auth_token, username) => {
    Cookies.set("auth_token", auth_token, {
      expires: 1,
    });

    this.setState({
      logged_in: true,
      auth_token: auth_token,
      username: username,
    });

    this.request_all_orders();
    this.request_my_orders();
    this.request_accepted_orders();
  };

  check_auth_token_validity = async () => {
    const authToken = Cookies.get("auth_token");

    if (authToken) {
      const result = await BackendAPI.authTokenValid(authToken);

      if (result.token_valid) {
        this.setState({
          logged_in: true,
          auth_token: authToken,
          username: result.username,
        });

        this.request_all_orders();
        this.request_my_orders();
        this.request_accepted_orders();

        Cookies.set("auth_token", authToken, {
          expires: 1,
        });
      }
    }
  };

  logout = async () => {
    this.setState({
      logged_in: false,
      username: null,
      auth_token: null,
      my_orders: [],
      accepted_orders: [],
      all_orders: [],
      more_information_order_id: null,
    });

    Cookies.remove("auth_token");
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
          check_auth_token_validity: this.check_auth_token_validity,
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
