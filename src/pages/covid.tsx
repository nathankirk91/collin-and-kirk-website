import React from "react"

import SEO from "../components/seo"

function Covid(props) {
  return (
    <>
      <SEO title="COVID-19 safe Plan" />
      <h2>COVID-19 Safe Plan</h2>
      <object
        data="https://collinandkirkapi.nathankirk.org/files/COVID%20SAFE%20PLAN.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
        style={{ height: "80vh" }}
      >
        This browser does not support PDFs. Please download the PDF to view it:
        Download PDF.
      </object>
    </>
  )
}

export default Covid
