import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'

import Row from './Row'

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    flex: 1,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  tableHead: {
    padding: theme.spacing(1),
  },
}))

const getGridAlignment = (i, array) => {
  if (i === 0) {
    return 'flex-start'
  }

  if (i === array.length - 1) {
    return 'flex-end'
  }

  return 'center'
}

const Results = memo(({ title, headerLabels, values, barWeight }) => {
  const classes = useStyles()

  return (
    <Grid container xs={12} direction="column" component={Paper}>
      <Accordion defaultExpanded elevation={0} style={{ flex: 1 }}>
        <AccordionSummary>
          <Grid container spacing={2} xs={12}>
            <Toolbar className={classes.tableHeader}>
              <Typography variant="h5">{title}</Typography>
            </Toolbar>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          {/* "Table" head */}
          <Grid container xs={12}>
            <Grid container item className={classes.tableHead} xs={12}>
              {headerLabels.map((label, i) => (
                <Grid
                  key={label}
                  container
                  item
                  xs={12 / headerLabels.length}
                  justify={getGridAlignment(i, headerLabels)}
                >
                  <Typography>{label}</Typography>
                </Grid>
              ))}
            </Grid>
            {/* "Table" body */}
            <Grid item xs={12}>
              {values.map((row) => (
                <Row
                  key={JSON.stringify(row)}
                  row={row}
                  barWeight={barWeight}
                />
              ))}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  )
})

Results.propTypes = {
  title: PropTypes.string.isRequired,
  headerLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.array).isRequired,
  barWeight: PropTypes.number.isRequired,
}

export default Results
