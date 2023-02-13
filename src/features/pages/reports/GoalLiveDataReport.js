import React, { useEffect, useState } from "react";
import { makeStyles, Paper, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { reportController } from "../../../controllers/reportController";
import moment from "moment";
import MyColor from "../../../config/color";
import { Fragment } from "react";
import { withTheme } from "../../common/hoc/withTheme";
import { Today } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useMediaPredicate } from "react-media-hook";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 3,
  },
  container: {
    maxHeight: 500, // Change height by AKPM 27-4-2021
    "& .MuiTableCell-root": {
      borderLeft: "1px solid rgba(224, 224, 224, 1)"
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    padding: 2,
  },
  textField1: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
    padding: 2,
  },
  tableHeader: {
    backgroundColor: MyColor.secondaryBackground,
    color: "#fff",
  },
}));

const GoalLiveDataReport = (props) => {
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  const [choseDate, setChoseDate] = useState(defaultDate);
  const [liveData, setLiveData] = useState([]);
  const [bodydiff, setBodyDiff] = useState(0);
  const [goaldiff, setGoalDiff] = useState(0);
  const [originaldata, setOriginalData] = useState([]);
  const [page, setPage] = useState(0); // Add by AKPM 27-4-2021
  const [rowsPerPage, setRowsPerPage] = useState(5); // Add by AKPM 27-4-2021
  const classes = useStyles();
  const isPhone = useMediaPredicate("(max-width: 800px)");
  const history = useHistory();

  useEffect(() => {
    getLiveDataReport();
  }, []);

  const getLiveDataReport = () => {
    props.setLoading(true);
    reportController.getLiveDataReport(choseDate, (data) => {
      setLiveData(data.message == 1 ? data.livedata : []);
      setOriginalData(data.message == 1 ? data.livedata : []);
      props.setLoading(false);
    });
  };

  const handleClickView = (rapidEventId) => {
    history.push(`/body-voucher-view/${rapidEventId}/goal`);
  };

  const setDifferentChange = (text, value) => {
    if (text == "body") {
      setBodyDiff(value);
    } else {
      setGoalDiff(value);
    }
  };

  const searchDifferentAmt = () => {
   
      var temp = liveData.filter(
        (v) => v.goalAmount >= goaldiff
      );
     
    setLiveData(temp);
  };

  const showAllData = () => {
    setLiveData(originaldata);
  };

  const handleChangePage = (event, newPage) => {
    // Add by AKPM 27-4-2021
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // Add by AKPM 27-4-2021
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const float = (number) => {
    return parseFloat(number).toFixed(2);
  }

  return (
    <div className="container">
      {isPhone ? (<h3>Goal Live Data Report</h3>) : (<h1>Goal Live Data Report</h1>)}
      <Paper className={classes.root}>
        <div className="d-flex p-2 align-items-end">
          <TextField
            id="date"
            label=" Date :"
            type="date"
            value={choseDate}
            onChange={(e) => setChoseDate(e.target.value)}
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
              onClick={getLiveDataReport}
            >
              <i className="fas fa-search px-2"></i>Search
            </button>
          </div>
        </div>
        <div className="d-flex p-2" style={{flexDirection: isPhone ? "column" : "row"}}>
          <div style={{
            display:'flex',
            flexDirection: 'row'
          }}>
          {/* <div className="p-2">
            <TextField
              id="bodyfiff"
              label=" Body Different :"
              type="text"
              placeholder="0"
              value={bodydiff == 0 ? null : bodydiff}
              onChange={(v) => setDifferentChange("body", v.target.value)}
              className={isPhone ? classes.textField1 : classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div> */}
          <div className="p-2">
            <TextField
              id="goaldiff"
              label=" Goal Different :"
              type="text"
              placeholder="0"
              value={goaldiff == 0 ? null : goaldiff}
              onChange={(v) => setDifferentChange("goal", v.target.value)}
              className={isPhone ? classes.textField1 : classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row'
          }}>
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
              onClick={searchDifferentAmt}
            >
              <i className="fas fa-search px-2"></i>Search
            </button>
          </div>
          <div className="p-2">
            <button
              type="button"
              className="btn btn-secondary"
              style={{
                backgroundColor: MyColor.secondaryBackground,
                color: "#fff",
                minWidth: 60,
                maxHeight: 40,
              }}
              onClick={showAllData}
            >
              <i className="fas fa-search px-2"></i>All
            </button>
          </div>
          </div>
        </div>
        {
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="right" className={classes.tableHeader}>
                    No
                 </TableCell>
                  <TableCell align="right" className={classes.tableHeader}>
                    League Name
                  </TableCell>
                  <TableCell align="right" className={classes.tableHeader}>
                    Home Team
                  </TableCell>
                  <TableCell align="right" className={classes.tableHeader}>
                    Away Team
                  </TableCell>
                  <TableCell align="right" className={classes.tableHeader}>
                    Goal Over
                  </TableCell>
                  <TableCell align="right" className={classes.tableHeader}>
                    Goal Under
                  </TableCell>
                  <TableCell align="right" className={classes.tableHeader}>
                    Goal Different
                  </TableCell>
                  <TableCell align="right" className={classes.tableHeader}>
                    Action
                  </TableCell>
                  {/*--------*/}
                </TableRow>
              </TableHead>

              <TableBody>
                {liveData.length > 0 &&
                  liveData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // // Add by AKPM 27-4-2021
                    .map((ed, ldId) => {
                      return (                     
                        <TableRow key={ldId}>
                              <TableCell align="right">{ldId + 1}</TableCell>
                              <TableCell align="right">{ed.leagueName}</TableCell>
                              <TableCell align="right">{ed.homeTeam}</TableCell>
                              <TableCell align="right">{ed.awayTeam}</TableCell>                                                              
                                  {ed.over > ed.under ? (
                                    <TableCell
                                    align="right"
                                      style={{
                                        fontWeight: "bolder",
                                        color: "red",
                                      }}
                                    >
                                      {float(ed.over).toLocaleString("en-US")}
                                    </TableCell>
                                  ) : (
                                    <TableCell align="right">
                                      {float(ed.over).toLocaleString("en-US")}
                                    </TableCell>
                                  )}
                                  {ed.under > ed.over ? (
                                    <TableCell
                                      align="right"
                                      style={{
                                        fontWeight: "bolder",
                                        color: "red",
                                      }}
                                    >
                                      {float(ed.under).toLocaleString("en-US")}
                                    </TableCell>
                                  ) : (
                                    <TableCell align="right">
                                      {float(ed.under).toLocaleString("en-US")}
                                    </TableCell>
                                  )}
                                  <TableCell
                                    align="right"
                                    style={{
                                      color: "orange",
                                      fontWeight: "bolder",
                                    }}
                                  >
                                    {float(ed.goalAmount).toLocaleString("en-US")}
                                  </TableCell>
                                  <TableCell>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                handleClickView(ed.rapidId);
                              }}
                              style={{
                                backgroundColor: MyColor.secondaryBackground,
                              }}
                            >
                              View 
                            </button>
                          </TableCell>                             
                                </TableRow>
                              
                            );
                          })}                                  
              </TableBody>
            </Table>
          </TableContainer>
        }
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          component="div"
          count={liveData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default withTheme(GoalLiveDataReport);
