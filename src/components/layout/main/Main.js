import React, { Component } from "react";

import AllRequests from "../all_requests/AllRequests";
import UserInfo from "../userinfo/UserInfo";

import "./Main.css";
import axios from "axios";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";

export default class Main extends Component {
  static contextType = AuthenticationContext;

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
