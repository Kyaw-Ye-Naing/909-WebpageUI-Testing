// import { Button, Icon } from "@material-ui/core";
// import React, { useContext, useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import AppContext from "../../../../context/AppContext";
// import MyButton from "../../../common/components/MyButton";
// import { userController } from "../../../../controllers/userController";
// import {
//   BasicInfoForCreate,
//   BetLimitation,
//   MixBetCommission,
//   SingleBetCommisson,
// } from "../agentDetails/components";
// import {toast} from "react-toastify";
// import {MyActivity} from "../../../common/components/MyActivity";

// export class MemberDetail extends React.Component{
//   static contextType = AppContext;
 
//   constructor(props){
//     super(props);
//     this.state = {
//       userInfo: {},
//       oldData:[],

//       userName: null,
//       password: null,
//       roleId: null,
//       mobile: null,
//       lock: false,
//       sharePercent: null,

//       singleCommission: null,
//       mixCommission: null,
//       singleCommission5: null,
//       singleCommission8: null,
//       commissionForMatch2: null,
//       commissionForMatch3: null,
//       commissionForMatch4: null,
//       commissionForMatch5: null,
//       commissionForMatch6: null,
//       commissionForMatch7: null,
//       commissionForMatch8: null,
//       commissionForMatch9: null,
//       commissionForMatch10: null,
//       commissionForMatch11: null,

//       userCommission: [],
//       commission5Data: "",
//       commission8Data: "",
//       commissionMatch2Data: "",
//       commissionMatch3Data: "",
//       commissionMatch4Data: "",
//       commissionMatch5Data: "",
//       commissionMatch6Data: "",
//       commissionMatch7Data: "",
//       commissionMatch8Data: "",
//       commissionMatch9Data: "",
//       commissionMatch10Data: "",
//       commissionMatch11Data: "",

//       commission5Error: false,
//       commission8Error: false,
//       commissionMatch2Error: false,
//       commissionMatch3Error: false,
//       commissionMatch4Error: false,
//       commissionMatch5Error: false,
//       commissionMatch6Error: false,
//       commissionMatch7Error: false,
//       commissionMatch8Error: false,
//       commissionMatch9Error: false,
//       commissionMatch10Error: false,
//       commissionMatch11Error: false
//     };

//   }

  

//   componentDidMount(){
//     this.fetchUserDataWithBalance();
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//       if (this.state.singleCommission5 !== nextState.singleCommission5) {
//           return true
//       } else if (this.state.singleCommission8 !== nextState.singleCommission8) {
//           return true
//       } else if(this.state.commissionForMatch2 !== nextState.commissionForMatch2){
//         return true
//       } else if(this.state.commissionForMatch3 !== nextState.commissionForMatch3){
//         return true
//       } else if(this.state.commissionForMatch4 !== nextState.commissionForMatch4){
//         return true
//       } else if(this.state.commissionForMatch5 !== nextState.commissionForMatch5){
//         return true
//       } else if(this.state.commissionForMatch6 !== nextState.commissionForMatch6){
//         return true
//       } else if(this.state.commissionForMatch7 !== nextState.commissionForMatch7){
//         return true
//       } else if(this.state.commissionForMatch8 !== nextState.commissionForMatch8){
//         return true
//       } else if(this.state.commissionForMatch9 !== nextState.commissionForMatch9){
//         return true
//       } else if(this.state.commissionForMatch10 !== nextState.commissionForMatch10){
//         return true
//       } else if(this.state.commissionForMatch11 !== nextState.commissionForMatch11){
//         return true
//       } else if(this.state.userInfo !== nextState.userInfo){
//         return true
//       } 
//       else {
//           return false
//       }
//   }


//   fetchUserDataWithBalance = () => {
//     let query = new URLSearchParams(window.location.search);
//     let id = query.get("id");
//     let userId = parseInt(id);
//     const contextData = this.context.userData;
//     const userInformation = JSON.parse(contextData);

//     ///////commission control
//     if(userInformation !== null){
//       userController.getUserDataWithBalance(userInformation.userId, (data) => {

//         this.setState({ userCommission:data.userCommission});
//         const list = data.userCommission;

