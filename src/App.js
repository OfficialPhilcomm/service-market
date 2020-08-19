import React from "react";
import "./App.css";
import NavBar from "./components/layout/navbar/NavBar";
import Main from "./components/layout/main/Main";
import AuthenticationContextProvider from "./contexts/AuthenticationContext";

export default class App extends React.Component {
  state = {
    loginStatus: {
      logged_in: false,
    },
  };

  async componentDidMount() {}

  render() {
    return (
      <AuthenticationContextProvider value={{ logged_in: true }}>
        <div className="App">
          <NavBar />
          <Main />
        </div>
      </AuthenticationContextProvider>
    );
  }
}
