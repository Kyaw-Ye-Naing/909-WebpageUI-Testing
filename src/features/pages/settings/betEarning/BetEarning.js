import React, {useEffect, useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import MyColor from "../../../../config/color";
import Checkbox from "@material-ui/core/Checkbox"
import { MyTable } from "../../../common/components/MyTable";
import { TextField } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: 3,
    },
    container: {
        maxHeight: 350,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
        padding: 2,
    },
    tableHeader: {
        backgroundColor: MyColor.secondaryBackground,
        color: "#fff",
    },
  }));

  const rows = [
    {
        no:1,
        date: "19.11.2020",
        username: "user 1",
        winAmount: "20000", 
        earningStatus: false
    },
    {
        no:2,
        date: "20.11.2020",
        username: "user 2",
        winAmount: "40000", 
        earningStatus: true
    },
    {
        no:3,
        date: "20.11.2020",
        username: "user 3",
        winAmount: "30000", 
        earningStatus: true
    }
];

const columns = [
    { 
        id: "no", 
        label: "No", 
        align: "left" 
    },
    {
        id: "date",
        label: "Date",
        align: "left",
    },
    {
        id: "username",
        label: "User Name",
        align: "left",
    },
    {
        id: "winAmount",
        label: "Bet Amount",
        align: "left",
    }
];


export const BetEarning = () => {
    const defaultDate = moment(new Date()).format("YYYY-MM-DD");
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [startDate, setStartDate] = useState(defaultDate);
    const [endDate, setEndDate] = useState(defaultDate);
    const [betEarningData, setBetEarningData] = useState(rows);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
       setRowsPerPage(+event.target.value);
       setPage(0);
    };

    const handleStatusChange = (id) => {
        const filter = betEarningData.filter(v => v.no == id);
        const data = {
            ...filter[0],
            earningStatus: filter.earningStatus==true? false: true
        }
        
        
    }

    return (
        <div className="w-100">
            <h1>Bet Earning</h1>
            <Paper className={classes.root}>
            <div className="d-flex p-2 align-items-end">
                    <TextField
                        id="date"
                        label="Start Date :"
                        type="date"
                        value={startDate || defaultDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="date"
                        label="End Date :"
                        type="date"
                        value={endDate || defaultDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div className="p-2">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            style={{
                                backgroundColor: MyColor.secondaryBackground,
                                color: "#fff",
                                minWidth: 100,
                                maxHeight: 40,
                            }}
                            //onClick={() => searchGoalResultData()}
                        >
                        <i className="fas fa-search px-2"></i>Search
                        </button>
                    </div>
                </div>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                          <TableRow>
                          {columns.map((column) => (
                              <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                  maxWidth: column.maxWidth,
                                  minWidth: column.minWidth,
                                  backgroundColor: MyColor.secondaryBackground,
                                  color: "#fff",
                              }}
                              >
                              {column.label}
                              </TableCell>
                          ))}
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {betEarningData
                              .slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage)
                              .map((v, k) => {
                                  return (
                                      <TableRow hover role="checkbox" tabIndex={-1} key={v.no}>
                                          <TableCell key={v.no} align={"left"} padding="default">{page>0? (k+1)+(rowsPerPage*page) : k+1}</TableCell>
                                          <TableCell key={v.no} align={"left"} padding="default">{v.date}</TableCell>
                                          <TableCell key={v.no} align={"left"} padding="default">{v.username}</TableCell>
                                          <TableCell key={v.no} align={"left"} padding="default">{v.winAmount}</TableCell>
                                          {/* <TableCell padding="checkbox" align={"left"}>
                                            <Checkbox
                                            style={{color:'black'}}
                                            checked={v.earningStatus}
                                            onChange={() => handleStatusChange(v.no)}
                                            //inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell> */}
                                      </TableRow>
                                  )
                              })
                          }
                      </TableBody>
                  </Table>
              </TableContainer> 
              <TablePagination
                   rowsPerPageOptions={[5, 10, 25, 50, 100]}
                   component="div"
                   count={betEarningData.length}
                   rowsPerPage={rowsPerPage}
                   page={page}
                   onChangePage={handleChangePage}
                   onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
        </div>
    );
};