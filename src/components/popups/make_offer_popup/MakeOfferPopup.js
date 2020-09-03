import React, { Component } from "react";
import "./MakeOfferPopup.css";
import CloseablePopup from "../CloseablePopup";
import BackendAPI from "../../../api/BackendAPI";
import { ApplicationContext } from "../../../contexts/ApplicationContext";

export default class MakeOfferPopup extends Component {
  static contextType = ApplicationContext;

  state = {
    stateValue: this.props.state,
  };

  componentDidMount() {
    this.handleMakeOffer = this.handleMakeOffer.bind(this);
    this.inputPrice.focus();
  }

  handleMakeOffer = async (event) => {
    event.preventDefault();
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
          <form onSubmit={this.handleMakeOffer}>
            <div>
              <input
                className="validation"
                type="number"
                required
                min={1}
                placeholder="e.g. 100000"
                ref={(input) => (this.inputPrice = input)}
              />
            </div>
            <div className="submit-offer">
              <input type="submit" value="Make offer" />
            </div>
          </form>
        </div>
      </CloseablePopup>
    );
  }
}
