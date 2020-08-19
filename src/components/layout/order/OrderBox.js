import React, { Component } from "react";
import "./OrderBox.css";

export default class OrderBox extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="order-box">
        <div>{this.props.order.username}</div>
        <div>{this.props.order.pokemon_name}</div>
        <div>{this.props.order.level}</div>
      </div>
    );
  }
}
