import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import MyColor from "../../../config/color";
import moment from "moment";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaPredicate } from "react-media-hook";
import SearchBar from "material-ui-search-bar";
import TablePagination from "@material-ui/core/TablePagination";
import OddSummaryModel from "./components/OddSummaryModel";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

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
    id: "eventTime",
    label: "Event Time",
    minWidth: 100,
    maxWidth: 100,
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
    id: "awayTeam",
    label: "Away Team",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    // minWidth: 50,
    //maxWidth: 50,
    align: "left",
  },
];

const temp = [
  {
    leagueId: 1,
    leagueName: "Premier League",
    homeTeam: "Man U",
    awayTeam: "Chelsea",
    eventTime: "2022-11-15 08:00 pm",
  },
  {
    leagueId: 2,
    leagueName: "Premier League",
    homeTeam: "Man U",
    awayTeam: "Chelsea",
    eventTime: "2022-11-15 08:00 pm",
  },
  {
    leagueId: 3,
    leagueName: "Premier League",
    homeTeam: "Man U",
    awayTeam: "Chelsea",
    eventTime: "2022-11-15 08:00 pm",
  },
  {
    leagueId: 4,
    leagueName: "Premier League",
    homeTeam: "Man U",
    awayTeam: "Chelsea",
    eventTime: "2022-11-15 08:00 pm",
  },
  {
    leagueId: 5,
    leagueName: "Premier League",
    homeTeam: "Man U",
    awayTeam: "Chelsea",
    eventTime: "2022-11-15 08:00 pm",
  },
  {
    leagueId: 6,
    leagueName: "Premier League",
    homeTeam: "Man U",
    awayTeam: "Chelsea",
    eventTime: "2022-11-15 08:00 pm",
  },
  {
    leagueId: 7,
    leagueName: "Premier League",
    homeTeam: "Man U",
    awayTeam: "Chelsea",
    eventTime: "2022-11-15 08:00 pm",
  },
  {
    leagueId: 8,
    leagueName: "Premier League",
    homeTeam: "Man U",
    awayTeam: "Chelsea",
    eventTime: "2022-11-15 08:00 pm",
  },
  {
    leagueId: 9,
    leagueName: "Premier League",
    homeTeam: "Man U",
    awayTeam: "Chelsea",
    eventTime: "2022-11-15 08:00 pm",
  },
];

const tempodd =[
{
  "oddSummaryId":1,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
},
{
  "oddSummaryId":2,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
},
{
  "oddSummaryId":3,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
},{
  "oddSummaryId":4,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
},
{
  "oddSummaryId":5,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
},
{
  "oddSummaryId":6,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
},{
  "oddSummaryId":7,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
}
,{
  "oddSummaryId":8,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
}
,{
  "oddSummaryId":9,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
}
,
{
  "oddSummaryId":10,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
},{
  "oddSummaryId":11,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
}
,{
  "oddSummaryId":12,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
},
{
  "oddSummaryId":13,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
},
{
  "oddSummaryId":14,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
},
{
  "oddSummaryId":15,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
},
{
  "oddSummaryId":16,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
},
{
  "oddSummaryId":17,
  "homeOdds":"0.199",
  "awayOdds":"1.987",
  "homeHandicap":"1.0,1.5",
  "awayHandicap":"-2.0,-2.5",
  "overOdds":"3.222",
  "underOdds":"4.333",
  "goalHandicap":"1.0,5.0",
  "createdTime":"2022-11-25 05:00 pm",
  "body":"1+90",
  "goal":"3+80"
},
]

const OddSummary = (props) => {
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  const classes = useStyles();
  const isPhone = useMediaPredicate("(max-width: 800px)");
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [searchText, setSearchText] = useState("");
  const [oddSummaryDetails,setOddSummaryDetails]=useState(tempodd);
  const [selectedEventData, setSelectedEventData] = useState(temp);
  const [searchedLeague, setSearchedLeague] = useState(temp);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    //props.setLoading(true);
    // searchSelectedEvent();
    //getGoalResultData();
  }, []);

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

  const handleRemove = (rapidId, status) => {
    //     props.setLoading(true);
    //    reportController.removeEventsFromPre(rapidId,status,(data) => {
    //      toast.success(data.message, {
    //        position: toast.POSITION.BOTTOM_RIGHT,
    //      });
    //      searchSelectedEvent();
    //      props.setLoading(false);
    //    })
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
    <OddSummaryModel oddSummaryDetails={oddSummaryDetails}/>
      <h1>Odd Summary Report</h1>
      <Paper>
        <div className="d-flex p-2 justify-content-between">
          <div className="d-flex">
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
                  marginTop: 10,
                  minWidth: 100,
                  maxHeight: 40,
                  fontSize: isPhone ? 12 : null,
                }}
                //onClick={() => searchSelectedEvent()}
              >
                <i className="fas fa-search px-2"></i>Search
              </button>
            </div>
          </div>

          <SearchBar
            placeholder={"Search "}
            style={{ marginLeft: 15, width: isPhone ? 200 : null }}
            value={searchText}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
        </div>
        <TableContainer className={classes.container}>
          <Table stickyHeader arial-label="">
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
                            v.eventTime
                          ).format("YYYY-MM-DD")}`}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.leagueName}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.homeTeam}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.awayTeam}
                        </TableCell>

                        <TableCell>
                          <div className="d-flex align-items-center">
                            <button
                              type="button"
                              data-toggle="modal"
                              data-target="#oddSummaryModal"
                              className="btn btn-secondary"
                              style={{
                                backgroundColor: MyColor.secondaryBackground,
                                color: "#fff",
                                marginRight: 8,
                                minWidth: 50,
                                maxHeight: 40,
                                fontSize: isPhone ? 12 : null,
                              }}
                              //onClick={() => handleRemove(v.eventId, "All")}
                            >
                              View
                            </button>
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

export default OddSummary;
