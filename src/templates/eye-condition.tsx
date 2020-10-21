import { graphql, PageProps } from "gatsby"
import React from "react"
import styled from "styled-components"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import { EyeConditionPageQuery } from "../../graphql-types"
import Separator from "../components/Separator"
import AspectRatio from "../components/aspect-ratio/AspectRatio"

const getYouTubeId = (url: string): string => {
  if (!url) return ""
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : null
}

const EyeCondition: React.FC<PageProps<EyeConditionPageQuery>> = ({ data }) => {
  const eyeConditon = data.contentfulEyeCondition
  let youTubeEm
  if (eyeConditon.youTubeUrl) {
    const youTubeId = getYouTubeId(eyeConditon.youTubeUrl)
    youTubeEm = `https://www.youtube.com/embed/${youTubeId}`
  }

  return (
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
      {documentToReactComponents(eyeConditon.body.json)}
      
    </div>
  )
}

export default EyeCondition

export const query = graphql`
  query EyeConditionPage($slug: String!) {
    contentfulEyeCondition(slug: { eq: $slug }) {
      title
      youTubeUrl
      body {
        json
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
