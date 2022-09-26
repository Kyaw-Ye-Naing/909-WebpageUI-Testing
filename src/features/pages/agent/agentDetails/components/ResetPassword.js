import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormHelperText,
  Icon,
  makeStyles,
} from "@material-ui/core";
import React, { useState, Fragment, useContext } from "react";
import { MyPasswordInput } from "../../../../common/components";
import MyButton from "../../../../common/components/MyButton";
import { userController } from "../../../../../controllers/userController";
import { MyActivity } from "../../../../common/components/MyActivity";
import AppContext from "../../../../../context/AppContext";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  cartroot: {
    minWidth: 300,
    border : '1px solid lightgray',
    padding : 20,
    borderRadius: 10,
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export const ResetPassword = ({ userInfo }) => {
  const classes = useStyles();
  const {userData} = useContext(AppContext);
  const contextData = JSON.parse(userData);
  
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onResetClick = () => {
    if (values.password === "" && values.confirmPassword === "") {
      toast.warning("Please Fill Password!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      if (values.password === values.confirmPassword) {
        let infoList = { userId: userInfo.userId, newPassword: values.password}
        let activityList = {
          newData: JSON.stringify(infoList),
          oldData: null,
          action: "save",
          remark: null,
          newUser: contextData.userId,
          pageName: "Reset Password"
        }

        userController.resetPassword(
          userInfo.Id,
          values.password,
          (data) => {
            toast.success(data.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            MyActivity(activityList);
            setValues({password: "", confirmPassword: ""});
          }
        );
      } else {
        toast.warning("Password are do not match!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
  };

  return (
    // <>
      // <div >
        <div className={classes.cartroot}>
          <h4>Reset Password</h4>
          { (
            <Fragment>
              <MyPasswordInput
                value={values.password}
                onChange={handleChange("password")}
                label={"Password"}
                iconName={"fa fa-key"}
              />

              <MyPasswordInput
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                label={"Confirm Password"}
                iconName={"fa fa-lock"}
              />
            </Fragment>
          )}

          <FormControl error>
            {values.password !== values.confirmPassword && (
              <FormHelperText id="component-error-text">
                Password are do not match.
              </FormHelperText>
            )}
          </FormControl>
          <div className='d-flex border px-1 py-0'>
            <MyButton
              icon={<Icon className="fa fa-sync-alt" color="default" />}
              onClick={onResetClick}
              text={"RESET"}
              fullWidth={true}
            />
          </div>
         
        </div>
     
    /* </> */
  );
};
