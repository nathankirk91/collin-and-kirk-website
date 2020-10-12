import React from "react"
import { PageProps, Link } from "gatsby"

import SEO from "../components/seo"
import styled from "styled-components"

const BookAnAppointmentPage: React.FC<PageProps> = () => (
  <>
    <SEO title="Book An Appointment" />
    <div>
      <TitleContainer>
        <h2>BOOK YOUR NEXT APPOINTMENT TODAY!</h2>
      </TitleContainer>
      <Container>
        <Iframe
          src="https://www.MyHealth1st.com.au/AppointmentWidget?practice_id=2953"
          frameBorder={0}
        >
          {" "}
        </Iframe>
      </Container>
    </div>
  </>
)

export default BookAnAppointmentPage
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`
const Container = styled.div`
  height: 50vw;
  min-height: 800px;
  width: 100%;
`
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
`
