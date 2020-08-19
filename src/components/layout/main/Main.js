import React, { Component } from "react";

import AllRequests from "../all_requests/AllRequests";
import UserInfo from "../userinfo/UserInfo";

import "./Main.css";

export default class Main extends Component {
  render() {
    return (
      <main>
        <AllRequests />
        <div className="more-information">more-information</div>
        <UserInfo />
        <div className="own-requests">own-requests</div>
      </main>
    );
  }
}
