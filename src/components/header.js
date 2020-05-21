import React from 'react'
import {Link as GatsbyLink} from 'gatsby'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary,
  },
  brand: {
    textDecoration: 'none',
    flexGrow: 1,
    color: theme.palette.text.primary,
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

const Header = ({siteTitle}) => {
  const classes = useStyles()

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <Link
          to="/"
          component={GatsbyLink}
          variant="h5"
          color="textPrimary"
          underline="none"
        >
          {siteTitle}
        </Link>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
