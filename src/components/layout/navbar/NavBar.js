import React, { Component } from "react";

import "./NavBar.css";

export default class NavBar extends Component {
  render() {
    console.log(process.env);

    return (
      <nav>
        <div className="title">
          PokeMMO Breeding Market{" "}
          <span>(alpha {process.env.npm_package_version})</span>
        </div>
      </nav>
    );
  }
}
