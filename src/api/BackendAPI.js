import axios from "axios";

class BackendAPI {
  static async login(un, pw) {
    const response = await axios({
      method: "post",
      url: "https://philcomm.dev/servicemarket/api/login.php",
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
      url: "https://philcomm.dev/servicemarket/api/my_orders.php",
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
      url: "https://philcomm.dev/servicemarket/api/all_orders.php",
      data: {},
      headers: {
        "Content-Type": "application/json",
        "Api-Token": "486ce77a-e1f9-11ea-af0d-001a4a150180",
        "Auth-Token": auth_token,
      },
    });

    return response.data;
  }
}

export default BackendAPI;
