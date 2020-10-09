import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Calculator from '../components/calculator/Calculator'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Calculator />
  </Layout>
)

export default IndexPage
