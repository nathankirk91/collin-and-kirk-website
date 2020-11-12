import { Link } from "gatsby"
import React from "react"

import styled from "styled-components"

interface FooterProps {
  siteTitle: string
}

const Footer: React.FC<FooterProps> = ({ siteTitle }) => (
  <FooterContainer>
    <Link style={{color: "white"}} to="/covid">Covid-19 Safe Plan</Link><br/>
    © Copyright {new Date().getFullYear()} {siteTitle}. All Right Reserved.
  </FooterContainer>
)

export default Footer

const FooterContainer = styled.footer`
  background: ${props => props.theme.navbar.colour.background};
  padding: 2rem;
  text-align: center;
  background-color: ${({ theme }) => theme.footerColour};
  color: ${({ theme }) => theme.footerFontColour};
`
