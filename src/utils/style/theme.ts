import { unstable_collectionGraphql } from "gatsby"
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
  mediaQuery: {
    lg: (styles) => css`
      @media only screen and (max-width: 992px) {
        ${styles}
      }
    `,
  },
}

export default theme
