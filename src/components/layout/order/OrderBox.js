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
  thirtyOneCount = () => {
    const order = this.props.order;

    let ivs = [
      order.iv_hp,
      order.iv_atk,
      order.iv_def,
      order.iv_spatk,
      order.iv_spdef,
      order.iv_spe,
    ];

    let thirtyOneCount = 0;
    for (let iv of ivs) {
      if (iv === 31) thirtyOneCount++;
    }

    return thirtyOneCount;
  };
  thirtyCount = () => {
    const order = this.props.order;

    let ivs = [
      order.iv_hp,
      order.iv_atk,
      order.iv_def,
      order.iv_spatk,
      order.iv_spdef,
      order.iv_spe,
    ];

    let thirtyCount = 0;
    for (let iv of ivs) {
      if (iv === 30) thirtyCount++;
    }

    return thirtyCount;
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
          <div className="basics">
            <span>
              {order.pokemon_name} lvl {order.level}
            </span>
            <span>Item: {order.item}</span>
            <span>Ability: {order.ability}</span>
            <span>
              {this.thirtyOneCount()}x31 {this.thirtyCount()}x30
            </span>
          </div>
          <div className="moves">
            <span>{order.move1}</span>
            <span>{order.move2}</span>
            <span>{order.move3}</span>
            <span>{order.move4}</span>
          </div>
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
