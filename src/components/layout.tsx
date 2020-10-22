import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "./header"
import "./layout.css"
import Footer from "./footer"
import Backdrop from "./backdrop"
import Sidebar from "./sidebar"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidedrawOpen, setSidedrawOpen] = React.useState(false)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const handleSidedrawOpen = () => setSidedrawOpen(prevState => !prevState)
  return (
    <>
      <Header
        handleSidebarOpen={handleSidedrawOpen}
        siteTitle={data.site.siteMetadata?.title}
      />
      <Sidebar clickHandler={handleSidedrawOpen} show={sidedrawOpen} />
      {sidedrawOpen && <Backdrop onClick={handleSidedrawOpen} />}
      <MainContainer>
        <main>{children}</main>
      </MainContainer>
      <Footer siteTitle={data.site.siteMetadata?.title} />
    </>
  )
}

export default Layout

const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1rem 1.0875rem 1.45rem;
`
