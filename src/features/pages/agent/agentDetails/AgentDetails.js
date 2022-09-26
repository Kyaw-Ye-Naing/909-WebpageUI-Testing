// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
// import { MemberDetail } from "./MemberDetail";
// import { MemberTransactions } from "./MemberTransactions";
// import { MemeberSetting } from "./MemberSetting";
// import { userController } from "../../../../controllers/userController/userController";
// import myColor from "../../../../config/color";
// import { toast } from "react-toastify";
// import { Paper } from "@material-ui/core";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function tabProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//     marginTop: 0,
//   },
// }));

// export const AgentDetails = (props) => {
//   let query = useQuery();
//   let id = query.get("id");
//   const classes = useStyles();
//   const [value, setValue] = useState(0);
//   const [userInfo, setUserInfo] = useState([]);
//   const [singleCommission, setSingleCommission] = useState([]);
//   const [mixCommission, setMixCommission] = useState([]);
//   const [showLoading, props.setLoading] = useState(false);

//   const [singleCommission, setSingleCommission] = useState([]);
//   const [singleCommission8, setSingleCommission8] = useState(null);
//   const [singleCommission5, setSingleCommission5] = useState(null);
//   const [commissionForMatch2, setCommissionForMatch2] = useState(null);
//   const [commissionForMatch3, setCommissionForMatch3] = useState(null);
//   const [commissionForMatch4, setCommissionForMatch4] = useState(null);
//   const [commissionForMatch5, setCommissionForMatch5] = useState(null);
//   const [commissionForMatch6, setCommissionForMatch6] = useState(null);
//   const [commissionForMatch7, setCommissionForMatch7] = useState(null);
//   const [commissionForMatch8, setCommissionForMatch8] = useState(null);
//   const [commissionForMatch9, setCommissionForMatch9] = useState(null);
//   const [commissionForMatch10, setCommissionForMatch10] = useState(null);
//   const [commissionForMatch11, setCommissionForMatch11] = useState(null);

//   const [userCommission, setUserCommission] = useState([]);
//   const [ commission8Data,setCommission8Data ]=useState("");
//   const [ commission5Data,setCommission5Data ]=useState("");
//   const [ commissionMatch2Data,setCommissionMatch2Data ]=useState("")
//   const [ commissionMatch3Data,setCommissionMatch3Data ]=useState("")
//   const [ commissionMatch4Data,setCommissionMatch4Data ]=useState("")
//   const [ commissionMatch5Data,setCommissionMatch5Data ]=useState("")
//   const [ commissionMatch6Data,setCommissionMatch6Data ]=useState("")
//   const [ commissionMatch7Data,setCommissionMatch7Data ]=useState("")
//   const [ commissionMatch8Data,setCommissionMatch8Data ]=useState("")
//   const [ commissionMatch9Data,setCommissionMatch9Data ]=useState("")
//   const [ commissionMatch10Data,setCommissionMatch10Data ]=useState("")
//   const [ commissionMatch11Data,setCommissionMatch11Data]=useState("")

//   useEffect(() => {
//     fetchUserDataWithBalance();
//     // userController.getUserInfoAndCommission(
//     //   id,
//     //   (data) => {
//     //     setUserInfo(data[0]);
//     //   },
//     //   (data) => {
//     //     let singleCom = data.filter(function (value) {
//     //       return value.gamblingTypeId === 1;
//     //     });
//     //     setSingleCommission(singleCom);

//     //     let mixCom = data.filter(function (value) {
//     //       return value.gamblingTypeId === 2;
//     //     });
//     //     setMixCommission(mixCom);
//     //   }
//     // );
//   }, []);

//   const fetchUserDataWithBalance = () => {
//     if(userInformation !== null){
//       userController.getUserDataWithBalance(id, (data) => {
//         setUserInfo(data.userInfo);
//         setUserCommission(data.userCommission);
//         const list = data.userCommission;

