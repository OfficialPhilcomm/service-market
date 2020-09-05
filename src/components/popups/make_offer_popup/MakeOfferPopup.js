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
      parseInt(this.inputPrice.value),
      parseInt(this.inputDaysNeeded.value)
    );
    this.props.closeCallback();
  };

  render() {
    return (
      <CloseablePopup
        title="Make Offer"
        closeCallback={this.props.closeCallback}
      >
        <div className="content">
          <form onSubmit={this.handleMakeOffer}>
            <table>
              <tbody>
                <tr>
                  <td>Price</td>
                  <td>
                    <input
                      className="validation"
                      type="number"
                      required
                      min={1}
                      placeholder="e.g. 100000"
                      ref={(input) => (this.inputPrice = input)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Days needed</td>
                  <td>
                    <input
                      type="number"
                      required
                      min={1}
                      ref={(input) => (this.inputDaysNeeded = input)}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <input type="submit" value="Make offer" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </CloseablePopup>
    );
  }
}
