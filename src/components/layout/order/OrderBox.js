import React, { Component } from "react";
import "./OrderBox.css";
import { ReactComponent as PokeballImage } from "../../../img/pokeball.svg";

export default class OrderBox extends Component {
  render() {
    return (
      <div className="order-box">
        <PokeballImage className="sprite" />
        <div>{this.props.order.username}</div>
        <div>{this.props.order.pokemon_name}</div>
        <div>{this.props.order.level}</div>
      </div>
    );
  }
}
