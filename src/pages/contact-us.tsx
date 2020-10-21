import React, { useState, useRef, useEffect } from "react"
import { PageProps, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styled, { css } from "styled-components"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { useMutation } from "@apollo/client"
import { useFormik } from "formik"

import SEO from "../components/seo"
import { ContactUsQuery } from "../../graphql-types"
import {
  CONTACT_US,
  ContactDetails,
  ContactUsSchema,
  ContactUsRes,
} from "../apollo/contactUs"
import Spinner from "../components/spinner/spinner"
import Separator from "../components/Separator"
import Input from "../components/form/Input"
import TextArea from "../components/form/TextArea"
import FormControlItem from "../components/form/FormControlItem"
import CustomErrorMessage from "../components/form/CustomErrorMessage"
import Button from "../components/form/Button"

const ContactUsPage: React.FC<PageProps<ContactUsQuery>> = ({ data }) => {
  const [contactUs, { loading }] = useMutation<ContactUsRes, ContactDetails>(
    CONTACT_US
  )
  const formik = useFormik({
    initialValues: {
      firstName: "",
      surname: "",
      email: "",
      message: "",
    },
    onSubmit: async (
      { email, firstName, surname, message },
      { resetForm, setSubmitting }
    ) => {
      scrollToSeparator()
      const res = await contactUs({
        variables: {
          email,
          firstName,
          message,
          surname,
        },
      })
      if (isCurrent.current) {
        setStatus({
          posted: true,
          emailSent: res.data.contactUs,
          firstName: firstName,
        })
        setSubmitting(false)
        resetForm()
      }
    },
    validationSchema: ContactUsSchema,
  })
  const [status, setStatus] = useState({
    posted: false,
    emailSent: false,
    firstName: "",
  })
  const separatorRef = useRef(null)
  const isCurrent = useRef(true)
  useEffect(() => {
    return () => {
      isCurrent.current = false
    }
  }, [])
  const scrollToSeparator = () => {
    window.scrollTo(0, separatorRef.current.offsetTop)
  }
  return (
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
                data.contentfulPage.body.json,
                {
                  renderNode: {
                    [BLOCKS.PARAGRAPH]: (node, children) => <P>{children}</P>,
                  },
                }
              )}
            </DetailsContainer>
          </InformationContainer>
          <Separator />
          <ColouredContainer>
            <H2>GET IN TOUCH</H2>
            <FormFlexContainer>
              <FormContainer>
                {!status.posted && (
                  <Form onSubmit={formik.handleSubmit}>
                    <FormControlItem>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                      />
                      {formik.touched.firstName && (
                        <CustomErrorMessage>
                          {formik.errors.firstName}
                        </CustomErrorMessage>
                      )}
                    </FormControlItem>
                    <FormControlItem>
                      <Input
                        id="surname"
                        name="surname"
                        type="text"
                        placeholder="Surname"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.surname}
                      />
                      {formik.touched.surname && (
                        <CustomErrorMessage>
                          {formik.errors.surname}
                        </CustomErrorMessage>
                      )}
                    </FormControlItem>
                    <FormControlItem>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && (
                        <CustomErrorMessage>
                          {formik.errors.email}
                        </CustomErrorMessage>
                      )}
                    </FormControlItem>
                    <FormControlItem>
                      <TextArea
                        id="message"
                        name="message"
                        placeholder="Message"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                      />
                      {formik.touched.message && (
                        <CustomErrorMessage>
                          {formik.errors.message}
                        </CustomErrorMessage>
                      )}
                    </FormControlItem>
                    <Button type="submit">Send email</Button>
                  </Form>
                )}
                <FormResponseContainer>
                  {loading && <Spinner />}
                  <p ref={separatorRef}>
                    {status.posted && status.emailSent && (
                      <>
                        Thank you {status.firstName} for your message. We will
                        respond to you as soon as possible
                      </>
                    )}
                    {status.posted && !status.emailSent && (
                      <>
                        Sorry {status.firstName} there was a server error,
                        please try again or if the issue persists please call.
                      </>
                    )}
                  </p>
                </FormResponseContainer>
              </FormContainer>
              <ImageContainer>
                <p>
                  This is for questions and inquiries only. If you would like to
                  book an appointment please go{" "}
                  <Link to="/book-an-appointment/">here</Link>. Thank you.{" "}
                </p>
                <Img
                  fluid={data.contentfulAsset.fluid}
                  alt={data.contentfulAsset.title}
                />
              </ImageContainer>
            </FormFlexContainer>
          </ColouredContainer>
        </MainContainer>
      </div>
    </>
  )
}

export default ContactUsPage

export const query = graphql`
  query ContactUs {
    contentfulPage(title: { eq: "Contact Us" }) {
      body {
        json
      }
    }
    imageSharp(fixed: { originalName: { eq: "facebook_logo.png" } }) {
      fixed(width: 30, height: 30) {
        ...GatsbyImageSharpFixed_withWebp
      }
    }
    contentfulAsset(title: { eq: "reception-contact-us" }) {
      fluid {
        ...GatsbyContentfulFluid_withWebp
      }
      title
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
  flex: 1 1 320px;
  margin: 0.5rem 5px;
  padding: 10px;
`
const ColouredContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  background: #f6f6f6;
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
const Form = styled.form`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const P = styled.p`
  margin-bottom: 10px;
`
const H2 = styled.h2`
  margin: 5px 1rem;
  text-align: center;
`
const FormFlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`
const ImageContainer = styled.div`
  flex: 1 1 320px;
  margin: 0 5px;
  padding: 10px;
`
const FormResponseContainer = styled.div`
  display: flex;
  justify-content: center;
`
