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
        "Api-Token": process.env.REACT_APP_API_KEY,
      },
    });

    return response.data;
  }

  static async authTokenValid(auth_token) {
    const response = await axios({
      method: "post",
      url: this.BASE_URL + "auth/auth_token_valid.php",
      data: {
        auth_token: auth_token,
      },
      headers: {
        "Content-Type": "application/json",
        "Api-Token": process.env.REACT_APP_API_KEY,
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
        "Api-Token": process.env.REACT_APP_API_KEY,
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
        "Api-Token": process.env.REACT_APP_API_KEY,
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
        "Api-Token": process.env.REACT_APP_API_KEY,
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
        "Api-Token": process.env.REACT_APP_API_KEY,
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
        "Api-Token": process.env.REACT_APP_API_KEY,
        "Auth-Token": auth_token,
      },
    });

    return response.data;
  }

  static async createOrder(auth_token, order_data) {
    await axios({
      method: "post",
      url: this.BASE_URL + "orders/new_order.php",
      data: {
        ...order_data,
      },
      headers: {
        "Content-Type": "application/json",
        "Api-Token": process.env.REACT_APP_API_KEY,
        "Auth-Token": auth_token,
      },
    });
  }

  static async changeState(auth_token, order_id, state) {
    axios({
      method: "post",
      url: this.BASE_URL + "orders/update_state.php",
      data: {
        user_order_id: order_id,
        state: state,
      },
      headers: {
        "Content-Type": "application/json",
        "Api-Token": process.env.REACT_APP_API_KEY,
        "Auth-Token": auth_token,
      },
    });
  }

  static async makeOffer(auth_token, order_id, price) {
    await axios({
      method: "post",
      url: this.BASE_URL + "offers/new_offer.php",
      data: {
        user_order_id: order_id,
        price: price,
      },
      headers: {
        "Content-Type": "application/json",
        "Api-Token": process.env.REACT_APP_API_KEY,
        "Auth-Token": auth_token,
      },
    });
  }

  static async acceptOffer(auth_token, order_id, offer_id) {
    await axios({
      method: "post",
      url: this.BASE_URL + "offers/accept_offer.php",
      data: {
        user_order_id: order_id,
        offer_id: offer_id,
      },
      headers: {
        "Content-Type": "application/json",
        "Api-Token": process.env.REACT_APP_API_KEY,
        "Auth-Token": auth_token,
      },
    });
  }

  static async finishOrder(auth_token, order_id) {
    await axios({
      method: "post",
      url: this.BASE_URL + "orders/finish_order.php",
      data: {
        user_order_id: order_id,
      },
      headers: {
        "Content-Type": "application/json",
        "Api-Token": process.env.REACT_APP_API_KEY,
        "Auth-Token": auth_token,
      },
    });
  }

  static async closeOrder(auth_token, order_id) {
    await axios({
      method: "post",
      url: this.BASE_URL + "orders/close_order.php",
      data: {
        user_order_id: order_id,
      },
      headers: {
        "Content-Type": "application/json",
        "Api-Token": process.env.REACT_APP_API_KEY,
        "Auth-Token": auth_token,
      },
    });
  }
}
