import React, { Component } from "react";
import CloseablePopup from "../CloseablePopup";
import BackendAPI from "../../../api/BackendAPI";
import { ApplicationContext } from "../../../contexts/ApplicationContext";

export default class ListOffersPopup extends Component {
  static contextType = ApplicationContext;

  state = {
    loading: true,
    offers: [],
  };

  async componentDidMount() {
    const result = await BackendAPI.requestOffers(
      this.context.auth_token,
      this.props.orderID
    );
    this.setState({ loading: false, offers: result.offers });
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
              <th></th>
            </tr>
            {this.state.loading ? (
              <tr>
                <td colSpan={3}>Loading</td>
              </tr>
            ) : (
              <React.Fragment>
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
              </React.Fragment>
            )}
          </tbody>
        </table>
      </CloseablePopup>
    );
  }
}
