import React, { useEffect, useState, useContext, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import MyColor from "../../../config/color";
import { TextField } from "@material-ui/core";
import { ExpandedRow } from "./components";
import { userController } from "../../../controllers/userController";
import moment from "moment";
import AppContext from "../../../context/AppContext";
import { toast } from "react-toastify";
import { withTheme } from "../../common/hoc/withTheme";

function createData(
  id,
  date,
  username,
  gamblingtype,
  betamount,
  winamount,
  lossAmount,
  balance,
  betTeam
) {
  return {
    id,
    date,
    username,
    gamblingtype,
    betamount,
    winamount,
    lossAmount,
    balance,
    betTeam,
  };
}

const rows = [
  createData("1", "6-10-2020", "Mg Mg", 50000, 1000, 10000, 2000, "Arseanal"),
  createData("2", "6-10-2020", "U Hla", 50000, 1000, 10000, 2000, "Liverpool"),
  createData(
    "3",
    "6-10-2020",
    "Aung Aung",
    50000,
    1000,
    10000,
    2000,
    "Manchester United"
  ),
];
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 3,
  },
  container: {
    maxHeight: 430,
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

const ReportForWinOrLost = (props) => {
  const {userId} = props;
  const { userData } = useContext(AppContext);
  const userInfo = JSON.parse(userData);
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

  const getTransactionData1 = () => {
    props.setLoading(true)
    userController.getWinLoseReport(startDate, (data) => {

      if (data.message == "Ok") {
        let value = data.winReports.map((v, k) => {
          return {
            id: k + 1,
            date: moment(v.createdDate).format("DD-MM-YYYY HH:mm:ss A"),
            username: v.userName,
            gamblingtype: v.gamblingType,
            betamount: v.betAmount,
            winamount: v.winAmount,
            betTeam: v.betTeamCount,
          };
        });
        setTransactionData(value);
      } else {
        setTransactionData([]); //// clear data by TNA (08/06/2021)
        toast.error(data.message + " in " + startDate, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }

      props.setLoading(false)
    });
  };

  useEffect(() => {
    userController.getWinLoseReport(startDate, (data) => {

      if (data.message == "Ok") {
        let value = data.winReports.map((v, k) => {
          return {
            id: v.gamblingId,
            date: moment(v.createdDate).format("DD-MM-YYYY HH:mm:ss A"),
            username: v.userName,
            gamblingtype: v.gamblingType,
            betamount: v.betAmount,
            winamount: v.winAmount,
            betTeam: v.betTeamCount,
          };
        });
        setTransactionData(value);
      }
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <h1>Win/Lose Report</h1>
      <Paper className={classes.root}>
        <div className="d-flex p-2 align-items-end">
          <TextField
            id="date"
            label=" Date :"
            type="date"
            value={startDate || defaultDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* <TextField
            id="date"
            label="End Date :"
            type="date"
            value={endDate || defaultDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          /> */}
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
              onClick={() => getTransactionData1()}
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
                <TableCell className={classes.tableHeader}>No</TableCell>
                <TableCell className={classes.tableHeader}>Date</TableCell>
                <TableCell className={classes.tableHeader}>UserName</TableCell>
                <TableCell className={classes.tableHeader}>
                  Gambling Type
                </TableCell>
                <TableCell className={classes.tableHeader}>BetAmount</TableCell>
                <TableCell className={classes.tableHeader}>
                  Win Amount
                </TableCell>
                {/* <TableCell className={classes.tableHeader} align="right">
                                    Loss Amount
                                </TableCell> */}
                {/* <TableCell className={classes.tableHeader} align="right">
                                    Balance
                                </TableCell>
                                <TableCell className={classes.tableHeader} align="right">
                                    BetTeam
                                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              { (
                <Fragment>
                  {transactionData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <ExpandedRow
                        date={row.createdDate}
                        row={row}
                        userId={userId}
                      />
                    ))}
                </Fragment>
              )}
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
};

export default withTheme(ReportForWinOrLost);
