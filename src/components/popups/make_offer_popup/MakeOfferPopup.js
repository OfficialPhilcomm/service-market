import React, { Component } from "react";
import CloseablePopup from "../CloseablePopup";
import BackendAPI from "../../../api/BackendAPI";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import StringUtils from "../../../api/StringUtils";

export default class MakeOfferPopup extends Component {
  static contextType = ApplicationContext;

  state = {
    stateValue: this.props.state,
  };

  onMakeOfferClick = async (event) => {
    await BackendAPI.makeOffer(
      this.context.auth_token,
      this.props.orderID,
      parseInt(this.inputPrice.value)
    );
    this.props.closeCallback();
  };

  render() {
    return (
      <CloseablePopup closeCallback={this.props.closeCallback}>
        <div className="content">
          <input type="number" ref={(input) => (this.inputPrice = input)} />
        </div>
        <div className="buttons">
          <button className="rounded" onClick={this.onMakeOfferClick}>
            OK
          </button>
        </div>
      </CloseablePopup>
    );
  }
}
