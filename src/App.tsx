import React from "react";
import { GlobalStyle } from "./global";
import Game from "./components/Game";

function App() {
  return (
    <>
      <Game rows={20} columns={10} />
      <GlobalStyle />
    </>
  );
}

export default App;
