import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'

export default (prefersDarkMode) => {
  const theme = createMuiTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
      primary: purple,
      secondary: {
        main: green['400'],
      },
    },
  })

  return responsiveFontSizes(theme)
}
