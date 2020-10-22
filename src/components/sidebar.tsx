import React from "react"
import styled, { css } from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import linkData from "../data/links"

interface SidebarProp {
  show: Boolean
  clickHandler: () => void
}

const Sidebar: React.FC<SidebarProp> = ({ show, clickHandler }) => {
  const data = useStaticQuery(graphql`
    query LogoQuery1 {
      imageSharp(fluid: { originalName: { eq: "c&k-logo.png" } }) {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  `)
  let drawerClassOpen = ""
  if (show) {
    drawerClassOpen = "open"
  }
  return (
    <SidebarContainer className={drawerClassOpen} show="lg">
      <SidebarUl>
        {linkData.map((link, index) => (
          <SidebarLi key={index}>
            <SidebarLink onClick={clickHandler} to={link.link}>
              {link.name}
            </SidebarLink>
          </SidebarLi>
        ))}
      </SidebarUl>
      <LogoContainer>
        <Link to="/" onClick={clickHandler}>
          <Img fluid={data.imageSharp.fluid} alt="Collin and Kirk" />
        </Link>
      </LogoContainer>
    </SidebarContainer>
  )
}

export default Sidebar

interface SidebarProps {
  readonly show: string
}
const SidebarContainer = styled.nav<SidebarProps>`
  display: none;
  height: 100%;
  background: ${({theme})=>theme.sidebarBackgroundColour};
  box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  z-index: 200;
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
  &.open {
    transform: translateX(0);
  }
  ${props =>
    props.theme.mediaQuery[props.show](css`
      display: flex;
      flex-direction: column;
      justify-items: center;
    `)}
`
const SidebarUl = styled.ul`
  height: 100%;
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: top;
  margin: 2rem 0;
  padding: 0;
`
const SidebarLi = styled.li`
  margin: 0.25rem 0;
  text-align: center;
`
const SidebarLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 1.2rem;
  &:hover,
  &:active {
    cursor: pointer;
    color: ${({theme})=>theme.sidebarActiveFontColour};
  }
`
const LogoContainer = styled.div`
  width: 100%;
  margin: 1rem auto;
  padding: 1.45rem 1.0875rem;
`
