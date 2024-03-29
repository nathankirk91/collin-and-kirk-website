import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
// import { loadStripe } from "@stripe/stripe-js"
// import { useMutation } from "@apollo/client"

import SEO from "../components/seo"
import {
  LayoutImgLeft,
  LayoutImgRight,
} from "../components/home-page-layout/Layout"
import Separator from "../components/Separator"
import Backdrop from "../components/backdrop"
import Modal from "../components/modal/Modal"
import { BLOCKS } from "@contentful/rich-text-react-renderer/node_modules/@contentful/rich-text-types"

// import { CREATE_CHECKOUT_SESSION } from "../apollo/cart"

// const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_API)

const IndexPage: React.FC<PageProps<GatsbyTypes.HomePageImagesQuery>> = ({
  data,
}) => {
  // const [creatCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION)
  const [showModal, setShowModal] = React.useState(false)
  React.useEffect(() => {
    const localAnnDate = localStorage.getItem("announcement_date")
    if (localAnnDate !== data.contentfulAnnouncement.date) {
      setShowModal(true)
      localStorage.setItem(
        "announcement_date",
        data.contentfulAnnouncement.date
      )
    }
  }, [])

  const closeModal = () => {
    document.body.style.overflow = "unset"
    setShowModal(false)
  }
  const openModal = () => {
    document.body.style.overflow = "hidden"
    setShowModal(true)
  }
  // const handleClick = async event => {
  //   event.preventDefault()
  //   // Get Stripe.js instance
  //   const stripe = await stripePromise

  //   // Call your backend to create the Checkout Session
  //   const response = await creatCheckoutSession({
  //     variables: {
  //       email: "nathan.kirk91@gmail.com",
  //       cart: [
  //         {
  //           priceId: "price_1HeDFpJVqkkYVOy9PXJXBDH2",
  //           qty: 2,
  //         },
  //       ],
  //     },
  //   })

  //   console.log(response)

  //   // When the customer clicks on the button, redirect them to Checkout.
  //   const result = await stripe.redirectToCheckout({
  //     sessionId: response.data.createCheckoutSession.checkoutSessionId,
  //   })

  //   if (result.error) {
  //     // If `redirectToCheckout` fails due to a browser or network
  //     // error, display the localized error message to your customer
  //     // using `result.error.message`.
  //   }
  // }

  const images = data
  console.log(data.contentfulAnnouncement.body)
  return (
    <>
      <SEO title="Optometry & Personalised Eye Care" />
      {showModal && (
        <>
          <Backdrop onClick={closeModal} />
          <Modal handleClose={closeModal}>
            <h2>{data.contentfulAnnouncement.title}</h2>
            {renderRichText({
              ...data.contentfulAnnouncement.body,
              references: data.contentfulAnnouncement.body.references,
            },{renderNode: {
              [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const { gatsbyImageData } = node.data.target
                return(<GatsbyImage style={{borderRadius: "8px", marginBottom: "16px"}} image={gatsbyImageData} alt={"Important announcement"}/>)
              },
            }})}
          </Modal>
        </>
      )}
      <Announcement onClick={openModal}>📢 ANNOUNCEMENTS</Announcement>
      <Separator />
      {/* <button onClick={handleClick}>Buy</button>
      <Separator /> */}
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
        contact lenses. We have an extensive range of fashion frames including
        brands such as: Oroton, Carrera, Burberry, RayBan, Kate Spade, Ted Baker, Prodesign, amongst others."
        img={images.glasses}
      />
      <Separator />
      {/* <H2>WE ACCEPT</H2> */}
      <CentreTextContainer>
        <p style={{ fontStyle: "italic", textAlign: "center" }}>
          We can process claims in the Practice for ALL Health Funds
        </p>
      </CentreTextContainer>
      <ImagesContainer>
        <ImgContainer>
          <GatsbyImage
            image={images.medicare.gatsbyImageData}
            alt={images.medicare.title}
          />
        </ImgContainer>
        <ImgContainer>
          <GatsbyImage
            image={images.hicaps.gatsbyImageData}
            alt={images.hicaps.title}
          />
        </ImgContainer>
      </ImagesContainer>
      <CentreTextContainer>
        <p style={{ fontWeight: "bold", textAlign: "center" }}>
          ALL Health Funds welcome
        </p>{" "}
      </CentreTextContainer>
    </>
  )
}

export default IndexPage

export const query = graphql`
  query HomePageImages {
    contentfulAnnouncement {
      title
      date(formatString: "DD-MM-YYYY")
      body {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImageData
          }
        }
      }
    }
    reception: contentfulAsset(title: { eq: "reception-waiting-room" }) {
      title
      gatsbyImageData(placeholder: DOMINANT_COLOR)
    }
    glasses: contentfulAsset(title: { eq: "glasses-display" }) {
      title
      gatsbyImageData(placeholder: DOMINANT_COLOR)
    }
    shopfront: contentfulAsset(title: { eq: "shopfront" }) {
      title
      gatsbyImageData(placeholder: DOMINANT_COLOR)
    }
    practiceLogo: contentfulAsset(title: { eq: "practice-logo" }) {
      title
      gatsbyImageData(placeholder: DOMINANT_COLOR)
    }
    medicare: contentfulAsset(title: { eq: "medicare" }) {
      title
      gatsbyImageData(width: 147, height: 38, placeholder: NONE)
    }
    hicaps: contentfulAsset(title: { eq: "hicaps" }) {
      title
      gatsbyImageData(width: 165, height: 29, placeholder: NONE)
    }
  }
`
const CentreTextContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
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
const Announcement = styled.h3`
  text-align: center;
  margin: 1rem;
  margin-top: 0;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`
