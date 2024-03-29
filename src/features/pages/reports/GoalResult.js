import React, { useContext, useEffect, useState, useRef } from "react";
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
import MyButton from "../../common/components/MyButton";
import MyColor from "../../../config/color";
import { TextField, Modal } from "@material-ui/core";
import { reportController } from "../../../controllers/reportController";
import moment from "moment";
import { toast } from "react-toastify";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { MyActivity } from "../../common/components/MyActivity";
import AppContext from "../../../context/AppContext";
import SearchBar from "material-ui-search-bar";
import { useMediaPredicate } from "react-media-hook";
import { useHistory } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';

const GoalResult = (props) => {
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  const classes = useStyles();
  const temp_date = sessionStorage.getItem('goal_result');
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(temp_date === null ? defaultDate : JSON.parse(temp_date).startDate);
  const [endDate, setEndDate] = useState(temp_date === null ? defaultDate : JSON.parse(temp_date).endDate);
  const [homeGoal, setHomeGoal] = useState(null);
  const [awayGoal, setAwayGoal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [postPoned, setPostPoned] = useState(false);
  const [goalResultData, setGoalResultData] = useState([]);
  const { userData } = useContext(AppContext);
  const userInfo = JSON.parse(userData);
  const [searchText, setSearchText] = useState("");
  const [searchedLeague, setSearchedLeague] = useState([]);
  const isPhone = useMediaPredicate("(max-width: 800px)");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const history = useHistory();
  const [isRunning, setIsRunning] = useState(false);
  const [age, setAge] = React.useState(0);
  const [statusMessage, setStatusMessage] = useState("Starting background task....");
  const myInterval = useRef();

  const searchGoalResultData = () => {
    props.setLoading(true);
    setGoalResultData([]);
    reportController.searchGoalResult(startDate, endDate, (data) => {
      const list = data._data.map((v) => v.team).flat();
      const temp = list.sort(function (a, b) {
        return new Date(a.event) - new Date(b.event);
      });
      let valueList = temp.map((v, k) => {
        return {
          id: k + 1,
          btn: "view",
          awayGoal: v.awayGoal,
          awayTeam: v.awayTeam,
          homeGoal: v.homeGoal,
          homeTeam: v.homeTeam,
          homeTeamId: v.homeTeamId,
          awayTeamId: v.awayTeamId,
          eventId: v.eventId,
          leagueName: v.league,
          event:
            moment(v.event).format("hh:mm a") +
            "/ " +
            moment(v.event).format("YYYY-MM-DD"),
        };
      });
      setGoalResultData(valueList);
      setSearchedLeague(valueList);
      props.setLoading(false);
      if (data.processRun) {
        //console.log("is running state change......");
        setIsRunning((isRunning) => !isRunning);
      }
    });
  };

  useEffect(() => {
    props.setLoading(true);
    searchGoalResultData();

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

  const handleChange = (event) => {
    //console.log("searchedLeague", searchedLeague)
    setAge(event.target.value);
    if (event.target.value == 1) {
      searchedLeague.sort((a, b) => {
        let fa = a.leagueName.toLowerCase(),
          fb = b.leagueName.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    }
    if (event.target.value == 0) {
      searchedLeague.sort((a, b) => {
        let da = new Date(a.event),
          db = new Date(b.event);
        return da - db;
      });
      // setSearchedLeague(...selectedEventData);
    }
  };

  const requestSearch = (searchedVal) => {
    setSearchText(searchedVal);
    const filteredRows = goalResultData.filter((row) => {
      return (
        row.homeTeam.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.awayTeam.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.leagueName.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    const temp = filteredRows.map((v, k) => {
      return {
        id: k + 1,
        btn: "view",
        awayGoal: v.awayGoal,
        awayTeam: v.awayTeam,
        homeGoal: v.homeGoal,
        homeTeam: v.homeTeam,
        homeTeamId: v.homeTeamId,
        awayTeamId: v.awayTeamId,
        eventId: v.eventId,
        leagueName: v.leagueName,
        event: v.event,
      };
    });
    setSearchedLeague(temp);
  };

  const cancelSearch = () => {
    setSearchText("");
    requestSearch("");
  };

  const handleUpdate = (id) => {
    setOpen(true);
    let value = goalResultData.find((v) => v.eventId === id);
    setHomeGoal(value.homeGoal);
    setAwayGoal(value.awayGoal);
    setModalData(value);
  };

  const handleSave = () => {
    let dataList = {
      eventId: modalData.eventId,
      homeResult: postPoned ? 0 : parseInt(homeGoal),
      awayResult: postPoned ? 0 : parseInt(awayGoal),
      isPostponed: postPoned,
    };
    let oldList = {
      eventId: modalData.eventId,
      homeResult: postPoned ? 0 : parseInt(homeGoal),
      awayResult: postPoned ? 0 : parseInt(awayGoal),
    };
    let activityList = {
      newData: JSON.stringify(dataList),
      oldData: JSON.stringify(oldList),
      action: "update",
      remark: null,
      newUser: userInfo.userId,
      pageName: "Edit Goal Result",
    };

    if ((isNaN(homeGoal) || isNaN(awayGoal)) && !postPoned) {
      toast.error("Please enter values", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    else {
      reportController.updateGoalResult(dataList, (data) => {
        toast.success(data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        MyActivity(activityList);
        setOpen(false);
        //window.location.reload();
      });
    }
    setIsRunning((isRunning) => !isRunning);
  };

  const onChangeText = (value, name) => {
    let value2 = parseInt(value);
    if (name === "homeGoal") {
      setHomeGoal(value2);
    } else {
      setAwayGoal(value2);
    }

    // if(name === "homeGoal"){
    //   if(typeof value2 != "string"){
    //     setHomeGoal(value2);
    //   }else{
    //     setHomeGoalErr(true);
    //   }
    // }else{
    //   if(typeof value2 != "string"){
    //     setAwayGoal(value2);
    //   }else{
    //     setAwayGoalErr(true);
    //   }
    // }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickView = (eventId) => {
    const obj = {startDate,endDate};
    sessionStorage.setItem("goal_result",JSON.stringify(obj));
    history.push(`/event-with-voucher/${eventId}`);
  };

  //IF you want to stop above timer
  function resetCounter() {
    console.log("reset counter,hey i am working.....")
    clearInterval(myInterval.current);
    myInterval.current = null;
    setIsRunning(false);
  }

  const fetchUpdateStatus = () => {
    //console.log("api fetching........")
    reportController.getUpdateStatusResult("result", (data) => {
      //console.log("api fetching........",data.status)
      if (data.status == "fetching") {
        setStatusMessage("Data saving and background processing .....");
      }
      if(data.status == "finished")
      {
        setStatusMessage(`Data Processing Completed`);
        resetCounter();
        window.location.reload();
      }
      // else {
      //   resetCounter();
      //   window.location.reload();
      // }
    });
  }

  return (
    <div>
      {isPhone ? <h3 style={{ marginLeft: '8px' }}>Goal Result </h3> : <h1 style={{ marginLeft: '8px' }}>Goal Result </h1>}
      {
        isRunning == true ? (<div className="alert alert-success" role="alert">
          {statusMessage}
        </div>) : null
      }
      <Paper className={classes.root}>
        <div className="d-flex p-2 align-items-end flex-wrap">
          <div className="d-flex">
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
                fontSize: isPhone ? 12 : null,
              }}
              onClick={() => searchGoalResultData()}
            >
              <i className="fas fa-search px-2"></i>Search
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="d-flex align-items-center flex-warp">
            <SearchBar
              placeholder={"Search "}
              value={searchText}
              style={{ marginLeft: 15, width: isPhone ? 150 : null }}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={0}>Time</MenuItem>
                <MenuItem value={1}>League</MenuItem>
              </Select>
            </FormControl>
            <Tooltip title={
                <React.Fragment>
                  <span>PP : PostPoned</span><br/>
                  <span>NE : NotEnded</span><br/>
                  <span>CC : Cancelled</span>
                </React.Fragment>
            }>
        <IconButton aria-label="PP : PostPoned <br/> NE : NotEnded">
          <InfoIcon />
        </IconButton>
      </Tooltip>
          </div>
          {/* <div style={{ fontWeight: "bold", fontSize: isPhone ? 13 : null }}>
            <span> i </span>
          </div> */}
        </div>

        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    colSpan={column.colspan ? 2 : null}
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
                          {v.leagueName}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.homeTeam}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.homeGoal}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.awayGoal}
                        </TableCell>
                        <TableCell align={"left"} padding="default">
                          {v.awayTeam}
                        </TableCell>
                        <TableCell align={"left"} padding="default" style={{display : 'flex'}}>
                          <button
                            className="btn btn-primary mr-2"
                            onClick={() => handleUpdate(v.eventId)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleClickView(v.eventId)}
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={searchedLeague.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

        {/* <MyTable
          columns={columns}
          rows={searchedLeague}
          maxWidth={"600"}
          btnAction={handleUpdate}
          btnText="Edit"
        /> */}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <div className="row justify-content-between pt-2">
              <h4>Edit Goal Result</h4>
              <div onClick={() => setOpen(false)}>
                <i className="fa fa-window-close" aria-hidden="true"></i>
              </div>
            </div>
            <hr />
            <div className="container">
              <div className="row pb-2 justify-content-center">
                <TextField
                  id="standard-basic"
                  label="Home Team's Goal"
                  type="number"
                  fullWidth={true}
                  value={homeGoal}
                  disabled={postPoned ? true : false}
                  name="homeGoal"
                  onChange={(e) => onChangeText(e.target.value, e.target.name)}
                />
              </div>
              <div className="row pt-2 justify-content-center">
                <TextField
                  id="standard-basic"
                  label="Away Team's Goal"
                  type="number"
                  fullWidth={true}
                  value={awayGoal}
                  disabled={postPoned ? true : false}
                  name="awayGoal"
                  onChange={(e) => onChangeText(e.target.value, e.target.name)}
                />
              </div>
              <div className="row pt-2">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={postPoned}
                      onChange={() => setPostPoned(!postPoned)}
                      name="postPoned"
                      color="primary"
                    />
                  }
                  label="Post Poned"
                />
              </div>
            </div>
            <div className="pt-3 row justify-content-center">
              <MyButton onClick={handleSave} text={"Save"} fullWidth={false} />
            </div>
          </div>
        </Modal>
      </Paper>
    </div>
  );
};

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
    label: "Home",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
  {
    id: "result",
    label: "Result",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
    colspan : true
  },
  // {
  //   id: "awayGoal",
  //   label: "Away Goal",
  //   minWidth: 50,
  //   maxWidth: 50,
  //   align: "left",
  // },
  {
    id: "awayTeam",
    label: "Away",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
  {
    id: "btn",
    label: "",
    minWidth: 50,
    maxWidth: 50,
    align: "center",
  },
];

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

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
    minWidth: 80,
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
}));

export default withTheme(GoalResult);
