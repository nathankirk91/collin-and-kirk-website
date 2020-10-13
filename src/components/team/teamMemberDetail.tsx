import React from "react"
import styled, {css} from "styled-components"
import Img from "gatsby-image"

import { ContentfulFluid } from "../../../graphql-types"
interface TeamMemberProps {
  fullName: string
  title: string
  about: string
  handleCloseDetail: ()=>void
  fluid: Pick<
    ContentfulFluid,
    | "base64"
    | "aspectRatio"
    | "src"
    | "srcSet"
    | "srcWebp"
    | "srcSetWebp"
    | "sizes"
  >
}

const TeamMemberDetail: React.FC<TeamMemberProps> = ({
  fullName,
  title,
  about,
  fluid,
  handleCloseDetail
}) => {
  return (
    <MainContainer varWidth='md'>
      <Close onClick={handleCloseDetail}>X</Close>
      <h2>{fullName}</h2>
      <h4>{title}</h4>
      <ImageContainer>
        <Img fluid={fluid} alt={fullName} />
      </ImageContainer>
      <p>{about}</p>
    </MainContainer>
  )
}

export default TeamMemberDetail
interface MainContainerProps {
    readonly varWidth: string
}
const MainContainer = styled.div<MainContainerProps>`
  position: fixed;
  background-color: white;
  top: 30px;
  left: calc((100% - 30rem) / 2);
  width: 30rem;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  max-height: 700px;
  overflow: auto;
  ${props => props.theme.mediaQuery[props.varWidth](css`
    width: 90%;
    left: 5%;
    max-height: 504px;
  `)}
`

const ImageContainer = styled.div`
  width: 150px;
  & img {
    border-radius: 50%;
  }
`
const Close = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  border: none;
  background: none;
  cursor: pointer;
  outline:none;
`
