import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import { createPlateLabel } from './helpers'

const useStyles = makeStyles(() => ({
  tableHeader: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
}))

const Row = ({ row, barWeight }) => {
  const [open, setOpen] = useState(false)

  const handleTooltipClose = () => setOpen(false)
  const handleTooltipOpen = () => setOpen(true)

  return row.map((cell, i) =>
    i === row.length - 1 ? (
      /* eslint-disable-next-line react/no-array-index-key */
      <ClickAwayListener key={`${cell}-${i}`} onClickAway={handleTooltipClose}>
        <TableCell align={i === 0 ? 'left' : 'right'}>
          <Tooltip
            arrow
            disableFocusListener
            open={open}
            PopperProps={{ disablePortal: true }}
            title={createPlateLabel((cell - barWeight) / 2)}
            placement="top-end"
          >
            <Typography onClick={handleTooltipOpen}>{cell}</Typography>
          </Tooltip>
        </TableCell>
      </ClickAwayListener>
    ) : (
      // eslint-disable-next-line react/no-array-index-key
      <TableCell key={`${cell}-${i}`} align={i === 0 ? 'left' : 'right'}>
        <Typography>{cell}</Typography>
      </TableCell>
    ),
  )
}

const Results = memo(({ title, headerLabels, values, barWeight }) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          className={classes.tableHeader}
        >
          {title}
        </Typography>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            {headerLabels.map((label, i) => (
              <TableCell key={label} align={i === 0 ? 'left' : 'right'}>
                <Typography>{label}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((row) => (
            <TableRow key={JSON.stringify(row)}>
              <Row row={row} barWeight={barWeight} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})

Results.propTypes = {
  title: PropTypes.string.isRequired,
  headerLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.array).isRequired,
  barWeight: PropTypes.number.isRequired,
}

export default Results
