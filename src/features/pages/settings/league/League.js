import React, { useState, useEffect, useContext } from "react";
import { MyTable } from "../../../common/components/MyTable";
import { userController} from "../../../../controllers/userController/userController";
import {reportController} from "../../../../controllers/reportController/reportController";
import { toast } from "react-toastify";
import AppContext from "../../../../context/AppContext";
import { MyActivity } from "../../../common/components/MyActivity";
import {
  FormControl,
  Checkbox,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";
import { Button, TextBox } from "../../../common/components/Components";
import SearchBar from "material-ui-search-bar";
import { withTheme } from "../../../common/hoc/withTheme";
import { tokenIncrease } from "../../../../controllers/userController";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  checkbox: {
    padding: "5px 5px",
    // marginRight: "3px"
  },
}));

const columns = [
  { id: "no", label: "No", minWidth: 50, maxWidth: 50, align: "left" },
  {
    id: "leagueName",
    label: "League",
    minWidth: 100,
    maxWidth: 150,
    align: "left",
  },
  { id: "btn", label: "Action", minWidth: 50, maxWidth: 50, align: "center" },
];

function createData(no, id, leagueName, add) {
  return { no, id, leagueName, add };
}

// const rows = [
//   createData(1, 1, "Esoccer Live Arena", "btn"),
//   createData(2, 2, "Esoccer Battle", "btn"),
//   createData(3, 3, "Japan Cup", "btn"),
//   createData(4, 4, "Hong Kong Premier League", "btn"),
//   createData(5, 5, "Australia NPL Queensland", "btn"),
//   createData(6, 6, "Japan J-League", "btn"),
//   createData(7, 7, "Kazakhstan Premier League", "btn"),
//   createData(8, 8, "China Super League", "btn"),
//   createData(9, 9, "China Division 1", "btn"),
//   createData(10, 10, "Vietnam Division 2", "btn"),
//   createData(11, 11, "Vietnam Championship Women", "btn"),
// ];

const confirmColumns = [
  { id: "no", label: "No", minWidth: 50, maxWidth: 50, align: "left" },
  {
    id: "teamName",
    label: "Team",
    minWidth: 100,
    maxWidth: 150,
    align: "left",
  },
  {
    id: "eventTime",
    label: "Event Time",
    minWidth: 20,
    maxWidth: 150,
    align: "left",
  },
  { id: "btn1", label: "Mix", minWidth: 40, maxWidth: 40, align: "left" },
  { id: "btn", label: "Single", minWidth: 40, maxWidth: 40, align: "left" },
  { id: "btn2", label: "5%Com", minWidth: 40, maxWidth: 40, align: "left" },
];

