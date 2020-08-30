import React, { Component } from "react";
import BackendAPI from "../../../api/BackendAPI";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import StringUtils from "../../../api/StringUtils";
import UpdateStatePopup from "../../popups/update_state_popup/UpdateStatePopup";

export default class MoreInformation extends Component {
  static contextType = ApplicationContext;

  state = {
    order: null,
    updateStatePopupOpen: false,
  };

  openUpdateStatePopup = () => {
    this.setState({ updateStatePopupOpen: true });
  };
  closeUpdateStatePopup = () => {
    this.setState({ updateStatePopupOpen: false });
    this.refreshInformation();
  };

  refreshInformation = async () => {
    const result = await BackendAPI.requestOrderInfo(
      this.context.auth_token,
      this.props.orderID
    );

    this.setState({ order: result.order });
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
            {order.state !== null ? (
              <div>
                {StringUtils.humanize(StringUtils.stateToString(order.state))}
              </div>
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
              {order.state_changeable ? (
                <button onClick={this.openUpdateStatePopup}>
                  Update state
                </button>
              ) : null}
              {order.closeable ? <button>Close order</button> : null}
              {order.finishable ? <button>Finish order</button> : null}
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
