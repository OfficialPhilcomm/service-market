import React, { Component } from "react";
import CloseablePopup from "../CloseablePopup";
import StringUtils from "../../../api/StringUtils";
import "./ExportDataPopup.css";

export default class ExportDataPopup extends Component {
  render() {
    const order = this.props.order;

    const value = `Username: ${order.buyer}
Price: ${order.price}

${StringUtils.humanize(order.order_data.pokemon_name)} lvl ${
      order.order_data.level
    }
Ability: ${StringUtils.humanize(order.order_data.ability)}
Item: ${StringUtils.humanize(order.order_data.item)}

Moves:
${StringUtils.humanize(order.order_data.moves.move1)}
${StringUtils.humanize(order.order_data.moves.move2)}
${StringUtils.humanize(order.order_data.moves.move3)}
${StringUtils.humanize(order.order_data.moves.move4)}

Stats:
IV: ${order.order_data.ivs.iv_hp} ${order.order_data.ivs.iv_atk} ${
      order.order_data.ivs.iv_def
    } ${order.order_data.ivs.iv_spatk} ${order.order_data.ivs.iv_spdef} ${
      order.order_data.ivs.iv_spe
    }
EV: ${order.order_data.evs.ev_hp} ${order.order_data.evs.ev_atk} ${
      order.order_data.evs.ev_def
    } ${order.order_data.evs.ev_spatk} ${order.order_data.evs.ev_spdef} ${
      order.order_data.evs.ev_spe
    }`;

    return (
      <CloseablePopup
        title="Export data as text"
        closeCallback={this.props.closeCallback}
      >
        <div className="content">
          <textarea className="export-area" readOnly value={value} />
        </div>
      </CloseablePopup>
    );
  }
}
