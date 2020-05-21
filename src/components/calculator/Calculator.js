import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

import Results from './Results'

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
// uses 5/100 rather than 0.05 because js rounding issues
const percentSteps = Array.from({length: 20}, (_, i) => ((i + 1) * 5) / 100)
const fiveByFiveSteps = [0.65, 0.65, 0.7, 0.7, 0.75]
const fiveByThreeSteps = [0.75, 0.75, 0.8, 0.8, 0.85]
const tenByTenSteps = Array.from({length: 10}, () => 0.5)
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
    padding: theme.spacing(1),
  },
  tableHeader: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
}))

export default () => {
  const [weight, setWeight] = useState(135)
  const [factor, setFactor] = useState(5)
  const [roundingMode, setRoundingMode] = useState(ROUNDING_MODES.UP)
  const classes = useStyles()
  const round = roundTo(factor, roundingMode)

  const handleWeightChange = ({target: {value}}) => {
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
        <Grid item container xs={12} md={4}>
          <Paper className={classes.paper}>
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
          </Paper>
        </Grid>
        <Grid item container xs={12} md={4}>
          <Paper className={classes.paper}>
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
              {factors.map((x) => (
                <MenuItem key={x} value={x}>
                  <Typography>{x}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </Paper>
        </Grid>
        <Grid item container xs={12} md={4}>
          <Paper className={classes.paper}>
            <TextField
              fullWidth
              select
              id="rounding-mode-input"
              label="Rounding Mode"
              value={roundingMode}
              variant="outlined"
              helperText="Select how the numbers should round"
              onChange={(event) => setRoundingMode(event.target.value)}
            >
              {Object.keys(roundingModeFnMap).map((x) => (
                <MenuItem key={x} value={x}>
                  <Typography>{x}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </Paper>
        </Grid>
      </Grid>
      <Grid item container spacing={2} xs={12}>
        <Grid item container xs={12} sm={6} md={4}>
          <Results
            title="5×5"
            headerLabels={['Set', '%', 'Weight']}
            values={fiveByFiveSteps.map((x, i) => [
              i + 1,
              round(x * 100),
              round(weight * x),
            ])}
          />
        </Grid>
        <Grid item container xs={12} sm={6} md={4}>
          <Results
            title="5×3"
            headerLabels={['Set', '%', 'Weight']}
            values={fiveByThreeSteps.map((x, i) => [
              i + 1,
              round(x * 100),
              round(weight * x),
            ])}
          />
        </Grid>
        <Grid item container xs={12} md={4}>
          <Results
            title="10×10"
            headerLabels={['Set', 'Weight']}
            values={tenByTenSteps.map((x, i) => [i + 1, round(weight * x)])}
          />
        </Grid>
        <Grid item container xs={12}>
          <Results
            title="Reference"
            headerLabels={['%', 'Weight']}
            values={percentSteps.map((x) => [
              `${round(x * 100)}%`,
              round(weight * x),
            ])}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
