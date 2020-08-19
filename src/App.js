import React from "react";
import "./App.css";
import NavBar from "./components/layout/navbar/NavBar";
import Main from "./components/layout/main/Main";
import LoginContext from "./contexts/LoginContext";

export default class App extends React.Component {
  state = {
    loginStatus: {
      logged_in: false,
    },
  };

  async componentDidMount() {}

  render() {
    return (
      <LoginContext.Provider value={this.state.loginStatus}>
        <div className="App">
          <NavBar />
          <Main />
        </div>
      </LoginContext.Provider>
    );
  }
}
