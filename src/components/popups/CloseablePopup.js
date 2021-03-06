import React, { Component } from "react";
import Popup from "./Popup";
import { ReactComponent as CloseButton } from "../../img/times-circle-solid.svg";

export default class CloseablePopup extends Component {
  closePopup = () => {
    if (this.props.closeCallback) this.props.closeCallback();
  };

  render() {
    return (
      <Popup title={this.props.title}>
        <CloseButton className="close-button" onClick={this.closePopup} />
        {this.props.children}
      </Popup>
    );
  }
}