//         this.setState({ 
//             commission5Data: list.find(v => v.betTeamCount == 1).subUserCommission,
//             commission8Data: list.find(v => v.betTeamCount == 0).subUserCommission,
//             commissionMatch2Data: list.find(v => v.betTeamCount == 2).subUserCommission,
//             commissionMatch3Data: list.find(v=> v.betTeamCount == 3).subUserCommission,
//             commissionMatch4Data: list.find(v=> v.betTeamCount == 4).subUserCommission,
//             commissionMatch5Data: list.find(v=> v.betTeamCount == 5).subUserCommission,
//             commissionMatch6Data: list.find(v=> v.betTeamCount == 6).subUserCommission,
//             commissionMatch7Data: list.find(v=> v.betTeamCount == 7).subUserCommission,
//             commissionMatch8Data: list.find(v=> v.betTeamCount == 8).subUserCommission,
//             commissionMatch9Data: list.find(v=> v.betTeamCount == 9).subUserCommission,
//             commissionMatch10Data: list.find(v=> v.betTeamCount == 10).subUserCommission,
//             commissionMatch11Data: list.find(v=> v.betTeamCount == 11).subUserCommission
//         });
//       });
//     }
//     ////////get all user info
//     userController.getUserDataWithBalance(userId, (data) => {
      
//       const contextData = this.context.userData;
//       const userInformation = JSON.parse(contextData);

//       const list = data.userCommission;
//       if(list.length>0){
//         this.setState({ 
//           userInfo: data.userInfo[0],
//           oldData: {
//             userInfo: data.userInfo,
//             userCommission: data.userCommission,
//           },

//           singleCommission5: list.find(v => v.betTeamCount == 1).subUserCommission.toString(),
//           singleCommission8: list.find(v => v.betTeamCount == 0).subUserCommission.toString(),
//           commissionForMatch2: list.find(v => v.betTeamCount == 2).subUserCommission.toString(),
//           commissionForMatch3: list.find(v=> v.betTeamCount == 3).subUserCommission.toString(),
//           commissionForMatch4: list.find(v=> v.betTeamCount == 4).subUserCommission.toString(),
//           commissionForMatch5: list.find(v=> v.betTeamCount == 5).subUserCommission.toString(),
//           commissionForMatch6: list.find(v=> v.betTeamCount == 6).subUserCommission.toString(),
//           commissionForMatch7: list.find(v=> v.betTeamCount == 7).subUserCommission.toString(),
//           commissionForMatch8: list.find(v=> v.betTeamCount == 8).subUserCommission.toString(),
//           commissionForMatch9: list.find(v=> v.betTeamCount == 9).subUserCommission.toString(),
//           commissionForMatch10: list.find(v=> v.betTeamCount == 10).subUserCommission.toString(),
//           commissionForMatch11: list.find(v=> v.betTeamCount == 11).subUserCommission.toString(),
 
//         });
//       }else {
//         this.setState({ 
//           userInfo: data.userInfo[0],
//           oldData: {
//             userInfo: data.userInfo,
//             userCommission: data.userCommission,
//           }
//         });
//       }
     
//     });

//   }

//   editMemeberDetail = () => {
//     let query = new URLSearchParams(window.location.search);
//     let id = query.get("id");

//     const contextData = this.context.userData;
//     const userInformation = JSON.parse(contextData);

//       const {singleCommission5, singleCommission8, commissionForMatch2, commissionForMatch3, commissionForMatch4, commissionForMatch5, commissionForMatch6, commissionForMatch7,
//         commissionForMatch8, commissionForMatch9, commissionForMatch10, commissionForMatch11, commission5Error, commission8Error, commissionMatch2Error, commissionMatch3Error, commissionMatch4Error, commissionMatch5Error,
//         commissionMatch6Error, commissionMatch7Error, commissionMatch8Error, commissionMatch9Error, commissionMatch10Error, commissionMatch11Error}= this.state;