//        setCommission5Data(list.filter(v => v.betTeamCount == 1 && v.commissionTypeId == 1 )[0].commissionType);
//        setCommission8Data(list.filter(v => v.betTeamCount == 1 && v.commissionTypeId == 2 )[0].commissionType);
//         setCommissionMatch2Data(list.filter(v => v.betTeamCount == 2)[0].commissionType);
//         setCommissionMatch3Data(list.filter(v=> v.betTeamCount == 3)[0].commissionType);
//         setCommissionMatch4Data(list.filter(v=> v.betTeamCount == 4)[0].commissionType);
//         setCommissionMatch5Data(list.filter(v=> v.betTeamCount == 5)[0].commissionType);
//         setCommissionMatch6Data(list.filter(v=> v.betTeamCount == 6)[0].commissionType);
//         setCommissionMatch7Data(list.filter(v=> v.betTeamCount == 7)[0].commissionType);
//         setCommissionMatch8Data(list.filter(v=> v.betTeamCount == 8)[0].commissionType);
//         setCommissionMatch9Data(list.filter(v=> v.betTeamCount == 9)[0].commissionType);
//         setCommissionMatch10Data(list.filter(v=> v.betTeamCount == 10)[0].commissionType);
//         setCommissionMatch11Data(list.filter(v=> v.betTeamCount == 11)[0].commissionType);
//       });
//     }
//   }

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const SaveMemberDetail = () => {
//     // let ObjCommission = [];
//     // singleCommission.forEach((item) => {
//     //   var obj = {};
//     //   obj["CommissionTypeId"] = item.commissionTypeId;
//     //   obj["UserId"] = userInfo.userId;
//     //   obj["SubUserCommission"] = item.subUserCommission;
//     //   ObjCommission.push(obj);
//     // });
//     // mixCommission.forEach((item) => {
//     //   var obj = {};
//     //   obj["CommissionTypeId"] = item.commissionTypeId;
//     //   obj["UserId"] = userInfo.userId;
//     //   obj["SubUserCommission"] = item.subUserCommission;
//     //   ObjCommission.push(obj);
//     // });
//     // let userEditedData = {
//     //   // UserId:userInfo.userId,
//     //   Username: userInfo.userName,
//     //   Password: userInfo.password,
//     //   Lock: userInfo.lock,
//     //   RoleId: userInfo.roleId,
//     //   Mobile: userInfo.mobile,
//     //   SharePercent: userInfo.sharePercent,
//     //   BetLimitForMix: userInfo.betLimitForMix,
//     //   BetLimitForSingle: userInfo.betLimitForSingle,
//     //   // CreatedBy:1,
//     //   // CreatedDate:'2020/11/1',
//     //   commission: Object.assign([], ObjCommission),
//     // };
//     // props.setLoading(true);
//     // userController.editUserInfoAndCommission(
//     //   userInfo.userId,
//     //   userEditedData,
//     //   (data) => {
//     //     toast.success(data.message, {
//     //       position: toast.POSITION.BOTTOM_RIGHT,
//     //     });
//     //     props.setLoading(false);
//     //   }
//     // );
//   };

//   return (
//     <div className={classes.root}>
//       <Paper square position="static">
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           aria-label="simple tabs example"
//         >
//           <Tab label="EDIT USER DATA" {...tabProps(0)} />
//           <Tab label="TRANSACTION" {...tabProps(1)} />
//           <Tab label="SETTINGS" {...tabProps(2)} />
//         </Tabs>
//       </Paper>
//       <TabPanel value={value} index={0}>
//         {showLoading ? (
//           <h3 className="text-center"> Loading...</h3>
//         ) : (
//           <MemberDetail
//             userInfo={userInfo}
//             setUserInfo={setUserInfo}

//             SaveMemberDetail={SaveMemberDetail}
//           />
//         )}
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         <MemberTransactions userId={userInfo.userId} />
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         <MemeberSetting userInfo={userInfo} setUserInfo={setUserInfo} />
//       </TabPanel>
//     </div>
//   );
// };

import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { MemberDetail } from "./MemberDetail";
import { MemberTransactions } from "./MemberTransactions";
import { MemeberSetting } from "./MemberSetting";
import { userController } from "../../../../controllers/userController/userController";
import myColor from "../../../../config/color";
import { toast } from "react-toastify";
import { Paper } from "@material-ui/core";
import moment from "moment";
import AppContext from "../../../../context/AppContext";
import { Edit } from "@material-ui/icons";
import EditMember from "./EditMember";
import { withTheme } from "../../../common/hoc/withTheme";
import { useMediaPredicate } from "react-media-hook";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: 0,
  },
}));

