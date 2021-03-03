/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'

import Header from './header'

const useStyles = makeStyles((theme) => ({
  main: {
    margin: '0 auto',
    maxWidth: 960,
    padding: '2rem 1.0875rem 1.45rem',
  },
  footer: {
    padding: `${theme.spacing(3)}px 0px`,
  },
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          title
          version
        }
      }
    }
  `)

  return (
    <>
      <CssBaseline />
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className={classes.main}>
        <main>{children}</main>
        <footer className={classes.footer}>
          Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
          <span>v{data.site.siteMetadata.version}</span>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
