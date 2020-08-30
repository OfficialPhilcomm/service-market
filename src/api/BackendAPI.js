import axios from "axios";

export default class BackendAPI {
  static BASE_URL = "https://philcomm.dev/servicemarket/api/";

  static async login(un, pw) {
    const response = await axios({
      method: "post",
      url: this.BASE_URL + "auth/login.php",
      data: {
        user: un,
        pass: pw,
      },
      headers: {
        "Content-Type": "application/json",
        "Api-Token": "486ce77a-e1f9-11ea-af0d-001a4a150180",
      },
    });

    return response.data;
  }

  static async requestMyOrders(auth_token) {
    const response = await axios({
      method: "post",
      url: this.BASE_URL + "orders/my_orders.php",
      data: {},
      headers: {
        "Content-Type": "application/json",
        "Api-Token": "486ce77a-e1f9-11ea-af0d-001a4a150180",
        "Auth-Token": auth_token,
      },
    });

    return response.data;
  }

  static async requestAcceptedOrders(auth_token) {
    const response = await axios({
      method: "post",
      url: this.BASE_URL + "orders/accepted_orders.php",
      data: {},
      headers: {
        "Content-Type": "application/json",
        "Api-Token": "486ce77a-e1f9-11ea-af0d-001a4a150180",
        "Auth-Token": auth_token,
      },
    });

    return response.data;
  }

  static async requestAllOrders(auth_token) {
    const response = await axios({
      method: "post",
      url: this.BASE_URL + "orders/all_orders.php",
      data: {},
      headers: {
        "Content-Type": "application/json",
        "Api-Token": "486ce77a-e1f9-11ea-af0d-001a4a150180",
        "Auth-Token": auth_token,
      },
    });

    return response.data;
  }

  static async requestOffers(auth_token, order_id) {
    const response = await axios({
      method: "post",
      url: this.BASE_URL + "offers/all_offers.php",
      data: {
        user_order_id: order_id,
      },
      headers: {
        "Content-Type": "application/json",
        "Api-Token": "486ce77a-e1f9-11ea-af0d-001a4a150180",
        "Auth-Token": auth_token,
      },
    });

    return response.data;
  }

  static async requestOrderInfo(auth_token, order_id) {
    const response = await axios({
      method: "post",
      url: this.BASE_URL + "orders/info.php",
      data: {
        user_order_id: order_id,
      },
      headers: {
        "Content-Type": "application/json",
        "Api-Token": "486ce77a-e1f9-11ea-af0d-001a4a150180",
        "Auth-Token": auth_token,
      },
    });

    return response.data;
  }
}

export class OrderStates {
  static states = ["accepted", "starting", "breeding", "leveling", "finishing"];

  static stateToString(state) {
    return this.states[state];
  }
}
