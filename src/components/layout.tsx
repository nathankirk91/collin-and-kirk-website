import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "./header"
import "./layout.css"
import Footer from "./footer"
import Backdrop from "./backdrop"
import Sidebar from "./sidebar"
import Modal from "./modal/Modal"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidedrawOpen, setSidedrawOpen] = React.useState(false)
  const [showBooking, setShowBooking] = React.useState(false)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const handleSidedrawOpen = () => {
    setSidedrawOpen(prevState => !prevState)
  }
  const handleBookingOpen = () => {
    document.body.style.overflow = 'hidden';
    setShowBooking(true)
  }
  const handleBookingClose = () => {
    document.body.style.overflow = 'unset';
    setShowBooking(false)
  }
  return (
    <>
      <Header
        handleSidebarOpen={handleSidedrawOpen}
        handleBookingOpen={handleBookingOpen}
        siteTitle={data.site.siteMetadata?.title}
      />
      <Sidebar clickHandler={handleSidedrawOpen} show={sidedrawOpen} handleBookingOpen={handleBookingOpen} />
      {sidedrawOpen && <Backdrop onClick={handleSidedrawOpen} />}
      {showBooking && <Backdrop onClick={handleBookingClose} />}
        {showBooking && (
          <Modal handleClose={handleBookingClose}>
            <iframe
              src="https://www.myhealth1st.com.au/appointmentWidget?theme=popup&practice_id=2953"
              style={{
                boxSizing: "border-box",
                padding: "0px",
                margin: "0px",
                border: "none",
                position: "relative",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "80vh",
              }}
              width="100%"
              height="80vh"
            />
          </Modal>
        )}
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
