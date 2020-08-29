import axios from "axios";

class BackendAPI {
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
}

export default BackendAPI;
