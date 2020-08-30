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

  render() {
    return (
      <CloseablePopup closeCallback={this.props.closeCallback}>
        Here are all offers for id {this.props.orderID}
        <table>
          <tbody>
            {this.state.offers.map((offer) => (
              <tr key={offer.id}>
                <td>{offer.username}</td>
                <td>{offer.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CloseablePopup>
    );
  }
}