//       if(commission5Error || commission8Error || commissionMatch2Error || commissionMatch3Error || commissionMatch4Error ||commissionMatch5Error ||
//         commissionMatch6Error || commissionMatch7Error || commissionMatch8Error || commissionMatch9Error || commissionMatch10Error || commissionMatch11Error){
//         toast.error("Wrong Input!", {
//           position: toast.POSITION.BOTTOM_RIGHT
//         });
//       }
//       else{
//             let objCommission = [
//               {commissionTypeId: 1, subUserCommission: parseInt(singleCommission5)},
//               {commissionTypeId: 2, subUserCommission: parseInt(singleCommission8)},
//               {commissionTypeId: 3, subUserCommission: parseInt(commissionForMatch2)},
//               {commissionTypeId: 4, subUserCommission: parseInt(commissionForMatch3)},
//               {commissionTypeId: 5, subUserCommission: parseInt(commissionForMatch4)}, 
//               {commissionTypeId: 6, subUserCommission: parseInt(commissionForMatch5)},
//               {commissionTypeId: 7, subUserCommission: parseInt(commissionForMatch6)}, 
//               {commissionTypeId: 8, subUserCommission: parseInt(commissionForMatch7)}, 
//               {commissionTypeId: 9, subUserCommission: parseInt(commissionForMatch8)}, 
//               {commissionTypeId: 10, subUserCommission: parseInt(commissionForMatch9)}, 
//               {commissionTypeId: 11, subUserCommission: parseInt(commissionForMatch10)}, 
//               {commissionTypeId: 12, subUserCommission: parseInt(commissionForMatch11)},      
//           ];
//           let userData = {
//             userId: parseInt(id),
//             userName: this.state.userInfo.userName,
//             //password: this.state.userInfo.password,
//             lock: this.state.userInfo.lock,
//             roleId: parseInt(this.state.userInfo.roleId),
//             mobile: this.state.userInfo.mobile,
//             sharePercent: parseInt(this.state.userInfo.sharePercent),
//             betLimitForMix: parseInt(this.state.userInfo.betLimitForMix),
//             createdBy: userInformation.userId,
//             betLimitForSingle: parseInt(this.state.userInfo.betLimitForSingle),
//             commission: objCommission
//           }
//           let newStr = JSON.stringify(userData);
//           let oldStr = JSON.stringify(this.state.oldData);
//           let activityList = {
//             newData: newStr,
//             oldData: oldStr,
//             action: "update",
//             remark: null,
//             newUser: userInformation.userId,
//             pageName:"Update User"
//           };

//           userController.editUserInfoAndCommission(
//             userData,
//             (data) => {
//               toast.success("Successfully Updated!", {
//                 position: toast.POSITION.BOTTOM_RIGHT
//               });
//               MyActivity(activityList);
//             }
//           );
//       }
//   }

//   onChangeText = (text, value) => {
//     const contextData = this.context.userData;
//     const userInformation = JSON.parse(contextData);

//     if(text == "singleCommission5"){
//       if(value == 0){
//          this.setState({ singleCommission5: value}); 
//       }
//       else {
//         this.setState({ singleCommission5: parseInt(value)});
//         if(userInformation.userId !== 1){
//           if(value <= parseInt(this.state.commission5Data)){
//             this.setState({commission5Error: false});
//           }else this.setState({commission5Error: true});
//         } 
//       }   
//     }else if(text == "singleCommission8"){
//       if(value == 0){
//         this.setState({ singleCommission8: value});
//       }
//       else {
//         this.setState({ singleCommission8: parseInt(value)});
//         if(userInformation.userId !== 1){
//           if(value <= parseInt(this.state.commission8Data)){
//             this.setState({commission8Error: false});
//           }
//           else this.setState({commission8Error: true});
//         }  
//       }
//     }else if(text == "commissionMatch2"){
//         if(value == 0){
//           this.setState({ commissionForMatch2: value});
//         }
//         else {
//           this.setState({ commissionForMatch2: parseInt(value)});
//           if(userInformation.userId !== 1){
//             if(value <= parseInt(this.state.commissionMatch2Data)){
//               this.setState({commissionMatch2Error: false});
//             }
//             else this.setState({commissionMatch2Error: true}); 
//           } 
//         }
//     }else if(text == "commissionMatch3"){
//       if(value == 0){
//         this.setState({ commissionForMatch3: value});
//       }
//       else {
//         this.setState({ commissionForMatch3: parseInt(value)});
//         if(userInformation.userId !== 1){
//           if(value <= parseInt(this.state.commissionMatch3Data)){
//             this.setState({commissionMatch3Error: false});
//           }
//           else this.setState({commissionMatch3Error: true});  
//         }
//       }
//     }else if(text == "commissionMatch4"){
//       if(value == 0){
//         this.setState({ commissionForMatch4: value});
//       }
//       else {
//         this.setState({ commissionForMatch4: parseInt(value)});
//         if(userInformation.userId !== 1){
//           if(value <= parseInt(this.state.commissionMatch4Data)){
//             this.setState({commissionMatch4Error: false});
//           }
//           else this.setState({commissionMatch4Error: true}); 
//         }
//       }
        
