import React from "react"
import { PageProps, graphql } from "gatsby"
import Img from "gatsby-image"
import styled, { css } from "styled-components"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import SEO from "../components/seo"
import { ContactUsQuery } from "../../graphql-types"

const ContactUsPage: React.FC<PageProps<ContactUsQuery>> = ({ data }) => (
  <>
    <SEO title="Contact Us" />
    <div>
      <SocialFlexBox>
        <h2>Cotnact Us</h2>
        <a href="https://www.facebook.com/collinandkirk/" target="_blank">
          <Img fixed={data.imageSharp.fixed} alt="Facebook" />
        </a>
      </SocialFlexBox>
      <MainContainer>
        <h3 style={{ margin: "0px" }}>Thornbury</h3>
        <InformationContainer stack="md">
          <MapContainer stack="md">
            <MapOuter>
              <GmapCanvas>
                <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.5091318610107!2d144.99930371495478!3d-37.75465857976303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6448bc3f12c33%3A0xea4909830e2fa2d3!2sCollin%20%26%20Kirk%20Optometrists!5e0!3m2!1sen!2sau!4v1602828679271!5m2!1sen!2sau"></Iframe>
              </GmapCanvas>
            </MapOuter>
          </MapContainer>
          <DetailsContainer stack="md">
            {documentToReactComponents(
              data.contentfulContactUs.contactUs.json,
              {
                renderNode: {
                  [BLOCKS.PARAGRAPH]: (node, children) => <P>{children}</P>,
                },
              }
            )}
          </DetailsContainer>
        </InformationContainer>
        <Seporator />
        <FormContainer>
          <form>
            <p>Form to be created</p>
          </form>
        </FormContainer>
      </MainContainer>
    </div>
  </>
)

export default ContactUsPage

export const query = graphql`
  query ContactUs {
    contentfulContactUs {
      contactUs {
        json
      }
    }
    imageSharp(fixed: { originalName: { eq: "facebook_logo.png" } }) {
      fixed(width: 30, height: 30) {
        ...GatsbyImageSharpFixed_withWebp
      }
    }
  }
`
const SocialFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`
interface InfoProps {
  stack: string
}
const InformationContainer = styled.div<InfoProps>`
  display: flex;
  flex: 0 1 auto;
  margin: 0.5rem 0;
  ${props =>
    props.theme.mediaQuery[props.stack](css`
      flex-direction: column;
    `)}
`
const MapContainer = styled.div<InfoProps>`
  display: flex;
  flex: 0 1 50%;
  flex-direction: column;
  padding: 1rem 0;
  ${props =>
    props.theme.mediaQuery[props.stack](css`
      width: 100%;
      padding: 0;
    `)}
`
const DetailsContainer = styled.div<InfoProps>`
  display: flex;
  flex-direction: column;
  flex: 0 1 50%;
  padding: 1rem;
  ${props =>
    props.theme.mediaQuery[props.stack](css`
      width: 100%;
      padding: 0;
    `)}
`
const FormContainer = styled.div`
  margin: 0.5rem 0;
`

const MapOuter = styled.div`
  display: flex;
  position: relative;
  text-align: right;
`
const GmapCanvas = styled.div`
  display: flex;
  overflow: hidden;
  background: none !important;
  width: 100%;
`
const Iframe = styled.iframe.attrs(() => ({
  height: "320px",
  width: "100%",
  frameBorder: "0",
  scrolling: "no",
  marginHeight: 0,
  marginWidth: 0,
}))`
  border: 0;
`
const Seporator = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.borderColour};
`
const P = styled.p`
  margin-bottom: 10px;
`
