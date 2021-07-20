import { graphql, PageProps } from "gatsby"
import React from "react"
import styled from "styled-components"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import AspectRatio from "../components/aspect-ratio/AspectRatio"
import SEO from "../components/seo"

const getYouTubeId = (url: string): string => {
  if (!url) return ""
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : null
}

const EyeCondition: React.FC<PageProps<GatsbyTypes.EyeConditionPageQuery>> = ({ data }) => {
  const eyeConditon = data.contentfulEyeCondition
  let youTubeEm
  if (eyeConditon.youTubeUrl) {
    const youTubeId = getYouTubeId(eyeConditon.youTubeUrl)
    youTubeEm = `https://www.youtube.com/embed/${youTubeId}`
  }

  return (
    <>
      <SEO title={eyeConditon.title} />
      <div>
        <h1>{eyeConditon.title}</h1>
        {eyeConditon.youTubeUrl && (
          <>
            <YouTubeContainer>
              <AspectRatio ratio={16 / 9}>
                <YouTubeIframe src={youTubeEm} title={eyeConditon.title} />
              </AspectRatio>
            </YouTubeContainer>
          </>
        )}
        {renderRichText({...eyeConditon.body, references: null})}
      </div>
    </>
  )
}

export default EyeCondition

export const query = graphql`
  query EyeConditionPage($slug: String!) {
    contentfulEyeCondition(slug: { eq: $slug }) {
      title
      youTubeUrl
      body {
        raw
      }
    }
  }
`
const YouTubeContainer = styled.div`
  margin: 1rem auto;
  max-width: 575px;
`
interface YouTubeProps {
  src: string
  title: string
}
const YouTubeIframe = styled.iframe.attrs<YouTubeProps>(props => {
  return {
    allowfullscreen: true,
    src: props.src,
    title: props.title,
  }
})`
  width: 100%;
  height: 100%;
  border: 0;
`