//     }else if(text == "commissionMatch5"){
//       if(value == 0){
//         this.setState({ commissionForMatch5: value});
//       }
//       else {
//         this.setState({ commissionForMatch5: parseInt(value)});
//         if(userInformation.userId !== 1){
//           if(value <= parseInt(this.state.commissionMatch5Data)){
//             this.setState({commissionMatch5Error: false});
//           }
//           else this.setState({commissionMatch5Error: true});   
//         }
//       }
//     }else if(text == "commissionMatch6"){
//       if(value == 0){
//         this.setState({ commissionForMatch6: value});
//       }
//       else {
//         this.setState({ commissionForMatch6: parseInt(value)});
//         if(userInformation.userId !== 1){
//           if(value <= parseInt(this.state.commissionMatch6Data)){
//             this.setState({commissionMatch6Error: false});
//           }
//           else this.setState({commissionMatch6Error: true}); 
//         }  
//       }
//     }else if(text == "commissionMatch7"){
//       if(value == 0){
//         this.setState({ commissionForMatch7: value});
//       }
//       else {
//         this.setState({ commissionForMatch7: parseInt(value)});
//         if(userInformation.userId !== 1){
//           if(value <= parseInt(this.state.commissionMatch7Data)){
//             this.setState({commissionMatch7Error: false});
//           }
//           else this.setState({commissionMatch7Error: true});
//         } 
//       }
//     }else if(text == "commissionMatch8"){
//       if(value == 0){
//         this.setState({ commissionForMatch8: value});
//       }
//       else {
//         this.setState({ commissionForMatch8: parseInt(value)});
//         if(userInformation.userId !== 1){
//           if(value <= parseInt(this.state.commissionMatch8Data)){
//             this.setState({commissionMatch8Error: false}); 
//           }
//           else this.setState({commissionMatch8Error: true});
//         }
//       }
//     }else if(text == "commissionMatch9"){
//       if(value == 0){
//         this.setState({ commissionForMatch9: value});
//       }
//       else {
//         this.setState({ commissionForMatch9: parseInt(value)});
//         if(userInformation.userId !== 1){
//           if(value <= parseInt(this.state.commissionMatch9Data)){
//             this.setState({commissionMatch9Error: false});
//           }
//           else this.setState({commissionMatch9Error: false});
//         }
//       }
//     }else if(text == "commissionMatch10"){
//       if(value == 0){
//         this.setState({ commissionForMatch10: value});
//       }
//       else {
//         this.setState({ commissionForMatch10: parseInt(value)});
//         if(userInformation.userId !== 1){
//           if(value <= parseInt(this.state.commissionMatch10Data)){
//             this.setState({commissionMatch10Error: false});
//           }
//           else this.setState({commissionMatch10Error: true});
//         }
//       }
//     }else{
//       if(value == 0){
//         this.setState({ commissionForMatch11: value});
//       }
//       else {
//         this.setState({ commissionForMatch11: parseInt(value)});
//         if(userInformation.userId !== 1){
//           if(value <= parseInt(this.state.commissionMatch11Data)){
//             this.setState({commissionMatch11Error: false});
//           }
//           else this.setState({commissionMatch11Error: true});
//         }
//       }
//     }
//   }

//   changeUserInfo = (name, value) => {
//     const newuserInfo = { ...this.state.userInfo };
//     newuserInfo[name] = value;
//     this.setState({ userInfo: newuserInfo}); 
//   }

//   render(){
//     return (
//       <div>
//       <h3 className="font-weight-bold">Edit User</h3>

//       <BasicInfoForCreate
//         handleSubmit={this.editMemeberDetail}
//         userInfo={this.state.userInfo}
//         userCommission={this.state.userCommission}
//         setUserInfo={this.changeUserInfo}

