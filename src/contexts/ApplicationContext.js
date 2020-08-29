import React, { Component, createContext } from "react";
import axios from "axios";
import BackendAPI from "../api/BackendAPI";

export const ApplicationContext = createContext();

class ApplicationContextProvider extends Component {
  state = {
    logged_in: false,
    username: null,
    auth_token: null,
    my_oders: [],
    all_orders: [],
  };

  login = async (u, p) => {
    const response = await axios({
      method: "post",
      url: "https://philcomm.dev/servicemarket/api/login.php",
      data: {
        user: "Philcomm",
        pass: "",
      },
      headers: {
        "Content-Type": "application/json",
        "Api-Token": "486ce77a-e1f9-11ea-af0d-001a4a150180",
      },
    });

    const result = response.data;

    if (result.success) {
      console.log(response.data);
      this.setState({
        logged_in: true,
        auth_token: result.auth_token,
        username: result.username,
      });
    }

    this.request_all_orders();
    this.request_my_orders();
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
    const response = await axios({
      method: "post",
      url: "https://philcomm.dev/servicemarket/api/all_orders.php",
      data: {},
      headers: {
        "Content-Type": "application/json",
        "Api-Token": "486ce77a-e1f9-11ea-af0d-001a4a150180",
        "Auth-Token": this.state.auth_token,
      },
    });

    const result = response.data;

    this.setState({ all_orders: result.orders });
  };

  request_my_orders = async () => {
    const result = await BackendAPI.requestMyOrders(this.state.auth_token);

    this.setState({ my_orders: result.orders });
  };

  render() {
    return (
      <ApplicationContext.Provider
        value={{
          ...this.state,
          login: this.login,
          logout: this.logout,
          request_my_orders: this.request_my_orders,
          request_all_orders: this.request_all_orders,
        }}
      >
        {this.props.children}
      </ApplicationContext.Provider>
    );
  }
}

export default ApplicationContextProvider;
