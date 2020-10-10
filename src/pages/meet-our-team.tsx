import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"

type DataProps = {
  allContentfulTeam: {
    nodes: {
      fullName: string
      title: string
      yearsInPractice: number
      about: {
        about: string
      }
      profilePicture: {
        fluid: object
      }
    }
  }
}

const MeetOurTeamPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const team = data.allContentfulTeam.nodes
  return (
    <>
      <SEO title="Meet Our Team" />
      {team.map(member => (
        <div>
          <h2>{member.fullName}</h2>
          <h4>{member.title}</h4>
          <p>{member.about.about}</p>
          <div style={{ maxWidth: "300px" }}>
            <Img fluid={member.profilePicture.fluid} alt={member.fullName} />
          </div>
        </div>
      ))}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export default MeetOurTeamPage

export const query = graphql`
  query MyQuery {
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
