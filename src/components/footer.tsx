import { Link } from "gatsby"
import React from "react"

import styled from "styled-components"

interface FooterProps {
  siteTitle: string
}

const Footer: React.FC<FooterProps> = ({ siteTitle }) => (
  <FooterContainer>
    © Copyright {new Date().getFullYear()} {siteTitle}. All Right Reserved.
  </FooterContainer>
)

export default Footer

const FooterContainer = styled.footer`
  background: ${props => props.theme.navbar.colour.background};
  padding: 2rem;
  margin-top: 2rem;
`
