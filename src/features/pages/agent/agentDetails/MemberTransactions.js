import React, { useEffect, useState, Fragment } from "react";
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
import { TextField } from "@material-ui/core";
import { MemberTransactionsRow } from "./components/MemberTransactionsRow";
import { userController } from "../../../../controllers/userController";
import moment from "moment";
import { withTheme } from "../../../common/hoc/withTheme";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 3,
  },
  container: {
    maxHeight: 450,
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

export const MemberTransactions = withTheme(({ userId, setLoading }) => {
  let currentdate = new Date();
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  var dd = currentdate.getDate();
  var mm = currentdate.getMonth() + 1;
  var yyyy = currentdate.getFullYear();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startDate, setStartDate] = useState(defaultDate);
  const [endDate, setEndDate] = useState(defaultDate);
  const [transactionData, setTransactionData] = useState([]);

  const getTransactionData = () => {
    setLoading(true);
    userController.getTransactionsForUser(
      userId,
      startDate,
      endDate,
      (data) => {
        data.userTransactions
          ? setTransactionData(data.userTransactions)
          : setTransactionData([]);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getTransactionData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="container">
      <h3>Member Transaction</h3>
      <Paper className={classes.root}>
        <div className="d-flex p-2 flex-wrap">
          <div className="">
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
          </div>
          <div className="">
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
          </div>
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
              onClick={() => getTransactionData()}
            >
              <i className="fas fa-search px-2"></i>Search
            </button>
          </div>
        </div>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeader} />
                <TableCell className={classes.tableHeader}>Date</TableCell>
                <TableCell className={classes.tableHeader} align="right">
                  Inward
                </TableCell>
                <TableCell className={classes.tableHeader} align="right">
                  Outward
                </TableCell>
                <TableCell className={classes.tableHeader} align="right">
                  Bet Amount
                </TableCell>
                <TableCell className={classes.tableHeader} align="right">
                  Win Amount
                </TableCell>
                <TableCell className={classes.tableHeader} align="right">
                  Commission Amount
                </TableCell>
                <TableCell className={classes.tableHeader} align="right">
                  Balance
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                <Fragment>
                  {transactionData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <MemberTransactionsRow
                        date={row.createdDate}
                        row={row}
                        userId={userId}
                      />
                    ))}
                </Fragment>
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={transactionData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
});
