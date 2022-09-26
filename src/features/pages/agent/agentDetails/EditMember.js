import React, { useContext, useEffect, useState } from "react";
import mycolor from "../../../../config/color";
import AppContext from "../../../../context/AppContext";
import {
  roleController,
  userController,
} from "../../../../controllers/userController";
import { toast } from "react-toastify";
import { MyActivity } from "../../../common/components/MyActivity";
import { withTheme } from "../../../common/hoc/withTheme";

const EditMember = ({
  userId,
  setLoading,
  newuser,
  setNewuser,
  commission,
  setCommission,
  updateAgentData,
}) => {
  const { userData } = useContext(AppContext);
  const loginUserInfo = JSON.parse(userData);
  const [isLoading, setIsLoading] = useState(false);

  // const [newuser, setNewuser] = useState({
  //   Id: 0,
  //   userId: "",
  //   username: "",
  //   roleId: 0,
  //   mobile: "",
  //   balance: 0,
  //   // sharePercent: 0,
  //   betLimitForMix: 0,
  //   betLimitForSingle: 0,
  // });
  const [newUserError, setNewUserError] = useState({
    userId: "",
    username: "",
    roleId: "",
    mobile: "",
    sharePercent: "",
    betLimitForMix: "",
    createdBy: "",
    betLimitForSingle: "",
  });
  // const [commission, setCommission] = useState({
  //   com1: 0,
  //   com2: 0,
  //   com3: 0,
  //   com4: 0,
  //   com5: 0,
  //   com6: 0,
  //   com7: 0,
  //   com8: 0,
  //   com9: 0,
  //   com10: 0,
  //   com11: 0,
  //   com12: 0,
  // });
  const [commissionError, setCommissionError] = useState({
    com1: "",
    com2: "",
    com3: "",
    com4: "",
    com5: "",
    com6: "",
    com7: "",
    com8: "",
    com9: "",
    com10: "",
    com11: "",
    com12: "",
  });
  const [logincommission, setLoginCommission] = useState({
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

  const [userRole, setUserRole] = useState(null);
  const [betAmount, setBetAmount] = useState([]); // add by AKPM 27-4-2021

  const SaveNewUser = () => {
    var isUserError = false;

    // -------Remove point condition by Arkar Phone Myat-------

    // for (const [key, value] of Object.entries(newuser)) {
    //   if (
    //     key == "roleId" ||
    //     key == "betLimitForMix" ||
    //     key == "betLimitForSingle"
    //   ) {
    //     isUserError = value == 0 ? false : false;
    //     if (value == 0) {
    //       break;
    //     }
    //   } else {
    //     isUserError = value == "" ? false : false;
    //     if (value == "") {
    //       break;
    //     }
    //   }
    // }

    // -------Remove point condition by Arkar Phone Myat-------
    if (isUserError) {
      setErrorTextForAll();
      toast.error("Wrong Input of Basic Info!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      var isCommissionError = false;
      for (const [key, value] of Object.entries(commission)) {
        isCommissionError = value === "" ? true : false;
        if (value === "") {
          break;
        }
      }
      if (isCommissionError) {
        setErrorTextForAll();
        toast.error("Wrong Input of Commission Data!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        setIsLoading(true);
        SaveData();
      }
    }
  };

  const clearErrorText = () => {
    const clearUserError = { ...newUserError };
    for (const key of Object.keys(newUserError)) {
      clearUserError[key] = "";
    }
    setNewUserError(clearUserError);
    const clearComError = { ...commissionError };
    for (const key of Object.keys(commissionError)) {
      clearComError[key] = "";
    }
    setCommissionError(clearComError);
  };

  const setErrorTextForAll = () => {
    const setUserError = { ...newUserError };
    for (const [key, value] of Object.entries(newuser)) {
      if (
        key === "roleId" ||
        key === "betLimitForMix" ||
        key === "betLimitForSingle"
      ) {
        if (value === 0) {
          setUserError[key] =
            key === "roleId" ? "Please Select!" : "Please Fill!";
        }
      } else {
        if (value === "") {
          setUserError[key] = "Please Fill!";
        }
      }
    }
    setNewUserError(setUserError);

    const setComError = { ...commissionError };
    for (const [key, value] of Object.entries(commission)) {
      if (value === "") {
        setComError[key] = "Value can't be Empty!";
      } else {
        if (loginUserInfo.userId != 1) {
          if (value == 0) {
            setComError[key] = "";
          } else {
            if (logincommission[key] < value) {
              setComError[
                key
              ] = `Commission Amount Can't greater than ${logincommission[key]}!`;
            } else {
              setComError[key] = "";
            }
          }
        }
      }
    }
    setCommissionError(setComError);
  };

  const SaveData = () => {
    if (commissionError.com1) {
      toast.warning(`Tax 5% Commission ${commissionError.com1}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setIsLoading(false);
    } else if (commissionError.com2) {
      toast.warning(`Tax 8% Commission ${commissionError.com2}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setIsLoading(false);
    } else if (commissionError.com3) {
      toast.warning(`Match Count 2 Commission 15% ${commissionError.com3}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setIsLoading(false);
    } else if (commissionError.com4) {
      toast.warning(`Match Count 3 Commission 20% ${commissionError.com4}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setIsLoading(false);
    } else if (commissionError.com5) {
      toast.warning(`Match Count 4 Commission 20% ${commissionError.com5}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setIsLoading(false);
    } else if (commissionError.com6) {
      toast.warning(`Match Count 5 Commission 20% ${commissionError.com6}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setIsLoading(false);
    } else if (commissionError.com7) {
      toast.warning(`Match Count 6 Commission 20% ${commissionError.com7}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setIsLoading(false);
    } else if (commissionError.com8) {
      toast.warning(`Match Count 7 Commission 20% ${commissionError.com8}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setIsLoading(false);
    } else if (commissionError.com9) {
      toast.warning(`Match Count 8 Commission 20% ${commissionError.com9}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setIsLoading(false);
    } else if (commissionError.com10) {
      toast.warning(`Match Count 9 Commission 20% ${commissionError.com10}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setIsLoading(false);
    } else if (commissionError.com11) {
      toast.warning(`Match Count 10 Commission 20% ${commissionError.com11}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setIsLoading(false);
    } else if (commissionError.com12) {
      toast.warning(`Match Count 11 Commission 20% ${commissionError.com12}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setIsLoading(false);
    } else {
      clearErrorText();
      let objCommission = [];
      for (const [key, value] of Object.entries(commission)) {
        var obj = {};
        obj["commissionTypeId"] = parseInt(key.replace("com", ""));
        obj["userId"] = parseInt(newuser["Id"]);
        obj["subUserCommission"] = parseFloat(value);
        objCommission.push(obj);
      }
      let userData = {
        userId: parseInt(newuser["Id"]),
        username: newuser["userId"],
        name: newuser["username"],
        //   password: newuser["password"],
        //   lock: false,
        roleId: parseInt(newuser["roleId"]),
        mobile: newuser["mobile"],
        sharePercent: parseInt(0),
        betLimitForMix: parseFloat(newuser["betLimitForMix"]),
        createdBy: parseInt(loginUserInfo.userId),
        betLimitForSingle: parseFloat(newuser["betLimitForSingle"]),
        commission: objCommission,
      };

      let strList = JSON.stringify(userData);
      let activityList = {
        newData: strList,
        oldData: null,
        action: "save",
        remark: null,
        newUser: loginUserInfo.userId,
        pageName: "Edit User",
      };

      userController.editUserInfoAndCommission(userData, (data) => {
        setIsLoading(false);
        updateAgentData();
        toast.success(data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        MyActivity(activityList);
      });
    }
  };

  const getLoginUserDataWithBalance = () => {
    userController.getUserDataWithBalance(loginUserInfo.userId, (data) => {
      const updateCom = { ...logincommission };
      data.userCommission.map((com) => {
        updateCom[`com${com.commissionTypeId}`] = com.subUserCommission;
      });
      setLoginCommission(updateCom);
    });
  };

  useEffect(() => {
    setLoading(true);
    if (loginUserInfo) {
      if (loginUserInfo.userId != 1) {
        getLoginUserDataWithBalance();
      }
    }
    loginUserInfo &&
      roleController.getUserRole((data) => {
        if (!data) return null;
        let filterList = data.filter((v) => v.roleId > loginUserInfo.roleId);
        let list = filterList.map((v) => {
          return {
            roleId: v.roleId,
            role: v.role,
          };
        });
        setUserRole(list);
      });

    userController.getBetAmount((value) => {
      let data = value.map((v, k) => {
        return {
          id: v.gamblingTypeId,
          gamblingType: v.gamblingType,
          minBetAmount: v.minBetAmount,
          maxBetAmount: v.maxBetAmount,
        };
      });
      setBetAmount(data);
    });
    // updateAgentData();
    // userController.getUserInfoAndCommission(
    //   parseInt(userId),
    //   (data) => {
    //     const userData = data[0];
    //     const newdata = { ...newuser };
    //     newdata["Id"] = userData.userId;
    //     newdata["userId"] = userData.userName;
    //     newdata["username"] = userData.name;
    //     newdata["roleId"] = userData.roleId;
    //     newdata["mobile"] = userData.mobile;
    //     newdata["balance"] = userData.balance;
    //     newdata["betLimitForSingle"] = userData.betLimitForSingle;
    //     newdata["betLimitForMix"] = userData.betLimitForMix;
    //     setNewuser(newdata);
    //   },
    //   (comData) => {
    //     const newCom = { ...commission };
    //     comData.map((com) => {
    //       newCom[`com${com.commissionTypeId}`] = com.subUserCommission;
    //     });
    //     setCommission(newCom);
    //   }
    // );
    setLoading(false);
  }, [userData]);

  const OnChangeNewUser = (text, value) => {
    //add by AKPM 21-4-2021--limit bet amount min max
    var singleData = betAmount.filter((a) => a.id == 1);
    var s_min = singleData[0]["minBetAmount"];
    var s_max = loginUserInfo.betLimitForSingle;

    var mixData = betAmount.filter((a) => a.id == 2);
    let m_min = mixData[0]["minBetAmount"];
    let m_max = loginUserInfo.betLimitForMix;
    //------------------------------------------------
    const newData = { ...newuser };
    const newErrorForUser = { ...newUserError };
    newData[text] = value;
    if (text == "roleId") {
      newErrorForUser[text] = value == 0 ? "Please Select Role!" : "";
    } else if (text == "betLimitForMix") {
      // //add by kyn 21-4-2021--limit bet amount min max
      // if (loginUserInfo.roleId == 1) {
      //   // add error condition by AKPM 27-4-2021
      //   newErrorForUser[text] = "";
      // } else {
      //   newErrorForUser[text] =
      //     value < m_min || value > m_max
      //       ? "Value must be between " + m_min + " and " + m_max + " !"
      //       : "";
      // }
      if (value == "") {
        newData[text] = value;
        newErrorForUser[text] = "Value can't be Empty!";
      } else {
        if (loginUserInfo.roleId != 1) {
          if (value == 0) {
            newData[text] = 0;
            newErrorForUser[text] = "";
          } else {
            if (m_max < value) {
              newErrorForUser[
                text
              ] = `Bet Limit Amount Can't greater than ${m_max}!`;
              newData[text] = newuser[text];
            } else {
              newData[text] = value;
              newErrorForUser[text] = "";
            }
          }
        } else {
          newData[text] = value;
        }
      }
    } else if (text == "betLimitForSingle") {
      //add by kyn 21-4-2021--limit bet amount min max
      // if (loginUserInfo.roleId == 1) {
      //   // add error condition by AKPM 27-4-2021
      //   newErrorForUser[text] = "";
      // } else {
      //   newErrorForUser[text] =
      //     value < s_min || value > s_max
      //       ? "Value must be between " + s_min + " and " + s_max + " !"
      //       : "";
      // }
      // } else {
      //   newErrorForUser[text] = value == "" ? "Please Fill!" : "";
      // }
      if (value == "") {
        newData[text] = value;
        newErrorForUser[text] = "Value can't be Empty!";
      } else {
        if (loginUserInfo.roleId != 1) {
          if (value == 0) {
            newData[text] = 0;
            newErrorForUser[text] = "";
          } else {
            if (s_max < value) {
              newErrorForUser[
                text
              ] = `Bet Limit Amount Can't greater than ${s_max}!`;
              newData[text] = newuser[text];
            } else {
              newData[text] = value;
              newErrorForUser[text] = "";
            }
          }
        } else {
          newData[text] = value;
        }
      }
    }
    setNewUserError(newErrorForUser);
    setNewuser(newData);
  };

  const OnChangeCommission = (text, value) => {
    const newData = { ...commission };
    const newComError = { ...commissionError };
    if (value == "") {
      newData[text] = 0;
      newComError[text] = "Value can't be Empty!";
    } else {
      if (loginUserInfo.userId != 1) {
        if (value == 0) {
          newData[text] = 0;
          newComError[text] = "";
        } else {
          if (logincommission[text] < value) {
            newComError[
              text
            ] = `Commission Amount Can't greater than ${logincommission[text]}!`;
            newData[text] = commission[text];
          } else {
            newData[text] = value;
            newComError[text] = "";
          }
        }
      } else {
        newData[text] = value;
        newComError[text] = "";
      }
    }
    setCommissionError(newComError);
    setCommission(newData);
  };

  return (
    <div>
      <h3 className="font-weight-bold" style={{ color: mycolor.bg }}>
        Member Details
      </h3>

      <form autoComplete="off">
        <h4 style={{ color: mycolor.secondarySelected }}>Basic Info</h4>
        <UserInfoComponent
          loginUserInfo={loginUserInfo}
          newuser={newuser}
          OnChangeNewUser={OnChangeNewUser}
          newUserError={newUserError}
          userRole={userRole}
        />
        <h4 style={{ color: mycolor.secondarySelected }}>
          Single Bet Commission
        </h4>
        <SingleBetCommissionComponent
          commission={commission}
          commissionError={commissionError}
          OnChangeCommission={OnChangeCommission}
        />
        <h4 style={{ color: mycolor.secondarySelected }}>Mix Bet Commission</h4>
        <MixBetCommissionComponent
          commission={commission}
          commissionError={commissionError}
          OnChangeCommission={OnChangeCommission}
        />
        <div className="col-12 m-0 p-2">
          {/*--edited by kyn 24-4-2021--add loading on button*/}
          {!isLoading && (
            <Button title="EDIT" icon="fa fa-edit" onClick={SaveNewUser} />
          )}
          {isLoading && (
            <Button
              title="EDITING......"
              icon="fas fa-circle-notch fa-spin"
              disabled="true"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export function MixBetCommissionComponent({
  commission,
  commissionError,
  OnChangeCommission,
}) {
  return (
    <div className="row">
      <div className="col-md-6 col-12">
        <NumberTextBox
          title="Match Count 2 Commission 15%"
          type="number"
          placeholder="0"
          errortext={commission.com3 == 0 ? commissionError.com3 : null}
          value={commission.com3}
          onChange={(v) => OnChangeCommission("com3", v)}
          icon="fa fa-percent"
        />
      </div>
      <div className="col-md-6 col-12">
        <NumberTextBox
          title="Match Count 3 Commission 20%"
          type="number"
          placeholder="0"
          errortext={commission.com4 == 0 ? commissionError.com4 : null}
          value={commission.com4}
          onChange={(v) => OnChangeCommission("com4", v)}
          icon="fa fa-percent"
        />
      </div>
      <div className="col-md-6 col-12">
        <NumberTextBox
          title="Match Count 4 Commission 20%"
          type="number"
          placeholder="0"
          errortext={commission.com5 == 0 ? commissionError.com5 : null}
          value={commission.com5}
          onChange={(v) => OnChangeCommission("com5", v)}
          icon="fa fa-percent"
        />
      </div>
      <div className="col-md-6 col-12">
        <NumberTextBox
          title="Match Count 5 Commission 20%"
          type="number"
          placeholder="0"
          errortext={commission.com6 == 0 ? commissionError.com6 : null}
          value={commission.com6}
          onChange={(v) => OnChangeCommission("com6", v)}
          icon="fa fa-percent"
        />
      </div>
      <div className="col-md-6 col-12">
        <NumberTextBox
          title="Match Count 6 Commission 20%"
          type="number"
          placeholder="0"
          errortext={commission.com7 == 0 ? commissionError.com7 : null}
          value={commission.com7}
          onChange={(v) => OnChangeCommission("com7", v)}
          icon="fa fa-percent"
        />
      </div>
      <div className="col-md-6 col-12">
        <NumberTextBox
          title="Match Count 7 Commission 20%"
          type="number"
          placeholder="0"
          errortext={commission.com8 == 0 ? commissionError.com8 : null}
          value={commission.com8}
          onChange={(v) => OnChangeCommission("com8", v)}
          icon="fa fa-percent"
        />
      </div>
      <div className="col-md-6 col-12">
        <NumberTextBox
          title="Match Count 8 Commission 20%"
          type="number"
          placeholder="0"
          errortext={commission.com9 == 0 ? commissionError.com9 : null}
          value={commission.com9}
          onChange={(v) => OnChangeCommission("com9", v)}
          icon="fa fa-percent"
        />
      </div>
      <div className="col-md-6 col-12">
        <NumberTextBox
          title="Match Count 9 Commission 25%"
          type="number"
          placeholder="0"
          errortext={commission.com10 == 0 ? commissionError.com10 : null}
          value={commission.com10}
          onChange={(v) => OnChangeCommission("com10", v)}
          icon="fa fa-percent"
        />
      </div>
      <div className="col-md-6 col-12">
        <NumberTextBox
          title="Match Count 10 Commission 25%"
          type="number"
          placeholder="0"
          errortext={commission.com11 == 0 ? commissionError.com11 : null}
          value={commission.com11}
          onChange={(v) => OnChangeCommission("com11", v)}
          icon="fa fa-percent"
        />
      </div>
      <div className="col-md-6 col-12">
        <NumberTextBox
          title="Match Count 11 Commission 25%"
          type="number"
          placeholder="0"
          errortext={commission.com12 == 0 ? commissionError.com12 : null}
          value={commission.com12}
          onChange={(v) => OnChangeCommission("com12", v)}
          icon="fa fa-percent"
        />
      </div>
    </div>
  );
}

export function SingleBetCommissionComponent({
  commission,
  commissionError,
  OnChangeCommission,
}) {
  return (
    <div className="row">
      <div className="col-md-6 col-12">
        <NumberTextBox
          title="Tax 5% Commission"
          type="number"
          placeholder="0"
          errortext={commission.com1 == 0 ? commissionError.com1 : null}
          value={commission.com1}
          onChange={(v) => OnChangeCommission("com1", v)}
          icon="fa fa-percent"
        />
      </div>
      <div className="col-md-6 col-12">
        <NumberTextBox
          title="Tax 8% Commission"
          type="number"
          placeholder="0"
          errortext={commission.com2 == 0 ? commissionError.com2 : null}
          value={commission.com2}
          onChange={(v) => OnChangeCommission("com2", v)}
          icon="fa fa-percent"
        />
      </div>
    </div>
  );
}
export default withTheme(EditMember);
export function UserInfoComponent({
  loginUserInfo,
  newuser,
  OnChangeNewUser,
  newUserError,
  userRole,
}) {
  return (
    <div className="row">
      <div className="col-md-6 col-12">
        <UserIdTextBox
          disabled={true}
          //   defaultTitle={loginUserInfo && loginUserInfo.username}
          title="User Id"
          type="text"
          placeholder="User Id"
          errortext={newUserError.userId}
          value={newuser.userId}
          onChange={(v) => OnChangeNewUser("userId", v)}
        />
      </div>
      <div className="col-md-6 col-12">
        <TextBox
          title="User Name"
          type="text"
          placeholder="User Name"
          errortext={newUserError.username}
          value={newuser.username}
          onChange={(v) => OnChangeNewUser("username", v)}
        />
      </div>
      <div className="col-md-6 col-12">
        <SelectingBox
          disabled={true}
          title="User Role"
          data={userRole}
          errortext={newUserError.roleId}
          value={newuser.roleId}
          onChange={(v) => OnChangeNewUser("roleId", v)}
        />
      </div>
      {/* <div className="col-md-6 col-12">
        <TextBox
          title="Password"
          type="password"
          placeholder="Password"
          errortext={newUserError.password}
          value={newuser.password}
          onChange={(v) => OnChangeNewUser("password", v)}
        />
      </div> */}
      <div className="col-md-6 col-12">
        <TextBox
          title="Mobile"
          type="mobile"
          placeholder="Mobile"
          errortext={newUserError.mobile}
          value={newuser.mobile}
          onChange={(v) => OnChangeNewUser("mobile", v)}
        />
      </div>
      <div className="col-md-6 col-12">
        <NumberTextBox
          title="Balance"
          type="number"
          placeholder="Balance"
          value={newuser.balance}
          onChange={(v) => OnChangeNewUser("balance", v)}
          icon="fa fa-dollor"
          disabled={true}
        />
      </div>
      {/* <div className="col-md-6 col-12">
            <TextBox
              title="Share Percent"
              type="number"
              placeholder="0"
              errortext={newUserError.sharePercent}
              value={newuser.sharePercent}
              onChange={(v) => OnChangeNewUser("sharePercent", v)}
            />
          </div> */}
      <h4 className="col-12" style={{ color: mycolor.secondarySelected }}>
        User Bet Limit
      </h4>
      <div className="col-md-6 col-12">
        <NumberTextBox
          title="Bet Limit For Single"
          type="number"
          placeholder="0"
          errortext={
            newuser.betLimitForSingle == 0
              ? newUserError.betLimitForSingle
              : null
          }
          value={newuser.betLimitForSingle}
          onChange={(v) => OnChangeNewUser("betLimitForSingle", v)}
        />
      </div>
      <div className="col-md-6 col-12">
        <NumberTextBox
          title="Bet Limit For Mix"
          type="number"
          placeholder="0"
          errortext={
            newuser.betLimitForMix == 0 ? newUserError.betLimitForMix : null
          }
          value={newuser.betLimitForMix}
          onChange={(v) => OnChangeNewUser("betLimitForMix", v)}
        />
      </div>
    </div>
  );
}

export function Button(props) {
  const { title, onClick, icon, disabled } = props;
  return (
    <button
      style={{
        borderRadius: 30,
        width: "100%",
        backgroundColor: mycolor.secondarySelected,
      }}
      type="button"
      className="btn btn-outline-info btn-lg"
      disabled={disabled}
      onClick={onClick}
    >
      <i className={`${icon} mr-1`}></i>
      {title}
    </button>
  );
}

export function SelectingBox(props) {
  const { errortext, value, onChange, data, title, disabled } = props;
  return (
    <div style={{ marginRight: 5, marginLeft: 5 }}>
      <label
        style={{ color: mycolor.secondarySelected, marginLeft: 2 }}
        htmlFor={`roleselectbox`}
        className="my-0"
      >
        {title}
      </label>
      <div className="input-group">
        <select
          className="custom-select"
          id="roleselectbox"
          style={{ borderRadius: 15 }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          <option selected value={0}>
            --- Please Select ---
          </option>
          {data &&
            data.map((r, i) => (
              <option key={i.toString()} value={r.roleId}>
                {r.role}
              </option>
            ))}
        </select>
      </div>
      {errortext && (
        <small
          id="emailHelp"
          className="form-text text-danger mt-0"
          style={{ marginLeft: 12 }}
        >
          {errortext}
        </small>
      )}
    </div>
  );
}

export function UserIdTextBox(props) {
  const {
    defaultTitle,
    title,
    type,
    placeholder,
    errortext,
    required,
    value,
    onChange,
    disabled,
  } = props;
  return (
    <div className="form-group" style={{ marginRight: 5, marginLeft: 5 }}>
      <label
        style={{ color: mycolor.secondarySelected, marginLeft: 2 }}
        htmlFor={`${title}${placeholder}${value}`}
        className="my-0"
      >
        {title}
      </label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span
            className="input-group-text"
            style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}
          >
            {defaultTitle}
          </span>
        </div>
        <input
          disabled={disabled}
          type={type}
          pattern="^\d*(\.\d{0,2})?$"
          className="form-control m-0"
          id={`${title}${placeholder}${value}`}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          style={{
            color: mycolor.onBg,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
          }}
          value={value == 0 ? null : value}
          onChange={(e) => onChange(e.target.value)}
          autoCorrect="off"
          autoCorrect="off"
          step="0.01"
        />
      </div>
      {errortext && (
        <small
          id="emailHelp"
          className="form-text text-danger mt-0"
          style={{ marginLeft: 12 }}
        >
          {errortext}
        </small>
      )}
    </div>
  );
}

export function NumberTextBox(props) {
  const {
    title,
    type,
    placeholder,
    errortext,
    required,
    value,
    onChange,
    icon,
    disabled,
  } = props;
  const handleChange = (evt) => {
    var financialGoal = evt.target.validity.valid ? evt.target.value : value;
    if (financialGoal.toString().length > 1) {
      if (financialGoal > 0 && financialGoal < 1) {
        financialGoal = "0" + financialGoal;
        while (financialGoal.toString().charAt(1) === "0") {
          financialGoal = financialGoal.substring(1);
        }
      }
    }
    onChange(financialGoal);
  };
  return (
    <div className="form-group" style={{ marginRight: 5, marginLeft: 5 }}>
      <label
        style={{ color: mycolor.secondarySelected, marginLeft: 2 }}
        htmlFor={`${title}${placeholder}${value}`}
        className="my-0"
      >
        {title}
      </label>
      <div className="input-group">
        <input
          disabled={disabled}
          type={type}
          pattern="^\d*(\.\d{0,2})?$"
          className="form-control m-0"
          id={`${title}${placeholder}${value}`}
          placeholder={placeholder}
          required={required}
          style={{
            color: mycolor.onBg,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            borderTopRightRadius: icon ? 0 : 15,
            borderBottomRightRadius: icon ? 0 : 15,
          }}
          value={value == 0 ? null : value}
          onChange={handleChange}
          autoComplete="off"
          autoCorrect="off"
          step="0.01"
        />
        {icon && (
          <div className="input-group-append">
            <div
              className="input-group-text"
              style={{ borderTopRightRadius: 15, borderBottomRightRadius: 15 }}
            >
              <i
                className={icon}
                style={{ color: mycolor.secondarySelected, fontSize: 12 }}
              ></i>
            </div>
          </div>
        )}
      </div>

      {errortext && (
        <small
          id="emailHelp"
          className="form-text text-danger mt-0"
          style={{ marginLeft: 12 }}
        >
          {errortext}
        </small>
      )}
    </div>
  );
}

export function TextBox(props) {
  const {
    title,
    type,
    placeholder,
    errortext,
    required,
    value,
    onChange,
    disabled,
  } = props;
  return (
    <div className="form-group" style={{ marginRight: 5, marginLeft: 5 }}>
      <label
        style={{ color: mycolor.secondarySelected, marginLeft: 2 }}
        htmlFor={`${title}${placeholder}${value}`}
        className="my-0"
      >
        {title}
      </label>
      {type == "email" ? (
        <input
          disabled={disabled}
          type={type}
          className="form-control m-0"
          id={`${title}${placeholder}${value}`}
          aria-describedby="emailHelp"
          placeholder={placeholder}
          required={required}
          style={{ color: mycolor.onBg, borderRadius: 15 }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
        />
      ) : (
        <input
          type={type}
          className="form-control m-0"
          id={`${title}${placeholder}${value}`}
          placeholder={placeholder}
          required={required}
          style={{ color: mycolor.onBg, borderRadius: 15 }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={type == "password" ? "new-password" : "off"}
          autoCorrect="off"
        />
      )}
      {errortext && (
        <small
          id="emailHelp"
          className="form-text text-danger mt-0"
          style={{ marginLeft: 12 }}
        >
          {errortext}
        </small>
      )}
    </div>
  );
}
