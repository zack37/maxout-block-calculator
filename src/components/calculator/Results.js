import React from 'react' 
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1, flexDirection: "column" },
  paper: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    padding: 5,
  },
  tableHeader: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
}))

const createRow = row => row.map((cell, i) => (
  <TableCell align={i === 0 ? 'left' : 'right'}>{cell}</TableCell>
))

export default ({
  title,
  headerLabels,
  values,
}) => {
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
              <TableCell key={label} align={i === 0 ? "left" : 'right'}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((row, i) => (
            <TableRow key={`table-row-${i}`}>
              {createRow(row)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
