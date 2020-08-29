import React from "react";
import "./App.css";
import NavBar from "./components/layout/navbar/NavBar";
import Main from "./components/layout/main/Main";
import ApplicationContextProvider from "./contexts/ApplicationContext";
import PokeAPI from "./api/PokeAPI";

export default class App extends React.Component {
  state = {
    loginStatus: {
      logged_in: false,
    },
  };

  async componentDidMount() {
    PokeAPI.requestPokemonList();
  }

  render() {
    return (
      <ApplicationContextProvider value={{ logged_in: true }}>
        <div className="App">
          <NavBar />
          <Main />
        </div>
      </ApplicationContextProvider>
    );
  }
}
