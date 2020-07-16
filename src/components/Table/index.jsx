import React, { useState, useEffect } from 'react';
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
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

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
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-around'
  },
  dates: {
    maxWidth: '60%'
  },
  arrows: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  icons: {
    cursor: 'pointer',
    padding: '1rem',
    textDecoration: 'none',
    background: 'transparent',
    border: 'none'
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

  const [monthIndex, setMonthIndex] = useState(1);

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
    calculateEmployeeCompensation(monthIndex);
  }, [allowanceData, monthIndex])

  const handlePrev = () => {
    setMonthIndex((prevState) => prevState === 1 ? -1 : prevState - 1);
  };

  const handleNext = () => {
    setMonthIndex((prevState) => prevState === -1 ? 1 : prevState + 1);
  };

  const next = moment()
    .add(monthIndex, "months")
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

  const start = startDate.format('dddd, MMMM Do YYYY');
  const end = endDate.format('dddd, MMMM Do YYYY');

  return (
    <React.Fragment>
      <h2>{ dataLength } Employees</h2>
      <div className={ classes.info }>
        { !loading && (
          <React.Fragment>
            <div className={ classes.dates }>
              <Typography variant="h6">From: <span>{ start }</span> </Typography>
              <Typography variant="h6">Payment Date: <span>{ end }</span></Typography>
            </div>
            <CSVLink
              data={ allowanceData }
              headers={ headers }
              filename={ `employees_travel_allowance_${end}.csv` }
              separator={ ";" }
              className={ classes.export }
              onClick={ () => alert('File Downloaded Successfully') }
            >
              Export
         </CSVLink>
          </React.Fragment>
        ) }
      </div>

      <div className={ classes.arrows }>
        <button className={ classes.icons } onClick={ handlePrev }><SkipPreviousIcon fontSize="large" color="primary" /></button>
        <button className={ classes.icons } onClick={ handleNext }><SkipNextIcon fontSize="large" color="primary" /></button>
      </div>

      <TableContainer component={ Paper }>
        <Table className={ classes.table } aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Transport</TableCell>
              <TableCell>Distance. Km/One Way</TableCell>
              <TableCell>Workdays. Per Week</TableCell>
              <TableCell>Compensation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { allowanceData.map((row) => (
              <TableRow key={ row.name }>
                <TableCell component="th" scope="row">
                  { row.employee }
                </TableCell>
                <TableCell>{ row.transport }</TableCell>
                <TableCell>{ row.distance }</TableCell>
                <TableCell>{ row.workdays }</TableCell>
                <TableCell>{ Math.round(row.compensation * 100 / 100) } $</TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment >
  );
}


export default inject("allowance")(observer(SimpleTable));

