import React, { Component } from "react";
import BackendAPI from "../../../api/BackendAPI";
import { ApplicationContext } from "../../../contexts/ApplicationContext";

export default class MoreInformation extends Component {
  static contextType = ApplicationContext;

  state = {
    order: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.orderID !== this.props.orderID) {
      const result = await BackendAPI.requestOrderInfo(
        this.context.auth_token,
        this.props.orderID
      );

      console.log(result.order);

      this.setState({ order: result.order });
    }
  }

  render() {
    const order = this.state.order;

    return (
      <div className="more-information">
        {order ? (
          <React.Fragment>
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
              {order.state !== null && !order.is_my_order ? (
                <button>Update state</button>
              ) : null}
              {order.closeable && !order.is_my_order ? (
                <button>Close order</button>
              ) : null}
              {order.finishable && order.is_my_order ? (
                <button>Finish order</button>
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
