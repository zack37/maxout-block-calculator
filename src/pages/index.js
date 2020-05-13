import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Calcualtor from '../components/calculator/Calculator'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Calcualtor />
  </Layout>
)

export default IndexPage
