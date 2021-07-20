import { graphql, Link, useStaticQuery } from "gatsby"
import { useLocation } from "@reach/router"
import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

import linkData from "../data/links"

interface HeaderProps {
  siteTitle: string
  handleSidebarOpen: () => void
  handleBookingOpen: () => void
}

const Header: React.FC<HeaderProps> = ({
  siteTitle,
  handleSidebarOpen,
  handleBookingOpen,
}) => {
  const locData = useLocation()
  return (
    <>
      <HeaderContainer>
        <ToggleButtonContainer onClick={handleSidebarOpen} collapse="lg">
          <ToggleButtonLine />
          <ToggleButtonLine />
          <ToggleButtonLine />
        </ToggleButtonContainer>
        <LogoContainer>
          <Link to="/">
            <StaticImage
              src="../images/c&k-logo.png"
              alt={siteTitle}
              width={300}
            />
          </Link>
        </LogoContainer>
      </HeaderContainer>
      <NavBar collapse="lg">
        {linkData.map((link, index) => (
          <Link
            key={index}
            to={link.link}
            style={{ textDecoration: "none", fontSize: "0.9rem" }}
          >
            <NavLinks
              className={
                locData.pathname.split("/")[1] === link.link.split("/")[1]
                  ? "active"
                  : ""
              }
            >
              {link.name}
            </NavLinks>
          </Link>
        ))}

        <div
          style={{
            textDecoration: "none",
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          <NavLinks onClick={() => handleBookingOpen()}>
            BOOK AN APPOINTMENT
          </NavLinks>
        </div>
      </NavBar>
    </>
  )
}

export default Header

const HeaderContainer = styled.header`
  background: ${props => props.theme.navbar.colour.background};
  margin-bottom: 1.45rem;
  margin: 0 auto;
  border-bottom: ${({ theme }) => theme.navbar.border};
`
const LogoContainer = styled.div`
  max-width: 250px;
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
`
interface NavBarProps {
  readonly collapse: string
}
const NavBar = styled.ul<NavBarProps>`
  display: flex;
  justify-content: center;
  margin: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.navColour};
  border-bottom: ${({ theme }) => theme.navbar.border};
  ${props =>
    props.theme.mediaQuery[props.collapse](`
    display: none
  `)}
`
const NavLinks = styled.li`
  list-style: none;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  border-bottom: ${({ theme }) => theme.navbar.unselectedBorder};
  transition: border 300ms linear;
  text-decoration: none;
  color: ${({ theme }) => theme.navbar.colour.font};
  font-size: 0.8rem;
  /* & a {
    color: ${({ theme }) => theme.navbar.colour.font};
    font-size: 0.8rem;
  } */
  &:hover,
  &.active {
    border-bottom: ${({ theme }) => theme.navbar.selectedBorder};
  }
`
const ToggleButtonContainer = styled.button.attrs({
  "aria-label":"Menu"
})<NavBarProps>`
  position: absolute;
  top: 53.5px;
  left: 1rem;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  height: 20px;
  width: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
  ${props =>
    props.theme.mediaQuery[props.collapse](`
    display: flex; 
  `)}
`
const ToggleButtonLine = styled.div`
  width: 25px;
  height: 2px;
  background: black;
`
