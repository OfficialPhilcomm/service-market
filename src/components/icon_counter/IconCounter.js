import React, { Component } from "react";
import "./IconCounter.css";

export default class IconCounter extends Component {
  render() {
    return (
      <div className="icon-counter">
        <img src={this.props.icon} alt="counter icon" />
        <div className="counter">{this.props.counter}</div>
      </div>
    );
  }
}
