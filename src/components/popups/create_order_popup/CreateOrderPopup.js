import React, { Component } from "react";
import CloseablePopup from "../CloseablePopup";

export default class CreateOrderPopup extends Component {
  render() {
    return (
      <CloseablePopup closeCallback={this.props.closeCallback}>
        This is a closeable popup
      </CloseablePopup>
    );
  }
}
