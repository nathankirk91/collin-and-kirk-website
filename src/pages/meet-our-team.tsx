import React from "react"
import { PageProps, graphql } from "gatsby"

import SEO from "../components/seo"
import TeamMemberSummary from "../components/team/teamMemeberSummary"
import styled from "styled-components"

const MeetOurTeamPage: React.FC<PageProps<GatsbyTypes.TeamQuery>> = ({ data }) => {
  const team = data.allContentfulTeam.nodes
  return (
    <>
      <SEO title="Meet Our Team" description="Meet our team, your local small business optometrists."/>
      <MainContainer>
        {team.map(member => (
          <TeamMemberSummary
            key={member.fullName}
            fullName={member.fullName}
            about={member.about.about}
            title={member.title}
            gatsbyImageData={member.profilePicture.gatsbyImageData}
            yearsInPractice={member.yearsInPractice}
          />
        ))}
      </MainContainer>
    </>
  )
}

export default MeetOurTeamPage

export const query = graphql`
  query Team {
    allContentfulTeam(sort: { fields: createdAt, order: ASC }) {
      nodes {
        fullName
        title
        yearsInPractice
        about {
          about
        }
        profilePicture {
          gatsbyImageData(width: 300)
        }
      }
    }
  }
`
const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
