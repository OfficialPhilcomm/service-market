import React, { Component } from "react";
import "./OrderBox.css";
import { ReactComponent as PokeballImage } from "../../../img/pokeball.svg";
import ListOffersPopup from "../../popups/list_offers_popup/ListOffersPopup";
import { ApplicationContext } from "../../../contexts/ApplicationContext";

export default class OrderBox extends Component {
  static contextType = ApplicationContext;

  state = {
    listOffersPopupOpen: false,
  };

  openListOffersPopup = () => {
    this.setState({ listOffersPopupOpen: true });
  };
  closeListOffersPopup = () => {
    this.setState({ listOffersPopupOpen: false });
  };
  showAdvancedInformation = () => {
    this.context.show_advanced_information(this.props.order.id);
  };

  render() {
    const order = this.props.order;

    console.log(order);

    return (
      <div className="order-box">
        {this.state.listOffersPopupOpen ? (
          <ListOffersPopup
            orderID={order.id}
            closeCallback={this.closeListOffersPopup}
          />
        ) : (
          <React.Fragment />
        )}
        <div className="details">
          <PokeballImage className="sprite" />
          <div>{order.username}</div>
          <div>{order.pokemon_name}</div>
          <div>{order.level}</div>
        </div>
        <div className="buttons">
          {order.my_order && order.state === null && order.offer_count ? (
            <button onClick={this.openListOffersPopup}>List offers</button>
          ) : (
            <React.Fragment />
          )}
          <button onClick={this.showAdvancedInformation}>
            Show information
          </button>
        </div>
      </div>
    );
  }
}
