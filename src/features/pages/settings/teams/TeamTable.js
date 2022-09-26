import React, { useState, useEffect, useContext } from "react";
import { MyTable } from "../../../common/components/MyTable";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import MyColor from "../../../../config/color";
import { MyTextInput } from "../../../common/components/MyTextInput";
import { Button, Icon, ThemeProvider } from "@material-ui/core";
import MyButton from "../../../common/components/MyButton";
import { userController } from "../../../../controllers/userController/userController";
import { toast } from "react-toastify";
import AppContext from "../../../../context/AppContext";
import { MyActivity } from "../../../common/components/MyActivity";
import Loading from "../../../common/components/Loading";
import { withTheme } from "../../../common/hoc/withTheme";
import SearchBar from "material-ui-search-bar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useMediaPredicate } from "react-media-hook";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${MyColor.secondaryBackground}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const columns = [
  {
    id: "teamId",
    label: "No",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
  {
    id: "englishTeamName",
    label: "Team Name(English)",
    minWidth: 100,
    maxWidth: 150,
    align: "left",
  },
  {
    id: "myanmarTeamName",
    label: "Team Name(Myanmar)",
    minWidth: 70,
    maxWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "edit", label: "", minWidth: 50, maxWidth: 50, align: "center" },
];

const Teams = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  {
    /* edited by kyn --add search button 6-4-2021*/
  }
  const [searchText, setSearchText] = useState("");
  //const [searchedTeam, setSearchedTeam] = useState([]);
  {
    /*-------------*/
  }
  const [mmTeamName, setMmTeamName] = useState(null);
  //const [footballTeamData, setFootballTeamData] = useState([]);
  const { userData } = useContext(AppContext);
  const userInformation = JSON.parse(userData);
  const [league, setLeague] = useState("");
  const [footballTeam, setFootballTeam] = useState([]);
  const [searchFootballTeam, setSearchFootballTeam] = useState([]);
  const [leagueNames, setLeagueNames] = useState([]);
  const isPhone = useMediaPredicate("(max-width: 800px)");

  const teamData = [];

  useEffect(() => {
    // getData()
    userController.getLeaguesForDropdown((value) => {
      value.leagueData.map((v) => {
        var obj = {};
        obj["id"] = v.leagueId;
        obj["name"] = v.leagueName;
        teamData.push(obj);
      });
      setLeagueNames(teamData);
    });
  }, []);

  //  const getData =()=>{
  //   props.setLoading(true);
  //     userController.getFootballTeam((value) => {
  //       let data = value.map((v, k) => {
  //         return {
  //           teamId: k + 1, id: v.footballTeamId, englishTeamName: v.footballTeam, myanmarTeamName: v.footballTeamMyan, leagueId: v.leagueId, rapidTeamId: v.rapidTeamId, edit: "btn"
  //         }
  //       })
  //       setFootballTeamData(data);
  //       setSearchedTeam(data);
  //       props.setLoading(false);
  //     });
  //   }

  const handleOpen = (id) => {
    let result = footballTeam.find(function (value) {
      return value.id === id;
    });
    setModalData(result);
    setMmTeamName(result.myanmarTeamName);
    setOpen(true);
  };

  const editFootballTeam = () => {
    userController.editFootballTeam(modalData.id, mmTeamName, (data) => {
      toast.success("Updated successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      // getData()
      getFootballTeam();
    });
    let oldList = {
      id: modalData.id,
      name: modalData.myanmarTeamName,
    };
    let newList = {
      id: modalData.id,
      name: mmTeamName,
    };
    let activityList = {
      newData: JSON.stringify(newList),
      oldData: JSON.stringify(oldList),
      action: "update",
      remark: null,
      newUser: userInformation.userId,
      pageName: "Update Team Name",
    };
    MyActivity(activityList);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  {
    /* edited by kyn --add search button 6-4-2021*/
  }
  const requestSearch = (searchedVal) => {
    if (searchedVal == "") {
      getFootballTeam();
    } else {
      setSearchText(searchedVal);
      const filteredRows = searchFootballTeam.filter((row) => {
        return row.englishTeamName
          .toLowerCase()
          .includes(searchedVal.toLowerCase());
      });
      setFootballTeam(filteredRows);
    }
  };

  const cancelSearch = () => {
    setSearchText("");
    requestSearch("");
    getFootballTeam();
  };
  {
    /*----------------*/
  }

  const getFootballTeam = () => {
    userController.getFootballTeamWithLeagueId(league.id, (data) => {
      let temp = data.map((v, k) => {
        return {
          teamId: k + 1,
          id: v.footballTeamId,
          englishTeamName: v.footballTeam,
          myanmarTeamName: v.footballTeamMyan,
          leagueId: v.leagueId,
          rapidTeamId: v.rapidTeamId,
          edit: "btn",
        };
      });
      setSearchFootballTeam(temp);
      setFootballTeam(temp);
    });
  };

  return (
    <div
      className="main justify-content-center w-100 p-1"
      style={{ margin: isPhone ? null : "0px 10px" }}
    >
      {/* edited by kyn --add search button 6-4-2021*/}
      <h4 style={{ marginBottom: isPhone ? 20 : 0 }}>Teams</h4>
      <div
        className="d-flex justify-content-between mt-3"
        style={{ flexDirection: isPhone ? "column" : null }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: isPhone ? 10 : null,
          }}
        >
          <Autocomplete
            id="combo-box-demo"
            options={leagueNames}
            onChange={(event, newValue) => {
              setLeague(newValue);
            }}
            getOptionLabel={(option) => option.name}
            style={{ width: isPhone ? 250 : 300, marginRight: 5 }}
            renderInput={(params) => (
              <TextField {...params} label="League Name" variant="outlined" />
            )}
          />
          <button
            type="button"
            className="btn btn-secondary"
            style={{
              backgroundColor: MyColor.secondaryBackground,
              color: "#fff",
              minWidth: 100,
              width: isPhone ? 120 : null,
              height: 50,
              marginRight: isPhone ? 0 : 10,
            }}
            onClick={getFootballTeam}
          >
            <i className="fas fa-search px-2"></i>Search
          </button>
        </div>
        <SearchBar
          style={{ width: isPhone ? 250 : null }}
          value={searchText}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
      </div>
      {/*----------*/}
      <MyTable
        columns={columns}
        // rows={footballTeamData}--edited by kyn --add search button 6-4-2021
        rows={footballTeam}
        maxWidth={""}
        btnText="Edit"
        btnAction={(id) => handleOpen(id)}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Edit Team Name</h2>
            <div id="transition-modal-description">
              <MyTextInput
                label="Team Name(English)"
                fullWidth={true}
                iconName={"fa fa-futbol"}
                disabled={false}
                value={modalData.englishTeamName}
                // onChange={(e) => {
                //   let obj = { ...modalData };
                //   obj[0]["englishTeamName"] = e.target.value;
                //   setModalData(obj);
                // }}
                disabled
              />
              <MyTextInput
                label="Team Name(Myanmar)"
                fullWidth={true}
                iconName={"fa fa-futbol"}
                disabled={false}
                value={mmTeamName}
                onChange={(e) => {
                  setMmTeamName(e.target.value);
                  // let obj = { ...modalData };
                  // obj[0]["myanmarTeamName"] = e.target.value;
                  // setModalData(obj);
                }}
              />
              <MyButton
                fullWidth={true}
                // onClick={() => setOpen(false)}
                onClick={() => editFootballTeam()}
                text={"SAVE"}
                icon={<Icon className="fa fa-save" color="default" />}
              />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default withTheme(Teams);
