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

export const UserInfo = (props) => {
  const {
    handleSubmit,
    action,
    userInfo,
    commission,
    setCommission,
    setUserInfo,
    
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
  } = props;
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
              value={userInfo ? userInfo.mobile : "-"}
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
              onBlur={(e) => console.log(e)}
              error={commission5Error}
              value={commission.singleCommission5 ?commission.singleCommission5 : 0}
              //onChange={(e) => setSingleCommission5(e.target.value)}
              onChange={(e) =>
                setCommission("singleCommission5", e.target.value)
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
              value={commission.singleCommission8 ? commission.singleCommission8 :0}
              onChange={(e) =>
                setCommission("singleCommission8", e.target.value)
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
              value={commission.mixCommission2Count ? commission.mixCommission2Count : 0}
              onChange={(e) => setCommission("mixCommission2Count", e.target.value)}
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
              value={commission.mixCommission3Count ? commission.mixCommission3Count : 0}
              onChange={(e) => setCommission("mixCommission3Count", e.target.value)}
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
              value={commission.mixCommission4Count ? commission.mixCommission4Count : 0}
              onChange={(e) => setCommission("mixCommission4Count", e.target.value)}
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
              value={commission.mixCommission5Count ? commission.mixCommission5Count : 0}
              onChange={(e) => setCommission("mixCommission5Count", e.target.value)}
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
              value={commission.mixCommission6Count ? commission.mixCommission6Count : 0}
              onChange={(e) => setCommission("mixCommission6Count", e.target.value)}
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
              value={commission.mixCommission7Count ? commission.mixCommission7Count : 0}
              onChange={(e) => setCommission("mixCommission7Count", e.target.value)}
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
              value={commission.mixCommission8Count ? commission.mixCommission8Count : 0}
              onChange={(e) => setCommission("mixCommission8Count", e.target.value)}
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
              value={commission.mixCommission9Count ? commission.mixCommission9Count : 0}
              onChange={(e) => setCommission("mixCommission9Count", e.target.value)}
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
              value={commission.mixCommission10Count ? commission.mixCommission10Count : 0}
              onChange={(e) =>
                setCommission("mixCommission10Count", e.target.value)
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
              value={commission.mixCommission11Count ? commission.mixCommission11Count : 0}
              onChange={(e) =>
                setCommission("mixCommission11Count", e.target.value)
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
