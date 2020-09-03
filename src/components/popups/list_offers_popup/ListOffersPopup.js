import React, { Component } from "react";
import CloseablePopup from "../CloseablePopup";
import BackendAPI from "../../../api/BackendAPI";
import { ApplicationContext } from "../../../contexts/ApplicationContext";

export default class ListOffersPopup extends Component {
  static contextType = ApplicationContext;

  state = {
    offers: [],
  };

  async componentDidMount() {
    const result = await BackendAPI.requestOffers(
      this.context.auth_token,
      this.props.orderID
    );
    this.setState({ offers: result.offers });
  }

  acceptOffer = async (offerID) => {
    await BackendAPI.acceptOffer(
      this.context.auth_token,
      this.props.orderID,
      offerID
    );
    this.props.closeCallback();

    this.context.request_my_orders();
    this.context.request_all_orders();
  };

  render() {
    return (
      <CloseablePopup closeCallback={this.props.closeCallback}>
        <table>
          <tbody>
            <tr>
              <th>User</th>
              <th>Price</th>
            </tr>
            {this.state.offers.map((offer) => (
              <tr key={offer.id}>
                <td>{offer.username}</td>
                <td>{offer.price}</td>
                <td>
                  <button
                    className="rounded"
                    onClick={() => this.acceptOffer(offer.id)}
                  >
                    Accept
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CloseablePopup>
    );
  }
}
