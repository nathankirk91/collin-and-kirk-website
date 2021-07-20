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
  const handleOpenDetail =() => {
      if(!cardOpened){
        document.body.style.overflow = 'hidden';
        setCardOpened(true)
      }
  }
  const handleCloseDetail = () => {
    document.body.style.overflow = 'unset';
    setCardOpened(false)
  }
  return (
    <MainContainer
      onClick={handleOpenDetail}
    >
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

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 235px;
  padding: 0.5rem;
  margin: 0.5rem;
  border: 1px gray solid;
  box-shadow: 0px 0px;
  transition: box-shadow 150ms linear;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 3px black;
  }
`
const ImageContainer = styled.div`
  width: 150px;
  & .gatsby-image-wrapper {
    border-radius: 50%;
  }
`