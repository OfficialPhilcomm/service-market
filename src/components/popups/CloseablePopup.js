import React, { Component } from "react";
import Popup from "./Popup";

export default class CloseablePopup extends Component {
  closePopup = () => {
    if (this.props.closeCallback) this.props.closeCallback();
  };

  render() {
    return (
      <Popup>
        <div className="close-button" onClick={this.closePopup}>
          Close
        </div>
        {this.props.children}
      </Popup>
    );
  }
}
