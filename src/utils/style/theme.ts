import { DefaultTheme, css } from "styled-components"

const theme: DefaultTheme = {
  navbar: {
    colour: {
      background: "white",
      font: "black",
    },
    border: "1px gray solid",
    selectedBorder: "3px black solid",
    unselectedBorder: "3px white solid",
  },
  borderColour: "gray",
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
