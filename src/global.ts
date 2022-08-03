import { createGlobalStyle } from "styled-components";
import "@fontsource/press-start-2p";

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: black;
  user-select: none;
  font-family: 'Press Start 2P', cursive;
}
`
