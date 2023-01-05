import React, { useContext, useEffect, useState } from "react";
import { withTheme } from "../../common/hoc/withTheme";
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
import { reportController } from "../../../controllers/reportController";
import moment from "moment";
import { toast } from "react-toastify";
import { MyActivity } from "../../common/components/MyActivity";
import AppContext from "../../../context/AppContext";
import SearchBar from "material-ui-search-bar";
import { useMediaPredicate } from "react-media-hook";

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
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const columns = [
  { id: "id", label: "No", minWidth: 50, maxWidth: 50, align: "left" },
  {
    id: "event",
    label: "Date",
    minWidth: 100,
    maxWidth: 150,
    align: "left",
  },
  {
    id: "leagueName",
    label: "League",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
  {
    id: "homeTeam",
    label: "Home Team",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
  {
    id: "body",
    label: "Body Odds",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
  {
    id: "awayTeam",
    label: "Away Team",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
  {
    id: "goal",
    label: "Goal Odds",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
  {
    id: "bettype",
    label: "Bet Type",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
  {
    id: "action",
    label: "Remove Action",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
];

const SelectedEvents = (props) => {
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [searchText, setSearchText] = useState("");
  const [selectedEventData, setSelectedEventData] = useState([]);
  const [searchedLeague, setSearchedLeague] = useState([]);
  const isPhone = useMediaPredicate("(max-width: 800px)");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [leagueTotal, setLeagueTotal] = useState(null);
  const [eventTotal, setEventTotal] = useState(null);
  const [singleTotal, setSingleTotal] = useState(0);
  const [mixTotal, setMixTotal] = useState(0);
  const [tempRemoveData, setTempRemoveData] = useState({
    rapidEventId: 0,
    type: "",
  });
  // console.log("searchedLeague>>", searchedLeague);

  const searchSelectedEvent = () => {
    props.setLoading(true);
    reportController.searchSelectedEvent(selectedDate, (data) => {
      setSelectedEventData(data.events);
      setSearchedLeague(data.events);
      setLeagueTotal(data.leagueCount);
      setEventTotal(data.eventCount);
      setSingleTotal(data.singleCount);
      setMixTotal(data.mixCount);
      props.setLoading(false);
    });
  };

  useEffect(() => {
    props.setLoading(true);
    searchSelectedEvent();
    //getGoalResultData();
  }, []);

  const handleRemove = (tempRemoveData) => {
    props.setLoading(true);
    reportController.removeEventsFromPre(tempRemoveData.rapidEventId,tempRemoveData.type,(data) => {
     toast.success(data.message, {
       position: toast.POSITION.BOTTOM_RIGHT,
     });

    searchSelectedEvent();
    props.setLoading(false);
    })
  };

  const requestSearch = (searchedVal) => {
    setSearchText(searchedVal);
    const filteredRows = selectedEventData.filter((row) => {
      return (
        row.homeTeam.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.awayTeam.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.league.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.betType.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setSearchedLeague(filteredRows);
  };

  const cancelSearch = () => {
    setSearchText("");
    requestSearch("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <ConfirmBoxModal
        tempRemoveData={tempRemoveData}
        setTempRemoveData={setTempRemoveData}
        handleRemove={handleRemove}
      />
      {isPhone ? (
        <h3>Selected Event Report</h3>
      ) : (
        <h1>Selected Event Report</h1>
      )}
      <Paper className={classes.root}>
        <div className="d-flex p-2 align-items-end">
          <TextField
            id="date"
            label="Date :"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
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
                fontSize: isPhone ? 12 : null,
              }}
              onClick={() => searchSelectedEvent()}
            >
              <i className="fas fa-search px-2"></i>Search
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <SearchBar
            placeholder={"Search "}
            style={{ marginLeft: 15, width: isPhone ? 200 : null }}
            value={searchText}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
          <div className="d-flex">
            <p style={{ fontWeight: "bold", marginRight: isPhone ? 5 : 15 }}>
              League Total: {leagueTotal}
            </p>
            <p style={{ fontWeight: "bold", marginRight: isPhone ? 0 : 15 }}>
              Event Total: {eventTotal}
            </p>
            <p style={{ fontWeight: "bold", marginRight: isPhone ? 0 : 15 }}>
              Single Total: {singleTotal}
            </p>
            <p style={{ fontWeight: "bold", marginRight: isPhone ? 0 : 15 }}>
              Mix Total: {mixTotal}
            </p>
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
              {searchedLeague.length > 0 &&
                searchedLeague
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((v, k) => {
                    return (
                      <TableRow key={k}>
                        <TableCell align={"left"} padding="default">
                          {page > 0 ? k + 1 + rowsPerPage * page : k + 1}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {`${moment(v.event).format("hh:mm:ss a")}/ ${moment(
                            v.event
                          ).format("YYYY-MM-DD")}`}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.league}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.isHomeBodyOdds == true ? (
                            <span style={{ color: "red" }}>{v.homeTeam}</span>
                          ) : (
                            <span>{v.homeTeam}</span>
                          )}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.bodyOdds}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.isHomeBodyOdds == false ? (
                            <span style={{ color: "red" }}>{v.awayTeam}</span>
                          ) : (
                            <span>{v.awayTeam}</span>
                          )}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.goalOdds}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.betType}
                        </TableCell>
                        <TableCell>
                          <div className="d-flex align-items-center">
                            {v.isActive == true ? (
                              <button
                                type="button"
                                data-toggle="modal"
                                data-target="#confirmModal"
                                className="btn btn-secondary"
                                style={{
                                  backgroundColor: MyColor.secondaryBackground,
                                  color: "#fff",
                                  marginRight: 8,
                                  minWidth: 50,
                                  maxHeight: 40,
                                  fontSize: isPhone ? 12 : null,
                                }}
                                onClick={() =>
                                  setTempRemoveData({
                                    rapidEventId: v.eventId,
                                    type: "All",
                                  })
                                }
                              >
                                All
                              </button>
                            ) : null}
                            {v.isSingle == true && v.isActive == true ? (
                              <button
                                type="button"
                                data-toggle="modal"
                                data-target="#confirmModal"
                                className="btn btn-secondary"
                                style={{
                                  backgroundColor: MyColor.secondaryBackground,
                                  color: "#fff",
                                  minWidth: 50,
                                  marginRight: 8,
                                  maxHeight: 40,
                                  fontSize: isPhone ? 12 : null,
                                }}
                                onClick={() =>
                                  setTempRemoveData({
                                    rapidEventId: v.eventId,
                                    type: "Single",
                                  })
                                }
                              >
                                Single
                              </button>
                            ) : null}
                            {v.isMix == true && v.isActive == true ? (
                              <button
                                type="button"
                                data-toggle="modal"
                                data-target="#confirmModal"
                                className="btn btn-secondary"
                                style={{
                                  backgroundColor: MyColor.secondaryBackground,
                                  color: "#fff",
                                  minWidth: 50,
                                  marginRight: 8,
                                  maxHeight: 40,
                                  fontSize: isPhone ? 12 : null,
                                }}
                                onClick={() =>
                                  setTempRemoveData({
                                    rapidEventId: v.eventId,
                                    type: "Mix",
                                  })
                                }
                              >
                                Mix
                              </button>
                            ) : null}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
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

export default withTheme(SelectedEvents);

export function ConfirmBoxModal({
  tempRemoveData,
  setTempRemoveData,
  handleRemove,
}) {
  return (
    <div className="row">
      <div
        className="modal fade"
        id="confirmModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <br />
              <span style={{color:"black",fontWeight:"bold",fontSize:"15px"}}><i class="fas fa-times-circle mr-1" style={{color:"red"}}></i>Are you sure you want to remove this event?</span> <br />
              <span style={{color:"grey",fontSize:"12px",marginLeft:"15px"}}>
                This change will reflect in your modal after an minute.
              </span>
              <div className="d-flex justify-content-end mt-1">
                <button
                  type="button"
                  style={{marginRight:2}}
                  onClick={() =>
                    setTempRemoveData({ rapidEventId: 0, type: "" })
                  }
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  className="btn btn-danger"
                  onClick={() => handleRemove(tempRemoveData)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
