import {createMuiTheme} from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'

export default prefersDarkMode => createMuiTheme({
  palette: {
    type: prefersDarkMode ? 'dark' : 'light',
    primary: purple,
  },
  
})