//         commission5Data={this.state.commission5Data}
//         commission8Data={this.state.commission8Data}
//         commissionMatch2Data={this.state.commissionMatch2Data}
//         commissionMatch3Data={this.state.commissionMatch3Data}
//         commissionMatch4Data={this.state.commissionMatch4Data}
//         commissionMatch5Data={this.state.commissionMatch5Data}
//         commissionMatch6Data={this.state.commissionMatch6Data}
//         commissionMatch7Data={this.state.commissionMatch7Data}
//         commissionMatch8Data={this.state.commissionMatch8Data}
//         commissionMatch9Data={this.state.commissionMatch9Data}
//         commissionMatch10Data={this.state.commissionMatch10Data}
//         commissionMatch11Data={this.state.commissionMatch11Data}
//         // singleCommission={singleCommission}
//         // setSingleCommission={changeSingleCommission}
//         singleCommission8={this.state.singleCommission8}
//         singleCommission5={this.state.singleCommission5}
//         commissionForMatch4={this.state.commissionForMatch4}
//         commissionForMatch3={this.state.commissionForMatch3}
//         commissionForMatch2={this.state.commissionForMatch2}
//         commissionForMatch5={this.state.commissionForMatch5}
//         commissionForMatch6={this.state.commissionForMatch6}
//         commissionForMatch7={this.state.commissionForMatch7}
//         commissionForMatch8={this.state.commissionForMatch8}
//         commissionForMatch9={this.state.commissionForMatch9}
//         commissionForMatch10={this.state.commissionForMatch10}
//         commissionForMatch11={this.state.commissionForMatch11}

//         commission5Error={this.state.commission5Error}
//         commission8Error={this.state.commission8Error}
//         commissionMatch2Error={this.state.commissionMatch2Error}
//         commissionMatch3Error={this.state.commissionMatch3Error}
//         commissionMatch4Error={this.state.commissionMatch4Error}
//         commissionMatch5Error={this.state.commissionMatch5Error}
//         commissionMatch6Error={this.state.commissionMatch6Error}
//         commissionMatch7Error={this.state.commissionMatch7Error}
//         commissionMatch8Error={this.state.commissionMatch8Error}
//         commissionMatch9Error={this.state.commissionMatch9Error}
//         commissionMatch10Error={this.state.commissionMatch10Error}
//         commissionMatch11Error={this.state.commissionMatch11Error}
//         onChangeText={this.onChangeText}
//         action={"Edit"}
//       />
     
//     </div>
//     );
//   }
// }

import { Button, Icon } from "@material-ui/core";
import React from "react";
import MyButton from "../../../common/components/MyButton";
import {
  BasicInfo,
  BetLimitation,
  MixBetCommission,
  SingleBetCommisson,
} from "./components";

export const MemberDetail = ({
  userInfo,
  setUserInfo,
  singleCommission,
  mixCommission,
  setSingleCommission,
  setMixCommission,
  SaveMemberDetail,
}) => {
  const changeUserInfo = (name, value) => {
    const newuserInfo = { ...userInfo };
    newuserInfo[name] = value;
    setUserInfo(newuserInfo);
  };

  const changeSingleCommission = (index, value) => {
    const newSingleCommission = [...singleCommission];
    newSingleCommission[parseInt(index)]["subUserCommission"] = value;
    setSingleCommission(newSingleCommission);
  };

  const changeMixCommission = (index, value) => {
    const newMixCommission = [...mixCommission];
    newMixCommission[parseInt(index)]["subUserCommission"] = value;
    setMixCommission(newMixCommission);
  };

  return (
    <div>
      <BasicInfo userInfo={userInfo} setUserInfo={changeUserInfo} />
      <hr />
      <BetLimitation userInfo={userInfo} setUserInfo={changeUserInfo} />
      <hr />
      <SingleBetCommisson
        singleCommission={singleCommission}
        setSingleCommission={changeSingleCommission}
      />
      <hr />
      <MixBetCommission
        mixCommission={mixCommission}
        setMixCommission={changeMixCommission}
      />
      <hr /> 
      <MyButton
        onClick={SaveMemberDetail}
        text={"SAVE"}
        icon={<Icon className="fa fa-save" color="default" />}
      />
    </div>
  );
};
