import React, { Component } from "react";
import "./MoreInformation.css";
import BackendAPI from "../../../api/BackendAPI";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import StringUtils from "../../../api/StringUtils";
import UpdateStatePopup from "../../popups/update_state_popup/UpdateStatePopup";
import ProgressBar from "../../progressbar/ProgressBar";
import ExportDataPopup from "../../popups/export_data/ExportDataPopup";
import PokeAPI from "../../../api/PokeAPI";
import PokeballImage from "../../../img/pokeball.svg";
import { ReactComponent as PokeDollar } from "../../../img/poke-dollar.svg";

export default class MoreInformation extends Component {
  static contextType = ApplicationContext;

  state = {
    order: null,
    imageURL: null,
    updateStatePopupOpen: false,
    exportDataPopupOpen: false,
  };

  componentDidMount() {
    setInterval(() => {
      if (this.context.logged_in) {
        this.refreshInformation();
      }
    }, 300000);
  }

  openUpdateStatePopup = () => {
    this.setState({ updateStatePopupOpen: true });
  };
  closeUpdateStatePopup = () => {
    this.setState({ updateStatePopupOpen: false });
    this.refreshInformation();
  };

  openExportDataPopup = () => {
    this.setState({ exportDataPopupOpen: true });
  };
  closeExportDataPopup = () => {
    this.setState({ exportDataPopupOpen: false });
  };

  refreshInformation = async () => {
    const result = await BackendAPI.requestOrderInfo(
      this.context.auth_token,
      this.props.orderID
    );

    const sprite = await PokeAPI.getSpriteURL(
      result.order.order_data.pokemon_name
    );

    this.setState({ order: result.order, imageUrl: sprite });
  };

  finishOrder = async () => {
    await BackendAPI.finishOrder(this.context.auth_token, this.props.orderID);

    this.context.request_my_orders();

    this.refreshInformation();
  };

  closeOrder = async () => {
    await BackendAPI.closeOrder(this.context.auth_token, this.props.orderID);

    this.context.request_my_orders();

    this.refreshInformation();
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.orderID !== this.props.orderID) {
      this.refreshInformation();
    }
  }

  render() {
    const order = this.state.order;
    console.log(order);

    const image = this.state.imageUrl;

    return (
      <div className="more-information">
        {order ? (
          <React.Fragment>
            {this.state.updateStatePopupOpen ? (
              <UpdateStatePopup
                orderID={order.user_order_id}
                state={order.state}
                closeCallback={this.closeUpdateStatePopup}
              />
            ) : null}
            {this.state.exportDataPopupOpen ? (
              <ExportDataPopup
                order={order}
                closeCallback={this.closeExportDataPopup}
              />
            ) : null}
            {order.state !== null ? (
              <ProgressBar finishedSteps={order.finished ? 5 : order.state} />
            ) : null}
            {order.is_my_order ? (
              <React.Fragment>
                {order.state != null ? (
                  <React.Fragment>
                    <div>Breeder: {order.breeder}</div>
                    <div>
                      Price: {StringUtils.formatNumber(order.price)}
                      <PokeDollar className="poke-dollar" />
                    </div>
                  </React.Fragment>
                ) : (
                  <div>Order is not accepted yet</div>
                )}
              </React.Fragment>
            ) : null}
            <div className="details">
              <img className="sprite" src={image ? image : PokeballImage} />
              <div className="info">
                <span className="pokemon-name">
                  {StringUtils.humanize(order.order_data.pokemon_name)} lvl{" "}
                  {order.order_data.level}
                </span>
                <span>Item: {StringUtils.humanize(order.order_data.item)}</span>
                <span>
                  Nature: {StringUtils.humanize(order.order_data.nature)}
                </span>
                <span>
                  Ability: {StringUtils.humanize(order.order_data.ability)}
                </span>
              </div>
              <table className="moves-table">
                <tbody>
                  <tr>
                    <td className="move-container">
                      <div className="move">
                        {StringUtils.humanize(order.order_data.moves.move1)}
                      </div>
                    </td>
                    <td className="move-container">
                      <div className="move">
                        {StringUtils.humanize(order.order_data.moves.move2)}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="move-container">
                      <div className="move">
                        {StringUtils.humanize(order.order_data.moves.move3)}
                      </div>
                    </td>
                    <td className="move-container">
                      <div className="move">
                        {StringUtils.humanize(order.order_data.moves.move4)}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <table className="stats">
              <tbody>
                <tr>
                  <th />
                  <th>HP</th>
                  <th>Atk</th>
                  <th>Def</th>
                  <th>SpAtk</th>
                  <th>SpDef</th>
                  <th>Speed</th>
                </tr>
                <tr>
                  <th>IV</th>
                  <td>{order.order_data.ivs.iv_hp}</td>
                  <td>{order.order_data.ivs.iv_atk}</td>
                  <td>{order.order_data.ivs.iv_def}</td>
                  <td>{order.order_data.ivs.iv_spatk}</td>
                  <td>{order.order_data.ivs.iv_spdef}</td>
                  <td>{order.order_data.ivs.iv_spe}</td>
                </tr>
                <tr>
                  <th>EV</th>
                  <td>{order.order_data.evs.ev_hp}</td>
                  <td>{order.order_data.evs.ev_atk}</td>
                  <td>{order.order_data.evs.ev_def}</td>
                  <td>{order.order_data.evs.ev_spatk}</td>
                  <td>{order.order_data.evs.ev_spdef}</td>
                  <td>{order.order_data.evs.ev_spe}</td>
                </tr>
              </tbody>
            </table>
            <div className="buttons">
              {!order.is_my_order && order.state !== null ? (
                <button className="rounded" onClick={this.openExportDataPopup}>
                  Export data
                </button>
              ) : null}
              {order.state_changeable && !order.finished ? (
                <button className="rounded" onClick={this.openUpdateStatePopup}>
                  Update state
                </button>
              ) : null}
              {order.finishable ? (
                <button className="rounded" onClick={this.finishOrder}>
                  Finish order
                </button>
              ) : null}
              {order.closeable ? (
                <button className="rounded" onClick={this.closeOrder}>
                  Close order
                </button>
              ) : null}
            </div>
          </React.Fragment>
        ) : (
          <div>
            Click on Show Information to get advanced information about an order
          </div>
        )}
      </div>
    );
  }
}
