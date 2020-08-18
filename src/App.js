import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/layout/navbar/NavBar";
import Main from "./components/layout/main/Main";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Main />
    </div>
  );
}

export default App;
