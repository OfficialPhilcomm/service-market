import React, { Component } from "react";
import "./MoreInformation.css";
import BackendAPI from "../../../api/BackendAPI";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import StringUtils from "../../../api/StringUtils";
import UpdateStatePopup from "../../popups/update_state_popup/UpdateStatePopup";
import ProgressBar from "../../progressbar/ProgressBar";
import ExportDataPopup from "../../popups/export_data/ExportDataPopup";

export default class MoreInformation extends Component {
  static contextType = ApplicationContext;

  state = {
    order: null,
    updateStatePopupOpen: false,
    exportDataPopupOpen: false,
  };

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

    this.setState({ order: result.order });
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
              <React.Fragment>
                <div>
                  {StringUtils.humanize(StringUtils.stateToString(order.state))}
                </div>
                <ProgressBar finishedSteps={order.finished ? 5 : order.state} />
              </React.Fragment>
            ) : null}
            {order.is_my_order ? (
              <React.Fragment>
                {order.state != null ? (
                  <div>Order is accepted by: {order.breeder}</div>
                ) : (
                  <div>Order is not accepted yet</div>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment />
            )}
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>IV</th>
                  <th>EV</th>
                </tr>
                <tr>
                  <td>HP</td>
                  <td>{order.order_data.ivs.iv_hp}</td>
                  <td>{order.order_data.evs.ev_hp}</td>
                </tr>
                <tr>
                  <td>ATK</td>
                  <td>{order.order_data.ivs.iv_atk}</td>
                  <td>{order.order_data.evs.ev_atk}</td>
                </tr>
                <tr>
                  <td>DEF</td>
                  <td>{order.order_data.ivs.iv_def}</td>
                  <td>{order.order_data.evs.ev_def}</td>
                </tr>
                <tr>
                  <td>SPATK</td>
                  <td>{order.order_data.ivs.iv_spatk}</td>
                  <td>{order.order_data.evs.ev_spatk}</td>
                </tr>
                <tr>
                  <td>SPDEF</td>
                  <td>{order.order_data.ivs.iv_spdef}</td>
                  <td>{order.order_data.evs.ev_spdef}</td>
                </tr>
                <tr>
                  <td>SPEED</td>
                  <td>{order.order_data.ivs.iv_spe}</td>
                  <td>{order.order_data.evs.ev_spe}</td>
                </tr>
              </tbody>
            </table>
            <div className="buttons">
              <button className="rounded" onClick={this.openExportDataPopup}>
                Export data
              </button>
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
