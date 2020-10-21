import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import styled, { css } from "styled-components"

import SEO from "../components/seo"
import { EyeConditionsQuery } from "../../graphql-types"
import Separator from "../components/Separator"

const truncate = (str: string, max: number, suffix: string): string =>
  str.length < max
    ? str
    : `${str.substr(
        0,
        str.substr(0, max - suffix.length).lastIndexOf(" ")
      )}${suffix}`

const leftPos = (index: number): boolean =>
  (index + 1) % 2 === 0 ? true : false

const EyeConditionsPage: React.FC<PageProps<EyeConditionsQuery>> = ({
  data,
}) => {
  const eyeConditions = data.allContentfulEyeCondition.nodes
  return (
    <>
      <SEO title="Eye Conditions" />
      <div>
        <h2>Eye Conditions</h2>
        <p>
          Think you are suffering from a particular eye condition, here at
          Collin & Kirk will be able to help you out. Here you can read up on
          many different eye conditions, and how to deal with said eye
          conditions.
        </p>
        <Separator />
        {eyeConditions.map((condition, index) => (
          <EyeConditionContainer key={condition.id}>
            <H3 leftPos={leftPos(index)} mobile="lg">
              {condition.title}
            </H3>
            <P leftPos={leftPos(index)} mobile="lg">
              {truncate(condition.excerpt.excerpt, 300, "...")}
            </P>
            <ButtonContainer leftPos={leftPos(index)} mobile="lg">
              <Link to={condition.slug}>
                <ReadMoreButton>READ MORE</ReadMoreButton>
              </Link>
            </ButtonContainer>
            <Separator />
          </EyeConditionContainer>
        ))}
      </div>
    </>
  )
}

export default EyeConditionsPage

export const data = graphql`
  query EyeConditions {
    allContentfulEyeCondition {
      nodes {
        id
        title
        slug
        excerpt {
          excerpt
        }
      }
    }
  }
`
interface Position {
  leftPos: boolean
  mobile: string
}
const EyeConditionContainer = styled.div`
  margin: 1rem 0;
`
const ButtonContainer = styled.div<Position>`
  display: flex;
  justify-content: ${props => (props.leftPos ? `flex-end` : `flex-start`)};
  ${props =>
    props.theme.mediaQuery[props.mobile](css`
      justify-content: center;
    `)}
`
const P = styled.p<Position>`
  text-align: ${props => (props.leftPos ? `left` : `right`)};
  ${props =>
    props.theme.mediaQuery[props.mobile](css`
      text-align: left;
    `)}
`
const H3 = styled.h3<Position>`
  text-align: ${props => (props.leftPos ? `left` : `right`)};
  ${props =>
    props.theme.mediaQuery[props.mobile](css`
      text-align: left;
    `)}
`
const ReadMoreButton = styled.div`
  margin-bottom: 1rem;
  color: white;
  background: black;
  cursor: pointer;
  padding: 0.25rem 1rem;
  box-shadow: 0px 0px;
  transition: box-shadow 150ms linear;
  &:hover,
  &:active {
    box-shadow: 0 0 3px black;
  }
`