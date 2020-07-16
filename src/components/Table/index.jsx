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
import { CSVLink } from "react-csv";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  export: {
    background: '#3F51B5',
    color: 'white',
    margin: '10px',
    padding: '1rem',
    cursor: 'pointer',
    textDecoration: 'none',
    borderRadius: '10px',
  },
  info: {
    margin: '30px 0',
    display: 'flex',
    justifyContent: 'space-around'
  }
});

const headers = [
  { label: "Employee", key: "employee" },
  { label: "Transport", key: "transport" },
  { label: "Distance", key: "distance" },
  { label: "Workdays", key: "workdays" },
  { label: "Compensation", key: "compensation" },
  { label: "Payment Date", key: "paymentDate" }
];

function SimpleTable({ allowance }) {
  const classes = useStyles();

  const {
    allowanceData,
    getAllowanceData,
    compensationRate,
    calculateEmployeeCompensation,
    dataLength,
    loading,
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

  const start = startDate.format('MMMM dddd Do YYYY');
  const end = endDate.format('MMMM dddd Do YYYY');

  return (
    <React.Fragment>
      <h2>{ dataLength } Employees</h2>
      <div className={ classes.info }>
        <div>
          <Typography variant="h6">From: <span>{ start }</span> </Typography>
          <Typography variant="h6">Payment Date: <span>{ end }</span></Typography>
        </div>
        <CSVLink
          data={ allowanceData }
          headers={ headers }
          filename={ "employees_travel_allowance.csv" }
          separator={ ";" }
          className={ classes.export }
          onClick={ () => alert('File Downloaded Successfully') }
        >
          Export
      </CSVLink>
      </div>

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

