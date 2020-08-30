import React, { Component } from "react";
import CloseablePopup from "../CloseablePopup";
import BackendAPI from "../../../api/BackendAPI";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import StringUtils from "../../../api/StringUtils";

export default class UpdateStatePopup extends Component {
  static contextType = ApplicationContext;

  state = {
    stateValue: this.props.state,
  };

  onOrderStateChange = async (event) => {
    this.setState({ stateValue: event.target.value });

    BackendAPI.changeState(
      this.context.auth_token,
      this.props.orderID,
      parseInt(event.target.value)
    );
  };

  render() {
    console.log(this.props);

    return (
      <CloseablePopup closeCallback={this.props.closeCallback}>
        Update the state for {this.props.orderID}
        <select
          value={this.state.stateValue}
          onChange={this.onOrderStateChange}
        >
          {StringUtils.states.map((state, stateID) => (
            <option value={stateID} key={stateID}>
              {state}
            </option>
          ))}
        </select>
      </CloseablePopup>
    );
  }
}
