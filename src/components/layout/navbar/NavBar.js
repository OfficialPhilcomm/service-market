import React, { Component } from "react";

import "./NavBar.css";

export default class NavBar extends Component {
  render() {
    return (
      <nav>
        <div className="title">
          PokeMMO Breeding Market <span>(beta)</span>
        </div>
      </nav>
    );
  }
}
