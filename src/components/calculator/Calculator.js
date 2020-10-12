import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Results from './Results'
import tableConfig from './table-config.json'

const factors = [2.5, 5]
const ROUNDING_MODES = {
  UP: 'up',
  DOWN: 'down',
  NEAREST: 'nearest',
}
const roundingModeFnMap = {
  [ROUNDING_MODES.UP]: Math.ceil,
  [ROUNDING_MODES.DOWN]: Math.floor,
  [ROUNDING_MODES.NEAREST]: Math.round,
}
const roundTo = (multiple, roundingMode = 'up') => (x) =>
  roundingModeFnMap[roundingMode](x / multiple) * multiple

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  paper: {
    display: 'flex',
    flex: 1,
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  tableHeader: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  expansionSummaryContent: {
    justifyContent: 'flex-end',
  },
}))

const factorOptions = factors.map((x) => (
  <MenuItem key={x} value={x}>
    <Typography>{x}</Typography>
  </MenuItem>
))
const roundingModeOptions = Object.keys(roundingModeFnMap).map((x) => (
  <MenuItem key={x} value={x}>
    <Typography>{x}</Typography>
  </MenuItem>
))

const Calculator = () => {
  const [weight, setWeight] = useState(135)
  const [barWeight, setBarWeight] = useState(45)
  const [factor, setFactor] = useState(5)
  const [roundingMode, setRoundingMode] = useState(ROUNDING_MODES.UP)
  const classes = useStyles()
  const round = roundTo(factor, roundingMode)

  const handleBarWeightChange = ({ target: { value } }) => {
    if (value === '') {
      return setBarWeight(value)
    }

    const parsedValue = Number.parseInt(value || 0, 10)
    setBarWeight(parsedValue)
  }

  const handleWeightChange = ({ target: { value } }) => {
    if (value === '') {
      return setWeight(value)
    }

    const parsedValue = Number.parseInt(value || 0, 10)
    const clampedValue = Math.max(0, Math.min(parsedValue, 1200))
    setWeight(clampedValue)
  }

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item container spacing={2} xs={12}>
        <Paper className={classes.paper}>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="weight-input"
                label="Weight"
                type="number"
                value={weight}
                variant="outlined"
                helperText="The amount of weight you plan on maxing out"
                onChange={handleWeightChange}
              />
            </Grid>
            <Grid item container xs={12} justify="center">
              <Accordion
                elevation={0}
                style={{ flex: 1, justifyContent: 'flex-end' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  classes={{ content: classes.expansionSummaryContent }}
                >
                  <Typography align="right">Advanced</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid item container spacing={1} xs={12}>
                    <Grid item sm={4} xs={12}>
                      <TextField
                        fullWidth
                        id="bar-weight-input"
                        label="Bar Weight"
                        value={barWeight}
                        variant="outlined"
                        helperText="Select the weight of the bar you're using"
                        onChange={handleBarWeightChange}
                      />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <TextField
                        fullWidth
                        select
                        id="factor-input"
                        label="Factor"
                        value={factor}
                        variant="outlined"
                        helperText="Select the smallest amount of weight you can add"
                        onChange={(event) => setFactor(event.target.value)}
                      >
                        {factorOptions}
                      </TextField>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <TextField
                        fullWidth
                        select
                        id="rounding-mode-input"
                        label="Rounding Mode"
                        value={roundingMode}
                        variant="outlined"
                        helperText="Select how the numbers should round"
                        onChange={(event) =>
                          setRoundingMode(event.target.value)
                        }
                      >
                        {roundingModeOptions}
                      </TextField>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item container spacing={2} xs={12}>
        {tableConfig.map((config) => {
          const headerLabels = [
            ...(config.showSetNumbers ? ['Set'] : []),
            ...(config.showPercentages ? ['%'] : []),
            'Weight',
          ]
          const values = config.steps.map((x, i) => [
            ...(config.showSetNumbers ? [i + 1] : []),
            ...(config.showPercentages ? [`${Math.floor(x * 100)}%`] : []),
            round(weight * x),
          ])

          return (
            <Grid key={config.title} container item xs={12}>
              <Results
                title={config.title}
                headerLabels={headerLabels}
                barWeight={barWeight}
                values={values}
              />
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default Calculator
