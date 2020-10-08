import React from "react"
import { PageProps, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

type DataProps = {
  site: {
    buildTime: string
  }
}

const IndexPage: React.FC<PageProps<DataProps>> = () => (
  <Layout>
    <SEO title="Home" />
    <div>
      <h2>WHO ARE WE?</h2>
      <p>
        At Collin & Kirk Optometrists, we provide professional personalised eye
        care using state of the art equipment. We monitor general eye health for
        glaucoma, cataracts and diabetes and also offer personalised eye care
        with experienced staff that have good product knowledge.
      </p>
    </div>
    <div>
      <h2>OUR MISSION</h2>
      <p>
        We aim to ensure that our clients receive the highest standards of eye
        care and advice. Taking time to build long term loyal relationships with
        our clients, we will conduct ourselves in a professional manner. We will
        maintain and extend a reputation for excellence in service and patient
        care in the optometric community ​through a commitment to research,
        development and continued education.
      </p>
    </div>
    <div>
      <h2>WHAT WE OFFER</h2>
      <p>
        ​We dispense a comprehensive range of eyewear meeting the needs of
        clients of all ages within the local community and surrounds, and
        contact lenses.We have an extensive range of fashion frames include
        brands such as: Guess, Ray-ban, Dolce & Gabbana, Oroton, Sass & Bide,
        Wayne Cooper.
      </p>
    </div>
  </Layout>
)

export default IndexPage