export const League = withTheme((props) => {
  const [confirmRows, setConfirmRows] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [allLeagueData, setAllLeagueData] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [isView, setIsView] = useState(false);
  const { userData, setuserData, state1, setState1 } = useContext(AppContext);
  const userInformation = JSON.parse(userData);
  const classes = useStyles();
  const [selectedLeague, setSelectedLeague] = useState(0);
  const [singleCount, setSingleCount] = useState(0);
  const [mixCount, setMixCount] = useState(0);
  const [checkAllSingle, setCheckAllSingle] = useState(false);
  const [checkAllMix, setCheckAllMix] = useState(false);
  const [checkAllFivePercent, setCheckAllFivePercent] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedLeague, setSearchedLeague] = useState([]);
  const [buttonClick, setButtonClick] = useState(0);

  const history = useHistory();

  useEffect(() => {
    props.setLoading(true);
    if (userInformation) {
      userInformation.teamCount = 0;
    }
    userController.getLeagues((value) => {
      let data = value.map((v, k) => {
        return {
          no: k + 1,
          btn: "view",
          // id: v.leagueId,
          id: k,
          leagueId: v.leagueId,
          leagueName: v.leagueName,
          rapidLeagueId: v.rapidLeagueId,
          eventDetails: v.eventDetails.map((vv) => {
            return {
              upcommingEventId: vv.upcommingEventId,
              rapidEventId: vv.rapidEventId,
              homeTeam: vv.homeTeam,
              homeTeamId: vv.homeTeamId,
              awayTeamId: vv.awayTeamId,
              awayTeam: vv.awayTeam,
              eventDate: vv.eventDate,
              eventTime: vv.eventTime,
              // eventTime: vv.eventTime,
              // check: vv.check,
              isSingle: vv.isSingle,
              isMix: vv.isMix,
              isFivePercent: vv.isFivePercent,
            };
          }),
        };
      });
      calculateSelectedTeamCount(data);
      setAllLeagueData(data);
      setSearchedLeague(data);
      props.setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (userInformation && userInformation.roleId == 1) {
      tokenIncrease(userInformation.username, setuserData);
    }
  }, [buttonClick]);

  const teamAdd = (id) => {
    setSelectedLeague(id);
    setIsView(true);
    const events = [...allLeagueData[id].eventDetails];
    const teamsTable = events.map((data, index) => {
      return {
        btn: "check",
        btn1: "check1",
        btn2: "check2",
        isMix: data.isMix,
        no: index + 1,
        isSingle: data.isSingle,
        isFivePercent: data.isFivePercent,
        id: index,
        rapidEventId: data.rapidEventId,
        homeTeam: data.homeTeam,
        homeTeamId: data.homeTeamId,
        awayTeam: data.awayTeam,
        awayTeamId: data.awayTeamId,
        eventDate: moment(data.eventDate).format("YYYY-MM-DD HH:mm:ss A"),
        eventTime: moment(data.eventTime).format("YYYY-MM-DD HH:mm:ss A"),
        teamName: data.homeTeam + " VS " + data.awayTeam,
      };
    });
    setConfirmRows(teamsTable);
  };

  const handleAdd = (id) => {
    teamAdd(id);
    setButtonClick(buttonClick + 1);
    setCheckAllSingle(false);
    setCheckAllMix(false);
    setCheckAllFivePercent(false);
  };

  // const handleAdd = (id) => {
  //   //setCheckedAll(false);
  //   setIsView(true);
  //   let objArray = [...allLeagueData];
  //   //  /*objArray.find((o) => o.id === id).*/btn = "View";
  //   setAllLeagueData(objArray);

  //   let selectLeague = allLeagueData.filter((v) => v.id === id);
  //   let temp = selectLeague.map((vv) => {
  //     return {
  //       id: vv.id,
  //       leagueName: vv.leagueName,
  //       rapidLeagueId: vv.rapidLeagueId,
  //     };
  //   });

  //   let addData = selectLeague
  //     .map((v) => v.eventDetails)[0]
  //     .map((vv, k) => {
  //       const temp2 = { ...temp[0] };
  //       return {
  //         btn: "check",
  //         btn1: "check1",
  //         isMix: vv.isMix,
  //         no: k + 1,
  //         check: vv.check,
  //         leagueId: temp2.id,
  //         leagueName: temp2.leagueName,
  //         id: vv.upcommingEventId,
  //         rapidEventId: vv.rapidEventId,
  //         homeTeam: vv.homeTeam,
  //         homeTeamId: vv.homeTeamId,
  //         awayTeam: vv.awayTeam,
  //         awayTeamId: vv.awayTeamId,
  //         eventDate: moment(vv.eventDate).format("YYYY-MM-DD HH:mm:ss A"),
  //         eventTime: moment(vv.eventTime).format("YYYY-MM-DD HH:mm:ss A"),
  //         rapidLeagueId: temp2.rapidLeagueId,
  //         teamName: vv.homeTeam + " VS " + vv.awayTeam,
  //       };
  //     });
  //   setConfirmRows(addData);

  //   let selectedTeam = addData.filter((v) => v.check === true).length;
  //   userInformation.teamCount = selectedTeam;
  //   setuserData(JSON.stringify(userInformation));
  // };

  const handleCheck = (id, type) => {
    let newAllLeague = [...allLeagueData];
    let newConfirm = [...confirmRows];
    if (type === "mix") {
      newAllLeague[selectedLeague].eventDetails[id].isMix =
        !newAllLeague[selectedLeague].eventDetails[id].isMix;
    } else if (type === "FivePercent") {
      newAllLeague[selectedLeague].eventDetails[id].isFivePercent =
        !newAllLeague[selectedLeague].eventDetails[id].isFivePercent;
    } else {
      newAllLeague[selectedLeague].eventDetails[id].isSingle =
        !newAllLeague[selectedLeague].eventDetails[id].isSingle;
      let temp = newAllLeague[selectedLeague].eventDetails[id].isSingle;
      let temp1 = newAllLeague[selectedLeague].eventDetails.filter(
        (f) => f.isSingle == true
      );
      setState1(temp === true ? "5%Com" : temp1.length > 0 ? "5%Com" : null);
    }
    // newAllLeague[selectedLeague].eventDetails[id].check =
    //   newAllLeague[selectedLeague].eventDetails[id].isSingle ||
    //   newAllLeague[selectedLeague].eventDetails[id].isMix
    //     ? true
    //     : false;
    setAllLeagueData(newAllLeague);
    calculateSelectedTeamCount(newAllLeague);
    teamAdd(selectedLeague);
  };

  // const handleCheck = (id, type) => {
  //   checkedList.push(id);

  //   let allLeague = [...allLeagueData];
  //   for (var i = 0; i < allLeague.length; i++) {
  //     for (var k = 0; k < allLeague[i].eventDetails.length; k++) {
  //       if (allLeague[i].eventDetails[k].upcommingEventId === id) {
  //         if (type === "mix") {
  //           if (allLeague[i].eventDetails[k].isMix === false) {
  //             allLeague[i].eventDetails[k].isMix = true;
  //           } else {
  //             allLeague[i].eventDetails[k].isMix = false;
  //           }
  //           setAllLeagueData(allLeague);
  //         } else {
  //           if (allLeague[i].eventDetails[k].check === false) {
  //             allLeague[i].eventDetails[k].check = true;
  //           } else {
  //             allLeague[i].eventDetails[k].check = false;
  //           }
  //           setAllLeagueData(allLeague);
  //         }
  //       }
  //     }
  //   }
  //   let confirm = [...confirmRows];
  //   for (var i = 0; i < confirm.length; i++) {
  //     if (confirm[i].id === id) {
  //       if (confirm[i].check === false) {
  //         confirm[i].check = true;
  //         setConfirmRows(confirm);
  //       } else {
  //         confirm[i].check = false;
  //         setConfirmRows(confirm);
  //       }
  //     }
  //   }
  //   userInformation.teamCount = confirm.filter(
  //     (chk) => chk.check === true
  //   ).length;
  //   setuserData(JSON.stringify(userInformation));
  // };

  const saveLeaguesData = () => {
   // e.preventDefault();
    props.setLoading(true);
    if (singleCount > 0 || mixCount > 0) {
      // setShowLoading(true);
      const selectedLeagueDataList = [];

      allLeagueData.forEach((leagueData) => {
        const selectedEventDetails = [];
        leagueData.eventDetails.forEach((eventDetail) => {
          if (eventDetail.isSingle || eventDetail.isMix) {
            selectedEventDetails.push(eventDetail);
          }
        });
        if (selectedEventDetails.length > 0) {
          selectedLeagueDataList.push({
            leagueId: leagueData.leagueId,
            leagueName: leagueData.leagueName,
            rapidLeagueId: leagueData.rapidLeagueId,
            eventDetails: selectedEventDetails.map((eventDetail) => {
              // delete eventDetail.check;
              return eventDetail;
            }),
          });
        }
      });
      let newData = selectedLeagueDataList
        .map((v) => JSON.stringify(v))
        .toString();
      let activityList = {
        newData: newData,
        oldData: null,
        action: "save",
        remark: null,
        newUser: userInformation.userId,
        pageName: "Add League",
      };
      // userController.fetchSaveLeagues(selectedLeagueDataList, (data) => {
      //   toast.success(data.messsage, {
      //     position: toast.POSITION.BOTTOM_RIGHT,
      //   });
      //   props.setLoading(false);
      //   MyActivity(activityList);
      // });
      
      reportController.saveBufferData(selectedLeagueDataList, (data) => {
        toast.success(data.messsage, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        props.setLoading(false);
        MyActivity(activityList);
        history.push("/settings/selectedLeague");
      });
      
    } else {
      toast.warning("Please Select Team!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      props.setLoading(false);
    }
    
  };

  const calculateSelectedTeamCount = (alldata) => {
    let single = 0,
      mix = 0;
    alldata.map((league) => {
      league.eventDetails.map((teams) => {
        if (teams.isSingle) {
          single++;
        }
        if (teams.isMix) {
          mix++;
        }
      });
    });
    setSingleCount(single);
    setMixCount(mix);
  };

  const handleCheckedAll = (type) => {
    let newAllLeague = [...allLeagueData];
    if (type === "mix") {
      newAllLeague[selectedLeague].eventDetails.map((data) => {
        data.isMix = !checkAllMix;
      });
      setCheckAllMix(!checkAllMix);
    } else if (type === "FivePercent") {
      newAllLeague[selectedLeague].eventDetails.map((data) => {
        data.isFivePercent = !checkAllFivePercent;
      });
      setCheckAllFivePercent(!checkAllFivePercent);
    } else {
      newAllLeague[selectedLeague].eventDetails.map((data) => {
        data.isSingle = !checkAllSingle;
      });
      setCheckAllSingle(!checkAllSingle);
      let temp = checkAllSingle;
      setState1(temp === false ? "5%Com" : null);
    }
    // newAllLeague[selectedLeague].eventDetails.map((data) => {
    //   data.check = data.isMix || data.isSingle ? true : false;
    // });
    setAllLeagueData(newAllLeague);
    calculateSelectedTeamCount(newAllLeague);
    teamAdd(selectedLeague);

    // let confirm = [...confirmRows];
    // for (var i = 0; i < confirm.length; i++) {
    //   if (!checkedAll) {
    //     confirm[i].check = true;
    //     setConfirmRows(confirm);
    //   } else {
    //     confirm[i].check = false;
    //     setConfirmRows(confirm);
    //   }
    // }
    // userInformation.teamCount = confirm.length;
    // setuserData(JSON.stringify(userInformation));
  };

  const requestSearch = (searchedVal) => {
    setSearchText(searchedVal);
    const filteredRows = allLeagueData.filter((row) => {
      return row.leagueName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setSearchedLeague(filteredRows);
  };

  const cancelSearch = () => {
    setSearchText("");
    requestSearch("");
  };

  return (
    <div className="main justify-content-center w-100 p-1">
      <ConfirmBoxModal saveLeaguesData={saveLeaguesData} />
      <form>
        <div className="d-flex justify-content-end">
          <label className="text-secondary px-1 ml-5">
            {`${mixCount} ${mixCount > 1 ? "mix teams" : "mix team"} selected `}
          </label>
          <label className="text-secondary px-1">
            {`${singleCount} ${
              singleCount > 1 ? "single teams" : "single team"
            } selected `}
          </label>
        </div>
        <div className="col-md-4 col-6">
          <SearchBar
            value={searchText}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
        </div>

        <div className="d-flex mt-2 flex-wrap">
          <div className="col-md-12 col-lg-6 col-12 p-1">
            <div className="row px-3 ml-1">
              <h4>League</h4>
            </div>

            <MyTable
              columns={columns}
              rows={searchedLeague}
              maxWidth={"600"}
              btnText="View"
              btnAction={(id) => handleAdd(id)}
            />
          </div>

          <div className="col-md-12 col-lg-6 col-12 p-1">
            <div className="row justify-content-between py-0 px-3">
              <div>
                <h4>Team</h4>
              </div>
              <div className="">
                <label className="px-1">Select All Mix</label>
                <Checkbox
                  checked={checkAllMix}
                  className={classes.checkbox}
                  onChange={() => handleCheckedAll("mix")}
                  name="checkedAll"
                  color="primary"
                  disabled={!isView}
                />
                <label className="px-1">Select All Single</label>
                <Checkbox
                  checked={checkAllSingle}
                  className={classes.checkbox}
                  onChange={() => handleCheckedAll("single")}
                  name="checkedAll"
                  color="primary"
                  disabled={!isView}
                />
                {checkAllSingle == true ? (
                  <>
                    <label className="px-1">Select All 5%Com</label>
                    <Checkbox
                      checked={checkAllFivePercent}
                      className={classes.checkbox}
                      onChange={() => handleCheckedAll("FivePercent")}
                      name="checkedAll"
                      color="primary"
                      disabled={!isView}
                    />
                  </>
                ) : null}
              </div>
            </div>
            <MyTable
              columns={confirmColumns}
              rows={confirmRows}
              maxWidth={"600"}
              btnAction={handleCheck}
              // btnText="Remove"
            />
          </div>
        </div>
        <div>
          <button className="btn btn-primary mt-1 p-2 w-100" 
          type="button"
          data-toggle="modal" 
          data-target="#confirmModal"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
});

export function ConfirmBoxModal({
  saveLeaguesData
}) {

  return (
    <div className="row">
      <div
        className="modal fade"
        id="confirmModal"
        tabIndex="-1"
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
              <span style={{color:"black",fontWeight:"bold",fontSize:"15px"}}><i className="fas fa-times-circle mr-1" style={{color:"red"}}></i>Are you sure you want to save this events?</span> <br />
              <span style={{color:"grey",fontSize:"12px",marginLeft:"15px"}}>
                This change will reflect in your modal after an minute.
              </span>
              <div className="d-flex justify-content-end mt-1">
                <button
                  type="button"
                  data-dismiss="modal"
                  style={{marginRight:2}}
                  className="btn btn-danger"
                  //onClick={() => saveLeaguesData("cancelS")}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() =>
                    saveLeaguesData()
                  }
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
