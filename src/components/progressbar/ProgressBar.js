import React, { Component } from "react";
import "./ProgressBar.css";
import StringUtils from "../../api/StringUtils";

export default class ProgressBar extends Component {
  render() {
    return (
      <div className="progressbar">
        <div className="progressbar-track" />
        {StringUtils.states.map((state, index) => (
          <div className="progressbar-step">{state}</div>
        ))}
      </div>
    );
  }
}
