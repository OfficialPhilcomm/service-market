import React, { Component } from "react";
import "./OrderBox.css";
import PokeballImage from "../../../img/pokeball.svg";
import ListOffersPopup from "../../popups/list_offers_popup/ListOffersPopup";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import StringUtils from "../../../api/StringUtils";
import MakeOfferPopup from "../../popups/make_offer_popup/MakeOfferPopup";
import PokeAPI from "../../../api/PokeAPI";

export default class OrderBox extends Component {
  static contextType = ApplicationContext;

  state = {
    makeOfferPopupOpen: false,
    listOffersPopupOpen: false,
    imageUrl: null,
  };

  openMakeOfferPopup = () => {
    this.setState({ makeOfferPopupOpen: true });
  };
  closeMakeOfferPopup = () => {
    this.context.request_all_orders();
    this.setState({ makeOfferPopupOpen: false });
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

  async componentDidMount() {
    const sprite = await PokeAPI.getSpriteURL(this.props.order.pokemon_name);
    this.setState({ imageUrl: sprite });
  }

  render() {
    const order = this.props.order;

    const image = this.state.imageUrl;

    return (
      <div className="order-box">
        {this.state.makeOfferPopupOpen ? (
          <MakeOfferPopup
            orderID={order.id}
            closeCallback={this.closeMakeOfferPopup}
          />
        ) : null}
        {this.state.listOffersPopupOpen ? (
          <ListOffersPopup
            orderID={order.id}
            closeCallback={this.closeListOffersPopup}
          />
        ) : null}
        <div className="details">
          <img
            className="sprite"
            src={image ? image : PokeballImage}
            alt="pokemon sprite"
          />
          <div className="basics">
            <span>
              {StringUtils.humanize(order.pokemon_name)} lvl {order.level}
            </span>
            <span>Item: {StringUtils.humanize(order.item)}</span>
            <span>Ability: {StringUtils.humanize(order.ability)}</span>
            <span>
              {this.thirtyOneCount()}x31 {this.thirtyCount()}x30
            </span>
            <span>Nature: {StringUtils.humanize(order.nature)}</span>
          </div>
          <div className="moves">
            <span>{StringUtils.humanize(order.move1)}</span>
            <span>{StringUtils.humanize(order.move2)}</span>
            <span>{StringUtils.humanize(order.move3)}</span>
            <span>{StringUtils.humanize(order.move4)}</span>
          </div>
        </div>
        <div className="buttons">
          {order.offer ? (
            <span>
              Offered: {order.offer.price} / {order.offer.days_needed}
            </span>
          ) : null}
          {order.offer_possible && !order.offer ? (
            <button className="rounded" onClick={this.openMakeOfferPopup}>
              Make offer
            </button>
          ) : null}
          {order.is_my_order && order.state === null && order.offer_count ? (
            <button className="rounded" onClick={this.openListOffersPopup}>
              List offers
            </button>
          ) : (
            <React.Fragment />
          )}
          <button className="rounded" onClick={this.showAdvancedInformation}>
            Show information
          </button>
        </div>
      </div>
    );
  }
}
