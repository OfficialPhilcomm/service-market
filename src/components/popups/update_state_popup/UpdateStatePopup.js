import React, { Component } from "react";
import "./UpdateStatePopup.css";
import CloseablePopup from "../CloseablePopup";
import BackendAPI from "../../../api/BackendAPI";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import StringUtils from "../../../api/StringUtils";

export default class UpdateStatePopup extends Component {
  static contextType = ApplicationContext;

  state = {
    stateValue: this.props.state,
    successForState: null,
  };

  onOrderStateChange = async (event) => {
    const newState = event.target.value;
    this.setState({ stateValue: newState });

    const response = await BackendAPI.changeState(
      this.context.auth_token,
      this.props.orderID,
      parseInt(newState)
    );

    if (response.success) {
      this.setState({ successForState: parseInt(newState) });
    }
  };

  render() {
    return (
      <CloseablePopup
        title="Update state"
        closeCallback={this.props.closeCallback}
      >
        <div className="content">
          <div>
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
          </div>
          {this.state.successForState !== null ? (
            <div className="change-state-success">
              State updated to{" "}
              {StringUtils.stateToString(this.state.successForState)}
            </div>
          ) : null}
        </div>
      </CloseablePopup>
    );
  }
}
