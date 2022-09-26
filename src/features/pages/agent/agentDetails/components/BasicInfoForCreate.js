import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Icon,
  InputAdornment,
  InputLabel,
  makeStyles,
  NativeSelect,
  Checkbox,
  Select,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect, useContext } from "react";
import MyFont from "../../../../../config/fonts";
import MyButton from "../../../../common/components/MyButton";
import { MyTextInput, MyPasswordInput } from "../../../../common/components";
import { roleController } from "../../../../../controllers/userController";
import { SingleBetCommisson } from "./SingleBetCommission";
import AppContext from "../../../../../context/AppContext";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  formControlLabel: {
    marginLeft: "10px",
  },
  checkBox: {
    margin: "10px 50px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const BasicInfoForCreate = ({
  handleSubmit,
  action,
  userInfo,
  commissionInfo,
  userName,
  mobile,
  roleId,
  sharePercent,
  lock,
  userCommission,
  setUserInfo,
  singleCommission5,
  singleCommission8,
  setSingleCommission8,
  setSingleCommission5,
  setCommissionForMatch2,
  commissionForMatch2,
  setCommissionForMatch3,
  setCommissionForMatch4,
  setCommissionForMatch5,
  setCommissionForMatch6,
  setCommissionForMatch7,
  setCommissionForMatch8,
  setCommissionForMatch9,
  setCommissionForMatch10,
  setCommissionForMatch11,
  commissionForMatch3,
  commissionForMatch4,
  commissionForMatch5,
  commissionForMatch6,
  commissionForMatch7,
  commissionForMatch8,
  commissionForMatch9,
  commissionForMatch10,
  commissionForMatch11,
  commission5Data,
  commission8Data,
  commissionMatch2Data,
  commissionMatch3Data,
  commissionMatch4Data,
  commissionMatch5Data,
  commissionMatch6Data,
  commissionMatch7Data,
  commissionMatch8Data,
  commissionMatch9Data,
  commissionMatch10Data,
  commissionMatch11Data,
  onChangeText,
  commission5Error,
  commission8Error,
  commissionMatch2Error,
  commissionMatch3Error,
  commissionMatch4Error,
  commissionMatch5Error,
  commissionMatch6Error,
  commissionMatch7Error,
  commissionMatch8Error,
  commissionMatch9Error,
  commissionMatch10Error,
  commissionMatch11Error,
}) => {
  const classes = useStyles();
  const [userRole, setUserRole] = useState([]);
  const { userData } = useContext(AppContext);
  let contextData = JSON.parse(userData);

  useEffect(() => {
    roleController.getUserRole((data) => {
      let filterList = data.filter((v) => v.roleId > contextData.roleId);
      let list = filterList.map((v) => {
        return {
          value: v.roleId,
          label: v.role,
        };
      });
      setUserRole(list);
    });
  }, []);
  return (
    <>
      <h4>Basic Info</h4>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col-md-6 col-12">
            <MyTextInput
              label={"User Name"}
              fullWidth={true}
              iconName={"fa fa-user"}
              type={"text"}
              disabled={false}
              value={userInfo ? userInfo.userName : ""}
              onChange={(e) => setUserInfo("userName", e.target.value)}
              required={true}
            />
          </div>

          <div className="col-md-6 col-12">
            <MyTextInput
              label={"Mobile"}
              fullWidth={true}
              iconName={"fa fa-mobile"}
              type={"text"}
              disabled={false}
              // value={userInfo ? userInfo.mobile : "-"}
              value="-"
              onChange={(e) => setUserInfo("mobile", e.target.value)}
              required={true}
            />
          </div>

          <div className="col-md-6 col-12">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-helper">Role</InputLabel>
              <NativeSelect
                value={userInfo ? userInfo.roleId : 0}
                onChange={(e) => setUserInfo("roleId", e.target.value)}
              >
                <option aria-label="None" value={0}>
                  Please Select
                </option>

                {userRole &&
                  userRole.map((v) => (
                    <option value={v.value}>{v.label}</option>
                  ))}
                {/* <option value={1}>Senior Master</option>
                            <option value={2}>Master</option>
                            <option value={3}>Agent</option>
                            <option value={4}>User</option> */}
              </NativeSelect>
            </FormControl>
          </div>

          {action === "Create" && (
            <div className="col-md-6 col-12 pr-0">
              <MyPasswordInput
                value={userInfo ? userInfo.password : 0}
                onChange={(e) => setUserInfo("password", e.target.value)}
                label={"Password"}
                iconName={"fa fa-key"}
                required={true}
              />
            </div>
          )}

          {/* <div className="col-md-6 col-12 ">
                    <FormControlLabel 
                        style={{color:"grey"}}
                        className={classes.formControlLabel}
                        labelPlacement="top"
                        label="Lock"
                        control={
                        <Checkbox
                            checked={userInfo.lock !== undefined ? userInfo.lock : false}
                            color="default"
                            onChange={(e) => setUserInfo("lock", e.target.checked)}
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                        />
                        }
                    /> 
                    
                </div> */}

          <div className="col-md-6 col-12">
            <MyTextInput
              label={"Share Percent"}
              fullWidth={true}
              iconName={"fa fa-percentage"}
              type={"number"}
              disabled={false}
              value={userInfo ? userInfo.sharePercent : 0}
              // value={0}
              onChange={(e) => setUserInfo("sharePercent", e.target.value)}
              required={true}
            />
          </div>
        </div>

        <hr />
        <h4>Bet Limitation</h4>
        <div className="row">
          <div className="col-md-6 col-12">
            <MyTextInput
              label={"Max For Mix Bet"}
              fullWidth={true}
              iconName={"fa fa-wallet"}
              type={"number"}
              disabled={false}
              value={userInfo ? userInfo.betLimitForMix : 0}
              onChange={(e) => setUserInfo("betLimitForMix", e.target.value)}
            />
          </div>

          <div className="col-md-6 col-12">
            <MyTextInput
              label={"Max For Single Bet"}
              fullWidth={true}
              iconName={"fa fa-wallet"}
              type={"number"}
              disabled={false}
              value={userInfo ? userInfo.betLimitForSingle : 0}
              onChange={(e) => setUserInfo("betLimitForSingle", e.target.value)}
            />
          </div>
        </div>
        <h4>Single Bet Commission</h4>
        <div className="row">
          <div className="col-md-6 col-12">
            <MyTextInput
              label={"Tax 5% Commission"}
              fullWidth={true}
              iconName={"fa fa-percentage"}
              //type={"number"}
              disabled={false}
              error={commission5Error}
              value={commissionInfo&&commissionInfo.singleCommission5 ? commissionInfo.singleCommission5 : 0}
              //onChange={(e) => setSingleCommission5(e.target.value)}
              onChange={(e) =>
                
                onChangeText("singleCommission5", e.target.value)
              }
            />
          </div>

          <div className="col-md-6 col-12">
            <MyTextInput
              label={"Tax 8% Commission"}
              fullWidth={true}
              iconName={"fa fa-percentage"}
              type={"number"}
              disabled={false}
              error={commission8Error}
              // value={singleCommission8 ? singleCommission8 :0}
              value={0}
              onChange={(e) =>
                onChangeText("singleCommission8", e.target.value)
              }
            />
          </div>
        </div>
        <hr />
        <h4>Mix Bet Commission</h4>
        <div className="row">
          <div className="col-md-6 col-12">
            <MyTextInput
              // key={data.UserCommissionId}
              label={`Match Count 2 Commission 15%`}
              fullWidth={true}
              iconName={"fa fa-percentage"}
              type={"number"}
              disabled={false}
              error={commissionMatch2Error}
              value={commissionInfo ? commissionInfo.commissionForMatch2 : 0}
              onChange={(e) => onChangeText("commissionMatch2", e.target.value)}
            />
          </div>
          <div className="col-md-6 col-12">
            <MyTextInput
              // key={data.UserCommissionId}
              label={`Match Count 3 Commission 20%`}
              fullWidth={true}
              iconName={"fa fa-percentage"}
              type={"number"}
              disabled={false}
              error={commissionMatch3Error}
              value={commissionInfo ? commissionInfo.commissionForMatch3 : 0}
              onChange={(e) => onChangeText("commissionMatch3", e.target.value)}
            />
          </div>
          <div className="col-md-6 col-12">
            <MyTextInput
              // key={data.UserCommissionId}
              label={`Match Count 4 Commission 20%`}
              fullWidth={true}
              iconName={"fa fa-percentage"}
              type={"number"}
              disabled={false}
              error={commissionMatch4Error}
              value={commissionInfo ? commissionInfo.commissionForMatch4 : 0}
              onChange={(e) => onChangeText("commissionMatch4", e.target.value)}
            />
          </div>
          <div className="col-md-6 col-12">
            <MyTextInput
              // key={data.UserCommissionId}
              label={`Match Count 5 Commission 20%`}
              fullWidth={true}
              iconName={"fa fa-percentage"}
              type={"number"}
              disabled={false}
              error={commissionMatch5Error}
              value={commissionInfo ? commissionInfo.commissionForMatch5 : 0}
              onChange={(e) => onChangeText("commissionMatch5", e.target.value)}
            />
          </div>
          <div className="col-md-6 col-12">
            <MyTextInput
              // key={data.UserCommissionId}
              label={`Match Count 6 Commission 20%`}
              fullWidth={true}
              iconName={"fa fa-percentage"}
              type={"number"}
              disabled={false}
              error={commissionMatch6Error}
              value={commissionInfo ? commissionInfo.commissionForMatch6 : 0}
              onChange={(e) => onChangeText("commissionMatch6", e.target.value)}
            />
          </div>
          <div className="col-md-6 col-12">
            <MyTextInput
              // key={data.UserCommissionId}
              label={`Match Count 7 Commission 20%`}
              fullWidth={true}
              iconName={"fa fa-percentage"}
              type={"number"}
              disabled={false}
              error={commissionMatch7Error}
              value={commissionInfo ? commissionInfo.commissionForMatch7 : 0}
              onChange={(e) => onChangeText("commissionMatch7", e.target.value)}
            />
          </div>
          <div className="col-md-6 col-12">
            <MyTextInput
              // key={data.UserCommissionId}
              label={`Match Count 8 Commission 20%`}
              fullWidth={true}
              iconName={"fa fa-percentage"}
              type={"number"}
              disabled={false}
              error={commissionMatch8Error}
              value={commissionInfo ? commissionInfo.commissionForMatch8 : 0}
              onChange={(e) => onChangeText("commissionMatch8", e.target.value)}
            />
          </div>
          <div className="col-md-6 col-12">
            <MyTextInput
              // key={data.UserCommissionId}
              label={`Match Count 9 Commission 25%`}
              fullWidth={true}
              iconName={"fa fa-percentage"}
              type={"number"}
              disabled={false}
              error={commissionMatch9Error}
              value={commissionInfo ? commissionInfo.commissionForMatch9 : 0}
              onChange={(e) => onChangeText("commissionMatch9", e.target.value)}
            />
          </div>
          <div className="col-md-6 col-12">
            <MyTextInput
              // key={data.UserCommissionId}
              label={`Match Count 10 Commission 25%`}
              fullWidth={true}
              iconName={"fa fa-percentage"}
              type={"number"}
              disabled={false}
              error={commissionMatch10Error}
              value={commissionInfo ? commissionInfo.commissionForMatch10 : 0}
              onChange={(e) =>
                onChangeText("commissionMatch10", e.target.value)
              }
            />
          </div>
          <div className="col-md-6 col-12">
            <MyTextInput
              // key={data.UserCommissionId}
              label={`Match Count 11 Commission 25%`}
              fullWidth={true}
              iconName={"fa fa-percentage"}
              type={"number"}
              disabled={false}
              error={commissionMatch11Error}
              value={commissionInfo ? commissionInfo.commissionForMatch11 : 0}
              onChange={(e) =>
                onChangeText("commissionMatch11", e.target.value)
              }
            />
          </div>
        </div>

        <MyButton
          // onClick={createMemeberDetail}
          type={"submit"}
          text={"SAVE"}
          icon={<Icon className="fa fa-save" color="default" />}
        />
      </form>
    </>
  );
};
