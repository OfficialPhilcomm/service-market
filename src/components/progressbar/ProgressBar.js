import React, { Component } from "react";
import "./ProgressBar.css";
import StringUtils from "../../api/StringUtils";

export default class ProgressBar extends Component {
  render() {
    return (
      <div className="progressbar">
        <div className="progressbar-track" />
        {StringUtils.states.map((state, index) => (
          <div
            className={
              index < this.props.finishedSteps
                ? "progressbar-step is-complete"
                : index === this.props.finishedSteps
                ? "progressbar-step is-active"
                : "progressbar-step"
            }
            key={index}
          >
            {state}
          </div>
        ))}
      </div>
    );
  }
}
