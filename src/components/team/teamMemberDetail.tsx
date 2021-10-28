import React from "react"
import styled, { css } from "styled-components"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

import toHTML from "../../helper/toHTML"
interface TeamMemberProps {
  fullName: string
  title: string
  about: string
  yearsInPractice: number
  handleCloseDetail: () => void
  gatsbyImageData: IGatsbyImageData
}

const TeamMemberDetail: React.FC<TeamMemberProps> = ({
  fullName,
  title,
  about,
  gatsbyImageData,
  yearsInPractice,
  handleCloseDetail,
}) => {
  const [yearCounter, setYearCounter] = React.useState(0)
  let timerRef = React.useRef(0)
  React.useEffect(() => {
    timerRef.current = window.setInterval(
      () => setYearCounter(prevState => prevState + 1),
      1000 / yearsInPractice
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
        <GatsbyImage image={gatsbyImageData} alt={fullName} />
      </ImageContainer>
      <About dangerouslySetInnerHTML={{ __html: toHTML(about) }} />
      <YearsInPracticeHeading>Years In Practice</YearsInPracticeHeading>
      <YearsInPracticeNum>{yearCounter}</YearsInPracticeNum>
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
  border-radius: 5px;
  top: 30px;
  left: calc((100% - 30rem) / 2);
  width: 30rem;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  max-height: calc(100vh - 100px);
  overflow: auto;
  ${props =>
    props.theme.mediaQuery[props.varWidth](css`
      width: 80%;
      left: 10%;
    `)}
`

const ImageContainer = styled.div`
  width: 150px;
  & .gatsby-image-wrapper {
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
