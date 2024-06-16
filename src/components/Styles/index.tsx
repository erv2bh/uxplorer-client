import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export default GlobalStyle;
