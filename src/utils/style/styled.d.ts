import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    navbar: {
      colour: {
        background: string
        font: string
      }
      border: string
      selectedBorder: string
      unselectedBorder: string
    }
    borderColour: string
    navColour: string
    footerColour: string
    footerFontColour: string
    sidebarBackgroundColour: string
    sidebarActiveFontColour: string
    mediaQuery: {
      lg(styles: string): FlattenSimpleInterpolation
      md(styles: string): FlattenSimpleInterpolation
      sm(styles: string): FlattenSimpleInterpolation
    }
  }
}
