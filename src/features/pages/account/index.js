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
import React, { useContext, useState, Fragment } from "react";
import { MyPasswordInput } from "../../common/components";
import MyButton from "../../common/components/MyButton";
import { userController } from "../../../controllers/userController";
import AppContext from "../../../context/AppContext";
import { MyActivity } from "../../common/components/MyActivity";
import { toast } from "react-toastify";
import { withTheme } from "../../common/hoc/withTheme";
import {logout} from '../../../controllers/_constants'

const useStyles = makeStyles((theme) => ({
  cartroot: {
    minWidth: 400,
    maxWidth: 450,
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Account = props => {
  const classes = useStyles();
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  const { userData } = useContext(AppContext);
  const userInfo = JSON.parse(userData);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onResetClick = (e) => {
    e.preventDefault();
    props.setLoading(true)
    if (values.newPassword === values.confirmPassword && values.newPassword != null && values.confirmPassword != null) {
      props.setLoading(true);
      let oldPwd = {
        userId: userInfo.userId,
        oldPassword: values.oldPassword
      }
      let newPwd = {
        userId: userInfo.userId,
        newPassword: values.newPassword
      }
      let activityList = {
        newData: JSON.stringify(newPwd),
        oldData: JSON.stringify(oldPwd),
        action: "update",
        remark: null,
        newUser: userInfo.userId,
        pageName: "Change Account Password"
      }

      userController.changePassword(
        userInfo.userId,
        values.oldPassword,
        values.newPassword,
        (data) => {
          if (data.message==="Successfully Changed") {
            MyActivity(activityList);
          }
          toast.success(data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          logout();
          props.setLoading(false);
        }
      );
      props.setLoading(false)
    } else {
      toast.warning("Password are do not match!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      props.setLoading(false)
    }
    
  };

  return (
    <div className="pt-5">
      <Card className={classes.cartroot}>
      <form  /*onsubmit={e=>onResetClick(e)}*/>
        <CardContent>
          <h4>Change Password</h4>
          {(
            <Fragment>
              <MyPasswordInput
                value={values.oldPassword}
                onChange={handleChange("oldPassword")}
                label={"Old Password"}
                iconName={"fa fa-key"}
                required={true}
              />
              <MyPasswordInput
                value={values.newPassword}
                onChange={handleChange("newPassword")}
                label={"New Password"}
                iconName={"fa fa-key"}
                required={true}
              />

              <MyPasswordInput
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                label={"Confirm Password"}
                iconName={"fa fa-lock"}
                required={true}
              />
            </Fragment>
          )}

          <FormControl error>
            {values.newPassword !== values.confirmPassword && (
              <FormHelperText id="component-error-text">
                Password are do not match.
              </FormHelperText>
            )}
          </FormControl>
          <MyButton
            icon={<Icon className="fa fa-sync-alt" color="default" />}
            onClick={e=>onResetClick(e)}
            text={"Change Password"}
            type="submit"
            fullWidth={true}
          />
        </CardContent>
      </form>
      </Card>
    </div>
  );
};
export default withTheme(Account);
