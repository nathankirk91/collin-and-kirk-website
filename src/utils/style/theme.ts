import { unstable_collectionGraphql } from "gatsby"
import {DefaultTheme} from "styled-components"

const theme: DefaultTheme = {
  navbar: {
    colour: {
      background: "white",
      font: "black",
    },
    border: "1px gray solid",
    selectedBorder: "3px black solid",
    unselectedBorder: "3px white solid"
  },
}

export default theme
