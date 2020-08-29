import React, { Component } from "react";
import Popup from "./Popup";

export default class CloseablePopup extends Component {
  state = {
    isOpen: true,
  };

  closePopup = () => {
    console.log("closePopup called");
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isOpen ? (
          <Popup>
            <div className="close-button" onClick={this.closePopup}>
              Close
            </div>
            {this.props.children}
          </Popup>
        ) : (
          <React.Fragment />
        )}
      </React.Fragment>
    );
  }
}
