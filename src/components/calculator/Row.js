import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grid from '@material-ui/core/Grid'

import { createPlateLabel } from './helpers'

const useStyles = makeStyles((theme) => ({
  row: {
    padding: theme.spacing(1),
    borderWidth: 'thin 0px 0px 0px',
    borderStyle: 'solid',
    borderColor: 'rgba(81,81,81,1)',
  },
  cell: {
    padding: theme.spacing(1),
  },
}))

const getAlignment = (i, array) => {
  if (i === 0) {
    return 'left'
  }

  if (i === array.length - 1) {
    return 'right'
  }

  return 'center'
}

const Row = ({ row, barWeight }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleTooltipClose = useCallback(() => setOpen(false), [])
  const handleTooltipToggle = useCallback(() => setOpen((o) => !o), [])

  const getInsideComponent = (cell, i, array) => {
    const eachSideWeight = (cell - barWeight) / 2
    const plateLabel =
      eachSideWeight <= 0
        ? '😂 Get Stronger 😂'
        : createPlateLabel(eachSideWeight)

    return i === array.length - 1 ? (
      <Grid key={cell} item className={classes.cell} xs={12 / row.length}>
        <ClickAwayListener
          key={`${cell}-${i}`}
          onClickAway={handleTooltipClose}
        >
          <Tooltip
            arrow
            disableFocusListener
            open={open}
            PopperProps={{ disablePortal: true }}
            title={plateLabel}
            placement="top-end"
          >
            <Typography
              align={getAlignment(i, array)}
              onClick={handleTooltipToggle}
            >
              {cell}
            </Typography>
          </Tooltip>
        </ClickAwayListener>
      </Grid>
    ) : (
      <Grid key={cell} item className={classes.cell} xs={12 / row.length}>
        <Typography align={getAlignment(i, array)}>{cell}</Typography>
      </Grid>
    )
  }

  return (
    <Grid container item xs={12} className={classes.row}>
      {row.map((cell, i) => {
        return getInsideComponent(cell, i, row)
      })}
    </Grid>
  )
}

Row.propTypes = {
  row: PropTypes.array.isRequired,
  barWeight: PropTypes.number.isRequired,
}

export default Row
