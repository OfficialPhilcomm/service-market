import React, { Component } from "react";
import Popup from "./Popup";

export default class CloseablePopup extends Component {
  render() {
    return (
      <Popup>
        <div className="close-button">Close</div>
        {this.props.children}
      </Popup>
    );
  }
}
