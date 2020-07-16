import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function SimpleTable({ allowance }) {
  const classes = useStyles();

  const {
    allowanceData,
    getAllowanceData,
    calculateEmployeeCompensation,
    dataLength,
  } = allowance;

  useEffect(() => {
    getAllowanceData();
  }, []);

  useEffect(() => {
    calculateEmployeeCompensation();
  }, [allowanceData])

  const next = moment()
    .add(1, "months")
    .month();


  const startDate = moment()
    .set("year", 2020)
    .set("month", next - 1)
    .set("date", 1)
    .isoWeekday(8);

  const endDate = moment()
    .set("year", 2020)
    .set("month", next)
    .set("date", 1)
    .isoWeekday(8);

  const start = startDate._d;
  const end = endDate._d;

  return (
    <React.Fragment>
      <h2>{ dataLength } Employees</h2>
      <h3>Month  { `${start} - ${end}` }</h3>
      <TableContainer component={ Paper }>
        <Table className={ classes.table } aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell align="right">Transport</TableCell>
              <TableCell align="right">Distance. Km/One Way</TableCell>
              <TableCell align="right">Workdays. Per Week</TableCell>
              <TableCell align="right">Compensation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { allowanceData.map((row) => (
              <TableRow key={ row.name }>
                <TableCell component="th" scope="row">
                  { row.employee }
                </TableCell>
                <TableCell align="right">{ row.transport }</TableCell>
                <TableCell align="right">{ row.distance }</TableCell>
                <TableCell align="right">{ row.workdays }</TableCell>
                <TableCell align="right">{ row.compensation } $</TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}


export default inject("allowance")(observer(SimpleTable));

