import { DefaultTheme, css } from "styled-components"

const theme: DefaultTheme = {
  navbar: {
    colour: {
      background: "white",
      font: "black",
    },
    border: "1px gray solid",
    selectedBorder: "3px black solid", //hsl(143deg 100% 28%)
    unselectedBorder: "3px #f6f6f6 solid", //maybe light grey = #e4e4e4
  },
  borderColour: "gray",
  navColour: "#f6f6f6",
  footerColour: "#2a2a2a",
  footerFontColour: "white",
  mediaQuery: {
    lg: styles => css`
      @media only screen and (max-width: 992px) {
        ${styles}
      }
    `,
    md: styles => css`
      @media only screen and (max-width: 768px) {
        ${styles}
      }
    `,
    sm: styles => css`
      @media only screen and (max-width: 600px) {
        ${styles}
      }
    `,
  },
}

export default theme
