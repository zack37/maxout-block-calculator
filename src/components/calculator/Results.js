import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
  tableHeader: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
}))

const createRow = (row) =>
  row.map((cell, i) => (
    <TableCell key={`${cell}-${i}`} align={i === 0 ? 'left' : 'right'}>
      <Typography>{cell}</Typography>
    </TableCell>
  ))

const Results = ({title, headerLabels, values}) => {
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
          {values.map(
            (row, i) => (
              console.log(row),
              (
                // eslint-disable-next-line react/no-array-index-key
                <TableRow key={`table-row-${i}`}>{createRow(row)}</TableRow>
              )
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

Results.propTypes = {
  title: PropTypes.string.isRequired,
  headerLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.array),
}

export default Results
