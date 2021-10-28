import React from "react"
import styled from "styled-components"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

import TeamMemberDetail from "./teamMemberDetail"
import Backdrop from "../backdrop"
interface TeamMemberProps {
  fullName: string
  title: string
  about: string
  yearsInPractice: number
  gatsbyImageData: IGatsbyImageData
}

const TeamMemberSummary: React.FC<TeamMemberProps> = ({
  fullName,
  title,
  about,
  gatsbyImageData,
  yearsInPractice,
}) => {
  const [cardOpened, setCardOpened] = React.useState(false)
  const handleOpenDetail = () => {
    if (!cardOpened) {
      document.body.style.overflow = "hidden"
      setCardOpened(true)
    }
  }
  const handleCloseDetail = () => {
    document.body.style.overflow = "unset"
    setCardOpened(false)
  }
  return (
    <MainContainer onClick={handleOpenDetail}>
      <h2>{fullName}</h2>
      <h4>{title}</h4>
      <ImageContainer>
        <GatsbyImage image={gatsbyImageData} alt={fullName} />
      </ImageContainer>
      {cardOpened && <Backdrop onClick={handleCloseDetail} />}
      {cardOpened && (
        <TeamMemberDetail
          title={title}
          about={about}
          fullName={fullName}
          gatsbyImageData={gatsbyImageData}
          yearsInPractice={yearsInPractice}
          handleCloseDetail={handleCloseDetail}
        />
      )}
    </MainContainer>
  )
}

export default TeamMemberSummary

const MainContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 235px;
  padding: 0.5rem;
  margin: 0.5rem;
  border: 1px gray solid;
  border-radius: 4px;
  box-shadow: 0px 0px;
  transition: box-shadow 150ms linear;
  cursor: pointer;
  &:hover,
  &:focus {
    box-shadow: 0.7px 0.7px 2.2px rgba(0, 0, 0, 0.014),
      1.7px 1.7px 5.3px rgba(0, 0, 0, 0.022),
      3.1px 3.1px 10px rgba(0, 0, 0, 0.03),
      5.6px 5.6px 17.9px rgba(0, 0, 0, 0.038),
      10.4px 10.4px 33.4px rgba(0, 0, 0, 0.049),
      25px 25px 80px rgba(0, 0, 0, 0.07);
  }
`
const ImageContainer = styled.div`
  width: 150px;
  & .gatsby-image-wrapper {
    border-radius: 50%;
  }
`
