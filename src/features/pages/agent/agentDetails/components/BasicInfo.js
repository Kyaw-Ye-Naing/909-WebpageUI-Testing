import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Icon,
  InputAdornment,
  InputLabel,
  makeStyles,
  NativeSelect,
  Select,
  TextField,
  Checkbox,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../../../context/AppContext";
import { roleController } from "../../../../../controllers/userController";
import { MyTextInput } from "../../../../common/components";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControlLabel: {
    marginLeft: "10px",
  },
  checkBox: {
    margin: "10px 50px",
  },
}));

export const BasicInfo = ({ userInfo, setUserInfo }) => {
  const classes = useStyles();
  const { userData } = useContext(AppContext);
  const loginUserInfo = JSON.parse(userData);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <h4>Basic Info</h4>
      <div className="row">
        <div className="col-md-6 col-12">
          <MyTextInput
            label={"User Name"}
            fullWidth={true}
            iconName={"fa fa-user"}
            type={"text"}
            disabled={true}
            value={userInfo ? userInfo.userName : ""}
            onChange={(e) => setUserInfo("userName", e.target.value)}
          />
        </div>

        <div className="col-md-6 col-12">
          <MyTextInput
            label={"Mobile"}
            fullWidth={true}
            iconName={"fa fa-mobile"}
            type={"text"}
            disabled={false}
            value={userInfo ? userInfo.mobile : ""}
            onChange={(e) => setUserInfo("mobile", e.target.value)}
          />
        </div>

        <div className="col-md-6 col-12">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="role-native-helper">Role</InputLabel>
            <NativeSelect
              value={userInfo ? userInfo.roleId : 0}
              onChange={(e) => setUserInfo("roleId", e.target.value)}
            >
              <option aria-label="None" value={0}>
                Please Select
              </option>
              {userRole &&
                userRole.map((r, i) => (
                  <option key={i.toString()} value={r.roleId}>
                    {r.role}
                  </option>
                ))}
              {/* <option value={2}>Senior Master</option>
              <option value={3}>Master</option>
              <option value={4}>Agent</option>
              <option value={5}>Member</option> */}
            </NativeSelect>
          </FormControl>
        </div>

        <div className="col-md-6 col-12">
          <MyTextInput
            label={"Balance"}
            fullWidth={true}
            iconName={"fa fa-dollar-sign"}
            type={"number"}
            disabled={true}
            value={userInfo ? Math.round(userInfo.balance, 2) : ""}
            onChange={(e) => setUserInfo("balance", e.target.value)}
          />
        </div>

        <div className="col-md-6 col-12">
          <MyTextInput
            label={"Credit Amount"}
            fullWidth={true}
            iconName={"fa fa-hand-holding-usd"}
            type={"number"}
            disabled={true}
            value={userInfo ? Math.round(userInfo.credit, 2) : ""}
            onChange={(e) => setUserInfo("credit", e.target.value)}
          />
        </div>

        <div className="col-md-6 col-12">
          <MyTextInput
            label={"Finicial Status"}
            fullWidth={true}
            iconName={"fa fa-file-invoice-dollar"}
            type={"number"}
            disabled={true}
            value={
              userInfo ? Math.round(userInfo.balance - userInfo.credit, 2) : ""
            }
            onChange={(e) => setUserInfo("balance", e.target.value)}
          />
        </div>

        {/* <div className="col-md-6 col-12 ">
          <FormControlLabel
            style={{ color: "grey" }}
            className={classes.formControlLabel}
            labelPlacement="top"
            label="Lock"
            control={
              <Checkbox
                checked={userInfo ? userInfo.lock : false}
                value="Lock"
                color="default"
                onChange={(e) => setUserInfo("lock", e.target.checked)}
                inputProps={{ "aria-label": "checkbox with default color" }}
              />
            }
          />
        </div> */}

        {/* <div className="col-md-6 col-12">
          <MyTextInput
            label={"Share Percent"}
            fullWidth={true}
            iconName={"fa fa-percentage"}
            type={"text"}
            disabled={false}
            value={userInfo ? userInfo.sharePercent : ""}
            onChange={(e) => setUserInfo("sharePercent", e.target.value)}
          />
        </div> */}
      </div>
    </>
  );
};
