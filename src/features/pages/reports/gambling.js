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
import { ExpandedRow } from "./components/expandGamblingRow";
import { userController } from "../../../controllers/userController";
import moment from "moment";
import AppContext from "../../../context/AppContext";
import { toast } from "react-toastify";
import SearchBar from "material-ui-search-bar";
import { withTheme } from "../../common/hoc/withTheme";
import { useMediaPredicate } from "react-media-hook";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 15,
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

const ReportForGambling = ({ userId, setLoading }) => {
  const { userData } = useContext(AppContext);
  const userInfo = JSON.parse(userData);
  let storage = JSON.parse(localStorage.getItem("aaaLoginData"));
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
  const [searchText,setSearchText] = useState("");
  const [searchedLeague, setSearchedLeague] = useState([]);
  const [groupBetting, setGroupBetting] = useState([]);
  const isPhone = useMediaPredicate("(max-width: 800px)");

  useEffect(() => {
    getGroupBetting();
  }, []);

  const getGroupBetting = () => {
    console.log("senior master out",startDate);
    console.log("senior master out",storage.userDetails.userId);
    userController.getGroupGambling(
      startDate,
      storage.userDetails.userId,
      (data) => {
        // if (data.message == "Ok") {
        const groupBettingData = data.data.map((v, k) => ({
          ...v,
          key: k + 1,
        }));
        setGroupBetting(groupBettingData);
        setSearchedLeague(groupBettingData);
        // }
      }
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const requestSearch = (searchedVal) => {
    setSearchText(searchedVal);
    const filteredRows = groupBetting.filter((row) => {
      return (
        row.username.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.name.toLowerCase().includes(searchedVal.toLowerCase()) 
      );
    });
    setSearchedLeague(filteredRows);
  };

  const cancelSearch = () => {
    setSearchText("");
    requestSearch("");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
      {isPhone ? ( 
        <h3>Member Outstanding Report</h3>
      ) : (
        <h1>Member Outstanding Report</h1>
      )}
      <SearchBar
            placeholder={"Search "}
            style={{ marginLeft: 15,marginTop:10, width: isPhone ? 200 : null }}
            value={searchText}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
      </div> 
      <Paper className={classes.root}>
        {/* <div className="d-flex p-2 align-items-end">
          <TextField
            id="date"
            label=" Date :"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
              onClick={() => getGroupBetting()}
            >
              <i className="fas fa-search px-2"></i>Search
            </button>
          </div>
        </div> */}
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeader} />
                <TableCell className={classes.tableHeader}>No</TableCell>
                {/* <TableCell className={classes.tableHeader}>Date</TableCell> */}
                <TableCell className={classes.tableHeader}>User Id</TableCell>
                <TableCell className={classes.tableHeader}>Name</TableCell>
                {/* <TableCell className={classes.tableHeader}>
                  Gambling Type
                </TableCell> */}
                {/* <TableCell className={classes.tableHeader}>
                  Team Count
                </TableCell> */}
                <TableCell className={classes.tableHeader}>
                  Bet Amount
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                <Fragment>
                  {searchedLeague
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <ExpandedRow
                        index={index}
                        row={row}
                        startDate={startDate}
                        setLoading={setLoading}
                      />
                    ))}
                </Fragment>
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          component="div"
          count={searchedLeague.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default withTheme(ReportForGambling);
