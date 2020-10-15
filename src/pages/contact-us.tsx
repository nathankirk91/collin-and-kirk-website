import React from "react"
import { PageProps, graphql } from "gatsby"
import Img from "gatsby-image"
import styled, { css } from "styled-components"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import SEO from "../components/seo"
import { ContactUsQuery } from "../../graphql-types"
import toHTML from "../helper/toHTML"

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
                <Iframe src="https://maps.google.com/maps?q=774%20high%20street%20thornbury%20victoria&t=&z=15&ie=UTF8&iwloc=&output=embed"></Iframe>
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
const SocialContainer = styled.div`
  width: 30px;
  height: 30px;
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
  flex-basis: 0;
  flex-grow: 0;
  margin: 0.5rem 0;
  ${props =>
    props.theme.mediaQuery[props.stack](css`
      flex-direction: column;
    `)}
`
const MapContainer = styled.div<InfoProps>`
  display: flex;
  width: 50%;
  flex-direction: column;
  padding: 1rem 0;
  ${props =>
    props.theme.mediaQuery[props.stack](css`
      width: 100%;
      padding: 0;
    `)}
`
const DetailsContainer = styled.div<InfoProps>`
  width: 50%;
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
  position: relative;
  text-align: right;
  height: 100%;
  width: 100%;
  /* min-height: 400px; */
`
const GmapCanvas = styled.div`
  overflow: hidden;
  background: none !important;
  height: 100%;
  width: 100%;
  /* min-height: 400px; */
`
const Iframe = styled.iframe.attrs(() => ({
  height: "100%",
  width: "100%",
  frameBorder: "0",
  scrolling: "no",
  marginHeight: 0,
  marginWidth: 0,
}))`
  height: 100%;
  width: 100%;
`
const Seporator = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.borderColour};
`
const P = styled.p`
  margin-bottom: 10px;
`
