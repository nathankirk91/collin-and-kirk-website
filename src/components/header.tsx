import { graphql, Link, useStaticQuery } from "gatsby"
import { useLocation } from "@reach/router"
import React from "react"
import Img from "gatsby-image"
import linkData from "../data/links"

import styled, { keyframes } from "styled-components"

interface HeaderProps {
  siteTitle: string
}

const Header: React.FC<HeaderProps> = ({ siteTitle }) => {
  const locData = useLocation()
  const data = useStaticQuery(graphql`
    query LogoQuery {
      imageSharp(fluid: { originalName: { eq: "c&k-logo.png" } }) {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  `)
  return (
    <>
      <HeaderContainer>
        <LogoContainer>
          <Link to="/">
            <Img fluid={data.imageSharp.fluid} alt={siteTitle} />
          </Link>
        </LogoContainer>
      </HeaderContainer>
      <NavBar>
        {linkData.map(link => (
          <NavLinks className={locData.pathname === link.link ? "active" : ""}>
            <Link to={link.link}>{link.name}</Link>
          </NavLinks>
        ))}
      </NavBar>
    </>
  )
}

export default Header

const HeaderContainer = styled.header`
  background: ${props => props.theme.navbar.colour.background};
  max-width: 960px;
  margin-bottom: 1.45rem;
  margin: 0 auto;
`
const LogoContainer = styled.div`
  max-width: 250px;
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
`
const NavBar = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  width: 100%;
  border-top: ${({ theme }) => theme.navbar.border};
  border-bottom: ${({ theme }) => theme.navbar.border};
`
const NavLinks = styled.li`
  list-style: none;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  border-bottom: ${({ theme }) => theme.navbar.unselectedBorder};
  transition: border 300ms linear;
  & a {
    text-decoration: none;
    color: ${({ theme }) => theme.navbar.colour.font};
    font-size: 0.8rem;
  }
  &:hover,
  &.active {
    border-bottom: ${({ theme }) => theme.navbar.selectedBorder};
  }
`
