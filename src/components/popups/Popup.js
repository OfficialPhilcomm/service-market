import React, { Component } from "react";
import "./Popup.css";

export default class Popup extends Component {
  render() {
    return (
      <div className="popup-container">
        <div className="popup">
          {this.props.title ? (
            <div className="title">{this.props.title}</div>
          ) : null}
          {this.props.children}
        </div>
      </div>
    );
  }
}