export const AgentDetails = withTheme((props) => {
  const { userData } = useContext(AppContext);
  const loginUserInfo = JSON.parse(userData);
  let query = useQuery();
  let id = query.get("id");
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [userInfo, setUserInfo] = useState([]);
  const [singleCommission, setSingleCommission] = useState([]);
  const [mixCommission, setMixCommission] = useState([]);
  const isPhone = useMediaPredicate("(max-width: 800px)");

  const [newuser, setNewuser] = useState({
    Id: 0,
    userId: "",
    username: "",
    roleId: 0,
    mobile: "",
    balance: 0,
    // sharePercent: 0,
    betLimitForMix: 0,
    betLimitForSingle: 0,
    lock: null,
  });
  const [commission, setCommission] = useState({
    com1: 0,
    com2: 0,
    com3: 0,
    com4: 0,
    com5: 0,
    com6: 0,
    com7: 0,
    com8: 0,
    com9: 0,
    com10: 0,
    com11: 0,
    com12: 0,
  });

  useEffect(() => {
    props.setLoading(true);
    updateAgentData();
    props.setLoading(false);
  }, [userData]);

  const updateAgentData = () => {
    loginUserInfo &&
      userController.getUserInfoAndCommission(
        parseInt(id),
        (data) => {
          const userData = data[0];
          const newdata = { ...newuser };
          newdata["Id"] = userData.userId;
          newdata["userId"] = userData.username;
          newdata["username"] = userData.name;
          newdata["roleId"] = userData.roleId;
          newdata["mobile"] = userData.mobile;
          newdata["balance"] = userData.balance;
          newdata["betLimitForSingle"] = userData.betLimitForSingle;
          newdata["betLimitForMix"] = userData.betLimitForMix;
          newdata["lock"] = userData.lock;
          setNewuser(newdata);
        },
        (comData) => {
          const newCom = { ...commission };
          comData.map((com) => {
            newCom[`com${com.commissionTypeId}`] = com.subUserCommission;
          });
          setCommission(newCom);
        }
      );
    // userController.getUserInfoAndCommission(
    //   id,
    //   (data) => {
    //     setUserInfo(data[0]);
    //   },
    //   (data) => {
    //     let singleCom = data.filter(function (value) {
    //       return value.gamblingTypeId === 1;
    //     });
    //     setSingleCommission(singleCom);

    //     let mixCom = data.filter(function (value) {
    //       return value.gamblingTypeId === 2;
    //     });
    //     setMixCommission(mixCom);
    //     props.setLoading(false);
    //   }
    // );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const SaveMemberDetail = () => {
  //   let ObjCommission = [];
  //   singleCommission.forEach((item) => {
  //     var obj = {};
  //     obj["CommissionTypeId"] = item.commissionTypeId;
  //     obj["UserId"] = userInfo.userId;
  //     obj["SubUserCommission"] = parseFloat(item.subUserCommission);
  //     ObjCommission.push(obj);
  //   });
  //   mixCommission.forEach((item) => {
  //     var obj = {};
  //     obj["CommissionTypeId"] = item.commissionTypeId;
  //     obj["UserId"] = userInfo.userId;
  //     obj["SubUserCommission"] = parseFloat(item.subUserCommission);
  //     ObjCommission.push(obj);
  //   });
  //   let userEditedData = {
  //     UserId: userInfo.userId,
  //     Username: userInfo.userName,
  //     // Password: userInfo.password,
  //     Lock: userInfo.lock,
  //     RoleId: userInfo.roleId,
  //     Mobile: userInfo.mobile,
  //     SharePercent: userInfo.sharePercent,
  //     BetLimitForMix: userInfo.betLimitForMix,
  //     BetLimitForSingle: userInfo.betLimitForSingle,
  //     CreatedBy: loginUserInfo.userId,
  //     // CreatedDate:moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
  //     commission: Object.assign([], ObjCommission),
  //   };
  //   props.setLoading(true);
  //   userController.editUserInfoAndCommission(userEditedData, (data) => {
  //     toast.success(data.message, {
  //       position: toast.POSITION.BOTTOM_RIGHT,
  //     });
  //   });
  //   props.setLoading(false);
  // };

  return (
    <div className={classes.root} style={{ width: isPhone ? "100%" : null }}>
      <Paper square position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="EDIT USER DATA" {...tabProps(0)} />
          <Tab label="TRANSACTION" {...tabProps(1)} />
          <Tab label="SETTINGS" {...tabProps(2)} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        {
          // <MemberDetail
          //   userInfo={userInfo}
          //   setUserInfo={setUserInfo}
          //   singleCommission={singleCommission}
          //   mixCommission={mixCommission}
          //   setSingleCommission={setSingleCommission}
          //   setMixCommission={setMixCommission}
          //   SaveMemberDetail={SaveMemberDetail}
          // />
          <EditMember
            userId={id}
            setLoading={props.setLoading}
            newuser={newuser}
            setNewuser={setNewuser}
            commission={commission}
            setCommission={setCommission}
            updateAgentData={updateAgentData}
          />
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MemberTransactions userId={id} setLoading={props.setLoading} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MemeberSetting
          userInfo={newuser}
          setUserInfo={setNewuser}
          updateAgentData={updateAgentData}
          setLoading={props.setLoading}
          newuser={newuser}
        />
      </TabPanel>
    </div>
  );
});
