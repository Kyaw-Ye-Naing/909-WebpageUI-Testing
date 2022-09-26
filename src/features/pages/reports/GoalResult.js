import React, { useContext, useEffect, useState } from "react";
import { withTheme } from "../../common/hoc/withTheme";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { MyTable } from "../../common/components/MyTable";
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
import { ExpandedRow } from "./components";
import { reportController } from "../../../controllers/reportController";
import moment from "moment";
import { toast } from "react-toastify";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { MyActivity } from "../../common/components/MyActivity";
import AppContext from "../../../context/AppContext";
import SearchBar from "material-ui-search-bar";
import { useMediaPredicate } from "react-media-hook";
import { useHistory } from "react-router-dom";

const GoalResult = (props) => {
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(defaultDate);
  const [homeGoal, setHomeGoal] = useState(null);
  const [awayGoal, setAwayGoal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [postPoned, setPostPoned] = useState(false);
  const [endDate, setEndDate] = useState(defaultDate);
  const [goalResultData, setGoalResultData] = useState([]);
  const { userData } = useContext(AppContext);
  const userInfo = JSON.parse(userData);
  const [searchText, setSearchText] = useState("");
  const [searchedLeague, setSearchedLeague] = useState([]);
  const isPhone = useMediaPredicate("(max-width: 800px)");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const history = useHistory();

  const searchGoalResultData = () => {
    props.setLoading(true);
    setGoalResultData([]);
    reportController.searchGoalResult(startDate, endDate, (data) => {
      const list = data.map((v) => v.team).flat();
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
    });
  };

  useEffect(() => {
    props.setLoading(true);
    searchGoalResultData();
    //getGoalResultData();
  }, []);

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
        window.location.reload();
      });
    }
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
    history.push(`/event-with-voucher/${eventId}`);
  };

  return (
    <div>
      {isPhone ? <h3>Goal Result</h3> : <h1>Goal Result</h1>}
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
                fontSize: isPhone ? 12 : null,
              }}
              onClick={() => searchGoalResultData()}
            >
              <i className="fas fa-search px-2"></i>Search
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <SearchBar
            placeholder={"Search "}
            value={searchText}
            style={{ marginLeft: 15, width: isPhone ? 200 : null }}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
          <h6 style={{ fontWeight: "bold", fontSize: isPhone ? 13 : null }}>
            PP = "PostPoned",NE = "Not Ended"
          </h6>
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
                        <TableCell align={"left"} padding="default">
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
    label: "Home Team",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
  {
    id: "homeGoal",
    label: "Home Goal",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
  {
    id: "awayGoal",
    label: "Away Goal",
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

export default withTheme(GoalResult);
