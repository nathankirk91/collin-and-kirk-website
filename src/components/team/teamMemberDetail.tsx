import React from "react"
import styled, { css } from "styled-components"
import Img from "gatsby-image"
import remark from "remark"
import remarkHTML from "remark-html"

import { ContentfulFluid } from "../../../graphql-types"
interface TeamMemberProps {
  fullName: string
  title: string
  about: string
  yearsInPractice: number
  handleCloseDetail: () => void
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
  yearsInPractice,
  handleCloseDetail,
}) => {
  const [yearCounter, setYearCounter] = React.useState(0)
  let timerRef = React.useRef(0)
  React.useEffect(() => {
    timerRef.current = setInterval(
      () => setYearCounter(prevState => prevState + 1),
      100
    )
    return () => {
      clearInterval(timerRef.current)
    }
  }, [])
  if (yearsInPractice <= yearCounter) {
    clearInterval(timerRef.current)
  }
  return (
    <MainContainer varWidth="md">
      <Close onClick={handleCloseDetail}>X</Close>
      <h2>{fullName}</h2>
      <h4>{title}</h4>
      <ImageContainer>
        <Img fluid={fluid} alt={fullName} />
      </ImageContainer>
      <About dangerouslySetInnerHTML={{ __html: toHTML(about) }} />
      <YearsInPracticeHeading>Years In Practice</YearsInPracticeHeading>
      <YearsInPracticeNum>{yearCounter}</YearsInPracticeNum>
    </MainContainer>
  )
}

export default TeamMemberDetail

const toHTML = (value: string): string =>
  remark().use(remarkHTML).processSync(value).toString()

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
  max-height: calc(100vh - 2rem);
  overflow: auto;
  ${props =>
    props.theme.mediaQuery[props.varWidth](css`
      width: 90%;
      left: 5%;
      /* max-height: 504px; */
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
  outline: none;
`
const About = styled.div`
  margin-top: 1rem;
`
const YearsInPracticeHeading = styled.h2`
  padding: 0;
  margin: 0;
`
const YearsInPracticeNum = styled.h1`
  margin: 0;
  padding: 0;
  padding-bottom: 1rem;
`
