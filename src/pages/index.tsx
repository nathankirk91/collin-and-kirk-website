import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import SEO from "../components/seo"
import { HomePageImagesQuery } from "../../graphql-types"
import {
  LayoutImgLeft,
  LayoutImgRight,
} from "../components/home-page-layout/Layout"
import Separator from "../components/Separator"

const IndexPage: React.FC<PageProps<HomePageImagesQuery>> = ({ data }) => {
  const images = data
  return (
    <>
      <SEO title="Home" />
      <LayoutImgRight
        title="WHO ARE WE?"
        body="At Collin & Kirk Optometrists, we provide professional personalised eye
        care using state of the art equipment. We monitor general eye health for
        glaucoma, cataracts and diabetes and also offer personalised eye care
        with experienced staff that have good product knowledge."
        img={images.reception}
      />
      <Separator />
      <LayoutImgLeft
        title="OUR MISSION"
        body="We aim to ensure that our clients receive the highest standards of eye
          care and advice. Taking time to build long term loyal relationships
          with our clients, we will conduct ourselves in a professional manner.
          We will maintain and extend a reputation for excellence in service and
          patient care in the optometric community ​through a commitment to
          research, development and continued education."
        img={images.shopfront}
      />
      <Separator />
      <LayoutImgRight
        title="WHAT WE OFFER"
        body="We dispense a comprehensive range of eyewear meeting the needs of
        clients of all ages within the local community and surrounds, and
        contact lenses.We have an extensive range of fashion frames include
        brands such as: Guess, Ray-ban, Dolce & Gabbana, Oroton, Sass & Bide,
        Wayne Cooper."
        img={images.glasses}
      />
      <Separator />
      <H2>WE ACCEPT</H2>
      <ImagesContainer>
        <ImgContainer>
          <Img fixed={images.medicare.fixed} alt={images.medicare.title} />
        </ImgContainer>
        <ImgContainer>
          <Img fixed={images.medibank.fixed} alt={images.medibank.title} />
        </ImgContainer>
        <ImgContainer>
          <Img
            fixed={images.ausralianUnity.fixed}
            alt={images.ausralianUnity.title}
          />
        </ImgContainer>
        <ImgContainer>
          <Img fixed={images.bupa.fixed} alt={images.bupa.title} />
        </ImgContainer>
      </ImagesContainer>
    </>
  )
}

export default IndexPage

export const query = graphql`
  query HomePageImages {
    reception: contentfulAsset(title: { eq: "reception-waiting-room" }) {
      title
      fluid {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    glasses: contentfulAsset(title: { eq: "glasses-display" }) {
      title
      fluid {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    shopfront: contentfulAsset(title: { eq: "shopfront" }) {
      title
      fluid {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    practiceLogo: contentfulAsset(title: { eq: "practice-logo" }) {
      title
      fluid {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    medicare: contentfulAsset(title: { eq: "medicare" }) {
      title
      fixed(width: 147, height: 38) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
    bupa: contentfulAsset(title: { eq: "bupa" }) {
      title
      fixed(width: 108, height: 65) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
    medibank: contentfulAsset(title: { eq: "medi-bank" }) {
      title
      fixed(width: 75, height: 75) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
    ausralianUnity: contentfulAsset(title: { eq: "ausralian-unity" }) {
      title
      fixed(width: 122, height: 54) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
  }
`

const H2 = styled.h2`
  text-align: center;
  margin: 1rem;
`
const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
const ImgContainer = styled.div`
  margin: 0 0.5rem;
`
