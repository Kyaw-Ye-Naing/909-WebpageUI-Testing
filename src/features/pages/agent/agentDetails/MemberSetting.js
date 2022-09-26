import { Checkbox, FormControlLabel, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { userController } from "../../../../controllers/userController";
import { ManageBalance, ResetCredit, ResetPassword } from "./components";
import { toast } from "react-toastify";
import { withTheme } from "../../../common/hoc/withTheme";
import { useMediaPredicate } from "react-media-hook";

const useStyles = makeStyles((theme) => ({
  cartroot: {
    minWidth: 275,
    maxWidth: 300,
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export const MemeberSetting = withTheme(({ userInfo, setUserInfo, setLoading,updateAgentData }) => {
  const classes = useStyles();
  const isPhone = useMediaPredicate("(max-width: 850px)");

  // const changeUserInfo = (name, value) => {
  //   const newuserInfo = { ...userInfo };
  //   newuserInfo[name] = value;
  //   setUserInfo(newuserInfo);
  // };

  const SuspendUser = () => {
    setLoading(true)
    userController.userLock(parseFloat(userInfo.Id), !userInfo.lock, (data) => {
      toast.success(data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setLoading(false)
    });
    // changeUserInfo("lock", !userInfo.lock);
    updateAgentData();
  };
  
  return (
    <div>
        <h3>User Control</h3>
        <FormControlLabel
          control={
            <Checkbox
              checked={userInfo.lock}
              onChange={() => {
                SuspendUser();
              }}
              name="credit"
              color="primary"
            />
          }
          label={userInfo.lock ? "Unsuspend" : "Suspend"}
        />
      <hr></hr>
      <div className="d-flex w-100 flex-wrap">
        <div className="col-lg-6" style={{marginBottom: isPhone ? 20 : null}}>
          {/* change password */}
          <ResetPassword userInfo={userInfo} />
        </div>
        <div className="col-lg-6">
          {/* manage balance */}
          <ManageBalance userInfo={userInfo} updateAgentData={updateAgentData}/>
        </div>

        {/* reset credit */}
        {/* <ResetCredit userInfo={userInfo}/>--26-1-2021--kyn--*/}
      </div>
    </div>
  );
});
