import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"
import { TeamQuery } from "../../graphql-types"
import TeamMemberSummary from "../components/team/teamMemeberSummary"
import styled from "styled-components"

const MeetOurTeamPage: React.FC<PageProps<TeamQuery>> = ({ data }) => {
  const team = data.allContentfulTeam.nodes
  return (
    <>
      <SEO title="Meet Our Team" />
      <MainContainer>
        {team.map(member => (
          <TeamMemberSummary
            key={member.fullName}
            fullName={member.fullName}
            about={member.about.about}
            title={member.title}
            fluid={member.profilePicture.fluid}
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
          fluid(maxWidth: 300) {
            ...GatsbyContentfulFluid_withWebp
          }
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
