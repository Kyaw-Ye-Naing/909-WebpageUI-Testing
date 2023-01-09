import React, { useState, useEffect,useRef } from 'react';
import { withTheme } from '../../../common/hoc/withTheme';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import moment from "moment";
import { toast } from "react-toastify";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import SearchBar from 'material-ui-search-bar';
import { useMediaPredicate } from "react-media-hook";
import MyColor from "../../../../config/color";
import {
  Checkbox,
} from "@material-ui/core";
import { reportController } from '../../../../controllers/reportController';

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: "80%"
  },
  checkbox: {
    padding: "5px 5px",
    // marginRight: "3px"
  }
});

export const SelectedLeague = withTheme((props) => {
  const [bufferlist, setBufferList] = useState([]);
  const classes = useStyles();
  const [searchText, setSearchText] = useState([]);
  const [rapidEventIdList, setRapidEventIdList] = useState([]);
  const isPhone = useMediaPredicate("(max-width: 800px)");
  const [page, setPage] = useState(0);
  const [searchedLeague, setSearchedLeague] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isRunning, setIsRunning] = useState(false);
  const [statusMessage, setStatusMessage] = useState(0);
  const myInterval = useRef();
  const toastId = React.useRef(null);
  const customId = "custom-id-yes";

  const columns = [
    {
      id: "no",
      label: "No",
      minWidth: 50,
      maxWidth: 50,
      align: "left"
    },
    {
      id: "event",
      label: "Event",
      minWidth: 200,
      maxWidth: 200,
      align: "left"
    },
    {
      id: "lname",
      label: "League Name",
      minWidth: 140,
      maxWidth: 140,
      align: "left"
    },
    {
      id: "bhandicap",
      label: "Body Handicap",
      minWidth: 90,
      maxWidth: 90,
      align: "left"
    },
    {
      id: "bodds",
      label: "Body Odds",
      minWidth: 90,
      maxWidth: 90,
      align: "left",
      //  format: value => value.toLocaleString()
    },
    {
      id: "ghandicap",
      label: "Goal Handicap",
      minWidth: 90,
      maxWidth: 90,
      align: "left",
      //format: value => value.toFixed(2)
    },
    {
      id: "godds",
      label: "Goal Odds",
      minWidth: 90,
      maxWidth: 90,
      align: "left",
      //format: value => value.toFixed(2)
    },
    {
      id: "body",
      label: "Body",
      minWidth: 60,
      maxWidth: 60,
      align: "left",
      //format: value => value.toFixed(2)
    },
    {
      id: "goal",
      label: "Goal",
      minWidth: 60,
      maxWidth: 60,
      align: "left",
      //format: value => value.toFixed(2)
    },
    {
      id: "single",
      label: "Single",
      minWidth: 30,
      maxWidth: 30,
      align: "left",
      //format: value => value.toFixed(2)
    },
    {
      id: "mix",
      label: "Mix",
      minWidth: 30,
      maxWidth: 30,
      align: "left",
      //format: value => value.toFixed(2)
    },
    {
      id: "action",
      label: "Action",
      minWidth: 50,
      maxWidth: 50,
      align: "left",
      //format: value => value.toFixed(2)
    }
  ];

  const countries = [
    {
      id: 1,
      date: "2022-07-23 13:00:00.000",
      lname: "India",
      hname: "Janparako",
      aname: "Upamecano",
      bodyhandicap: "0.5,1.0",
      homeodds: "1.900",
      awayodds: "2.000",
      goalhandicap: "0.5,1.0",
      overodds: "1.900",
      underodds: "2.000",
      body: "1+80",
      goal: "5+90",
      overId: 1,
      underId: 2,
      homeId: 1,
      awayId: 2,
      isOpen: true
    },
    {
      id: 2,
      date: "2022-07-23 13:00:00.000",
      lname: "India National League",
      hname: "Janparako",
      aname: "Upamecano",
      bodyhandicap: "0.5,1.0",
      homeodds: "1.900",
      awayodds: "2.000",
      goalhandicap: "0.5,1.0",
      overodds: "1.900",
      underodds: "2.000",
      body: "1+80",
      goal: "5+90",
      overId: 1,
      underId: 2,
      homeId: 1,
      awayId: 2,
      isOpen: true
    },
    {
      id: 3,
      date: "2022-07-23 13:00:00.000",
      lname: "India",
      hname: "Janparako",
      aname: "Upamecano",
      bodyhandicap: "0.5,1.0",
      homeodds: "1.900",
      awayodds: "2.000",
      goalhandicap: "0.5,1.0",
      overodds: "1.900",
      underodds: "2.000",
      body: "1+80",
      goal: "5+90",
      overId: 1,
      underId: 2,
      homeId: 1,
      awayId: 2,
      isOpen: true
    },
    {
      id: 4,
      date: "2022-07-23 13:00:00.000",
      lname: "India",
      hname: "Janparako",
      aname: "Upamecano",
      bodyhandicap: "0.5,1.0",
      homeodds: "1.900",
      awayodds: "2.000",
      goalhandicap: "0.5,1.0",
      overodds: "1.900",
      underodds: "2.000",
      body: "1+80",
      goal: "5+90",
      overId: 1,
      underId: 2,
      homeId: 1,
      awayId: 2,
      isOpen: true
    },
    {
      id: 5,
      date: "2022-07-23 13:00:00.000",
      lname: "India",
      hname: "Janparako",
      aname: "Upamecano",
      bodyhandicap: "0.5,1.0",
      homeodds: "1.900",
      awayodds: "2.000",
      goalhandicap: "0.5,1.0",
      overodds: "1.900",
      underodds: "2.000",
      body: "1+80",
      goal: "5+90",
      overId: 1,
      underId: 2,
      homeId: 1,
      awayId: 2,
      isOpen: true
    },
    {
      id: 6,
      date: "2022-07-23 13:00:00.000",
      lname: "India",
      hname: "Janparako",
      aname: "Upamecano",
      bodyhandicap: "0.5,1.0",
      homeodds: "1.900",
      awayodds: "2.000",
      goalhandicap: "0.5,1.0",
      overodds: "1.900",
      underodds: "2.000",
      body: "1+80",
      goal: "5+90",
      overId: 2,
      underId: 1,
      homeId: 1,
      awayId: 2,
      isOpen: true
    },
    {
      id: 7,
      date: "2022-07-23 13:00:00.000",
      lname: "India",
      hname: "Janparako",
      aname: "Upamecano",
      bodyhandicap: "0.5,1.0",
      homeodds: "1.900",
      awayodds: "2.000",
      goalhandicap: "0.5,1.0",
      overodds: "1.900",
      underodds: "2.000",
      body: "1+80",
      goal: "5+90",
      overId: 2,
      underId: 1,
      homeId: 1,
      awayId: 2,
      isOpen: true
    },
    {
      id: 8,
      date: "2022-07-23 13:00:00.000",
      lname: "India",
      hname: "Janparako",
      aname: "Upamecano",
      bodyhandicap: "0.5,1.0",
      homeodds: "1.900",
      awayodds: "2.000",
      goalhandicap: "0.5,1.0",
      overodds: "1.900",
      underodds: "2.000",
      body: "1+80",
      goal: "5+90",
      overId: 2,
      underId: 1,
      homeId: 1,
      awayId: 2,
      isOpen: true
    },
    {
      id: 9,
      date: "2022-07-23 13:00:00.000",
      lname: "India",
      hname: "Janparako",
      aname: "Upamecano",
      bodyhandicap: "0.5,1.0",
      homeodds: "1.900",
      awayodds: "2.000",
      goalhandicap: "0.5,1.0",
      overodds: "1.900",
      underodds: "2.000",
      body: "1+80",
      goal: "5+90",
      overId: 2,
      underId: 1,
      homeId: 1,
      awayId: 2,
      isOpen: true
    },
    {
      id: 10,
      date: "2022-07-23 13:00:00.000",
      lname: "India",
      hname: "Janparako",
      aname: "Upamecano",
      bodyhandicap: "0.5,1.0",
      homeodds: "1.900",
      awayodds: "2.000",
      goalhandicap: "0.5,1.0",
      overodds: "1.900",
      underodds: "2.000",
      body: "1+80",
      goal: "5+90",
      overId: 2,
      underId: 1,
      homeId: 1,
      awayId: 2,
      isOpen: true
    },
    {
      id: 11,
      date: "2022-07-23 13:00:00.000",
      lname: "India",
      hname: "Janparako",
      aname: "Upamecano",
      bodyhandicap: "0.5,1.0",
      homeodds: "1.900",
      awayodds: "2.000",
      goalhandicap: "0.5,1.0",
      overodds: "1.900",
      underodds: "2.000",
      body: "1+80",
      goal: "5+90",
      overId: 2,
      underId: 1,
      homeId: 1,
      awayId: 2,
      isOpen: true
    },
    {
      id: 12,
      date: "2022-07-23 13:00:00.000",
      lname: "India",
      hname: "Janparako",
      aname: "Upamecano",
      bodyhandicap: "0.5,1.0",
      homeodds: "1.900",
      awayodds: "2.000",
      goalhandicap: "0.5,1.0",
      overodds: "1.900",
      underodds: "2.000",
      body: "1+80",
      goal: "5+90",
      overId: 2,
      underId: 1,
      homeId: 1,
      awayId: 2,
      isOpen: true
    }
  ];

  useEffect(() => {
    props.setLoading(true);
    searchSelectedEvent();
    //getGoalResultData();

    return () => clearInterval(myInterval.current);
  }, []);

  useEffect(() => {
    if (isRunning) {
      myInterval.current = setInterval(function () {
        fetchUpdateStatus();
      }, 5000);
    } else {
      clearInterval(myInterval.current);
      myInterval.current = null;
    }
  }, [isRunning]);

  const saveSelectedEventsPre = () => {
    props.setLoading(true);
    const newArr = bufferlist.filter(a => a.isOpen == true);
    // console.log("post events",newArr)
    reportController.saveEventsPreupcomming(newArr, (data) => {
      toast.success(data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      props.setLoading(false);
      //MyActivity(activityList);
    });
  }

  const searchSelectedEvent = () => {
    console.log("hey i am running......");
    props.setLoading(true);
    reportController.getBufferData((data) => {
      setBufferList(data.bufferdata);
      setSearchedLeague(data.bufferdata);
      setRapidEventIdList(data.rapidList);
      // setLeagueTotal(data.leagueCount);
      //  setEventTotal(data.eventCount);
      //  setSingleTotal(data.singleCount);
      //  setMixTotal(data.mixCount);
      props.setLoading(false);
    });
  };

  const saveEventManual = (rapidId) => {
    // console.log("ppp", rapidId);
    // props.setLoading(true);
    var filtered = searchedLeague.filter(function (x) { return x.rapidEventId == rapidId; });
    var isMix = filtered[0].isMix;
    var isSingle = filtered[0].isSingle;
    //var isFivePercent = filtered[0].isFivePercentCom;
    //console.log("ppp", filtered);
    // console.log("mix", filtered[0].isMix);
    // console.log("single", filtered[0].isSingle);
    reportController.saveManualEvent(rapidId, isMix, isSingle, (data) => {
      if (data.code == 1) {
        toast.success(data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.error(data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }

      props.setLoading(false);
    });
  }

  const updateSelectedEvent = () => {
    props.setLoading(true);
    const newarr = [];
    //console.log("original",rapidEventIdList);
    rapidEventIdList.map((item) => {
      newarr.push(item.rapidEventId)
    })

    console.log("new id", newarr);
    reportController.updateBufferEvent(newarr, (data) => {
      toast.success(data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      // console.log("new return data",data.bufferdata);
      // console.log("new return rapid",data.rapidList);
    //  setBufferList(data.bufferdata);
     // setSearchedLeague(data.bufferdata);
     // setRapidEventIdList(data.rapidList);
      props.setLoading(false);
    });
    setIsRunning((isRunning) => !isRunning);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSingleChecked = (id) => {
    //const newBufferlist = [...bufferlist];
    //console.log("Bufferlist",bufferlist);
    //console.log("Click Id",id);

    const index = bufferlist.findIndex(v => {
      return v.rapidEventId == id;
    });

    bufferlist[index].isSingle = !bufferlist[index].isSingle;

    setBufferList(bufferlist);
    requestSearch(searchText);
  };

  const handleFivePerChecked = (id) => {
    //const newBufferlist = [...bufferlist];
    //console.log("Bufferlist",bufferlist);
    //console.log("Click Id",id);

    const index = bufferlist.findIndex(v => {
      return v.rapidEventId == id;
    });

    bufferlist[index].isFivePercentCom = !bufferlist[index].isFivePercentCom;

    setBufferList(bufferlist);
    requestSearch(searchText);
  };

  const handleMixChecked = (id) => {
    //const newBufferlist = [...bufferlist];
    //console.log("Bufferlist",bufferlist);
    //console.log("Click Id",id);

    const index = bufferlist.findIndex(v => {
      return v.rapidEventId == id;
    });

    bufferlist[index].isMix = !bufferlist[index].isMix;

    setBufferList(bufferlist);
    requestSearch(searchText);
  };

  const requestSearch = (searchedVal) => {
    setSearchText(searchedVal);
    if (searchedVal.length != 0) {
      const filteredRows = bufferlist.filter((row) => {
        return (
          row.lname.toLowerCase().includes(searchedVal.toLowerCase()) ||
          row.hname.toLowerCase().includes(searchedVal.toLowerCase()) ||
          row.aname.toLowerCase().includes(searchedVal.toLowerCase())
        );
      });
      setSearchedLeague(filteredRows);
    }
    else {
      setSearchedLeague([...bufferlist]);
    }
  };

  const cancelSearch = () => {
    setSearchText("");
    requestSearch("");
  };
 

  const test = () => {
    setIsRunning((isRunning) => !isRunning);
    //Time in milliseconds [1 second = 1000 milliseconds ]    
  }

  //IF you want to stop above timer
  function resetCounter() {
    console.log("hey i am working.....")
    clearInterval(myInterval.current);
    myInterval.current = null;
    setIsRunning(false);
  }
  const fetchUpdateStatus = () => {
    console.log("fetching........")
    reportController.getUpdateStatus((data) => {
      if(data.status == 0){
        setStatusMessage("Api Data Fetching...");
      }
      else if(data.status == 1)
      {
        setStatusMessage(` Data Fetching ${data.message} Completed`);
      }
      else{
        resetCounter();
      }
      // toastId.current=toast.success(data.data, {
      //   toastId: customId,
      //   autoClose: false,
      //   closeButton: false
      // });
    });
  }

  return (
    <>
      <Paper className={classes.root}>
        <div className="d-flex justify-content-between align-items-center"
          style={{ marginBottom: 6, marginTop: 6 }}>
            { 
             isRunning == true ?(<div className="alert alert-success" role="alert">
               {statusMessage} 
             </div>):null
            }
          <h4>Buffer Page Selected Events</h4>
          <SearchBar
            placeholder={"Search "}
            style={{ marginLeft: 15, width: isPhone ? 200 : null }}
            value={searchText}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
        </div>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
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
                      <TableRow hover role="checkbox" tabIndex={-1} key={k}>
                        {/* {columns.map(column => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })} */}
                        <TableCell align={"left"} padding="default">
                          {page > 0 ? k + 1 + rowsPerPage * page : k + 1}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          <span
                            style={{ fontWeight: "bold", color: v.overId == v.homeId ? "red" : "black" }}
                          >{v.hname}
                          </span><br></br>
                          <span
                            style={{ fontWeight: "bold", color: v.overId == v.awayId ? "red" : "black" }}
                          >{v.aname}
                          </span><br></br>
                          <span
                            style={{ color: "#1a61b8" }}
                          >{`${moment(v.date).format("hh:mm:ss a")}/ ${moment(
                            v.date
                          ).format("YYYY-MM-DD")}`}
                          </span>
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.lname}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.bodyhandicap}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          <span style={{ fontWeight: "bold" }}>{v.homeodds}</span><br></br>
                          <span style={{ fontWeight: "bold" }}>{v.awayodds}</span>
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.goalhandicap}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          <span style={{ fontWeight: "bold" }}>{v.overodds}</span><br></br>
                          <span style={{ fontWeight: "bold" }}>{v.underodds}</span>
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.body}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.goal}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          <Checkbox
                            checked={v.isSingle}
                            className={classes.checkbox}
                            onChange={() => handleSingleChecked(v.rapidEventId)}
                            name="checkedAll"
                            color="primary"
                          // disabled={!isView}
                          />
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          <Checkbox
                            checked={v.isMix}
                            className={classes.checkbox}
                            onChange={() => handleMixChecked(v.rapidEventId)}
                            name="checkedAll"
                            color="primary"
                          // disabled={!isView}
                          />
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{
                              backgroundColor: MyColor.secondaryBackground,
                              color: "#fff",
                              minWidth: 50,
                              maxHeight: 40,
                              fontSize: isPhone ? 12 : null,
                            }}
                            onClick={() => saveEventManual(v.rapidEventId)}
                          >
                            Add
                          </button>

                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
          component="div"
          count={bufferlist.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <div className="d-flex justify-content-between align-items-center"
          style={{ marginBottom: "1rem" }}
        >
          <button
            type="button"
            className="btn btn-secondary"
            style={{
              backgroundColor: MyColor.secondaryBackground,
              color: "#fff",
              marginLeft: 10,
              minWidth: 100,
              maxHeight: 40,
              fontSize: isPhone ? 12 : null,
            }}
            onClick={() => updateSelectedEvent()}
          >
            <i className="fa fa-sync"></i> Update
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            style={{
              backgroundColor: MyColor.secondaryBackground,
              color: "#fff",
              marginLeft: 10,
              minWidth: 100,
              maxHeight: 40,
              fontSize: isPhone ? 12 : null,
            }}
            onClick={() => resetCounter()}
          >
            <i className="fa fa-sync"></i> Clear
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            style={{
              backgroundColor: MyColor.secondaryBackground,
              color: "#fff",
              marginRight: 10,
              minWidth: 100,
              maxHeight: 40,
              fontSize: isPhone ? 12 : null,
            }}
            onClick={() => saveSelectedEventsPre()}
          >
            <i className="fas fa-save"></i> Save
          </button>
        </div>
      </Paper>
    </>
  );
});



