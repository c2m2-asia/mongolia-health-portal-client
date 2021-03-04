import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Roboto Condensed, Montserrat;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif, Montserrat;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  h1,h2,h3,h4,h5,h6 {
    font-weight: 300;
    margin: 0;
  }

  h1 {
    font-size: 40px;
  }

  p,
  label {
    font-family: Roboto Condensed;
    // font-weight: 300;
  }
`;

export default GlobalStyle;
