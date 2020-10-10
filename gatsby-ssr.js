import React from "react"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import themeContext from "./src/utils/style/theme"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    height: 100vh;
    width: 100%;
  }
  #___gatsby,
  #gatsby-focus-wrapper {
    height: 100vh;
    width: 100%; 
  }
`
export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={themeContext}>
    <GlobalStyle />
    {element}
  </ThemeProvider>
)

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout {...props}>{element}</Layout>
}