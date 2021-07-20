import React from "react"
import styled, { css } from "styled-components"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

interface HomePageLayoutProps {
  img: {
    gatsbyImageData?: IGatsbyImageData
    title?: string
  }
  body: string
  title: string
}

export const LayoutImgLeft: React.FC<HomePageLayoutProps> = ({
  title,
  body,
  img,
}) => {
  return (
    <MainImgLeftContainer stack="lg" imgRight>
      <ImgContainer>
        <GatsbyImage image={img.gatsbyImageData} alt={img.title} />
      </ImgContainer>
      <TextContainer>
        <H2Right stack="lg">{title}</H2Right>
        <PRight stack="lg">{body}</PRight>
      </TextContainer>
    </MainImgLeftContainer>
  )
}

export const LayoutImgRight: React.FC<HomePageLayoutProps> = ({
  title,
  body,
  img,
}) => {
  return (
    <MainImgRightContainer stack="lg" imgRight>
      <TextContainer>
        <H2Left>{title}</H2Left>
        <PLeft stack="lg">{body}</PLeft>
      </TextContainer>
      <ImgContainer>
        <GatsbyImage image={img.gatsbyImageData} alt={img.title} />
      </ImgContainer>
    </MainImgRightContainer>
  )
}

interface ContainerProps {
  stack: string
  imgRight?: boolean
}
const MainImgRightContainer = styled.div<ContainerProps>`
  display: flex;
  margin: 1rem 0;
  align-items: center;
  justify-content: space-between;
  ${props =>
    props.theme.mediaQuery[props.stack](css`
      flex-direction: column;
    `)}
`
const MainImgLeftContainer = styled.div<ContainerProps>`
  display: flex;
  margin: 1rem 0;
  align-items: center;
  justify-content: space-between;
  ${props =>
    props.theme.mediaQuery[props.stack](css`
      flex-direction: column-reverse;
    `)}
`
const TextContainer = styled.div`
  flex: 0 1 60%;
`
const ImgContainer = styled.div`
  flex: 1 0 40%;
  width: 100%;
  max-width: 320px;
`
const H2Left = styled.h2`
  text-align: left;
`
const H2Right = styled.h2<ContainerProps>`
  text-align: right;
  ${props =>
    props.theme.mediaQuery[props.stack](css`
      text-align: left;
    `)}
`
const PLeft = styled.p<ContainerProps>`
  text-align: left;
  margin-right: 1rem;
  ${props =>
    props.theme.mediaQuery[props.stack](css`
      margin-left: 0rem;
    `)}
`
const PRight = styled.p<ContainerProps>`
  text-align: right;
  margin-left: 1rem;
  ${props =>
    props.theme.mediaQuery[props.stack](css`
      text-align: left;
      margin-left: 0rem;
    `)}
`
