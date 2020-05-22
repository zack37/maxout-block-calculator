import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import createTheme from './theme'

const App = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createTheme(prefersDarkMode), [prefersDarkMode])

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

App.propTypes = {
  children: PropTypes.any,
}

export default App
