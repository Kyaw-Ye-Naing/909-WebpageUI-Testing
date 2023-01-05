import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Icon,
  makeStyles,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React, {
  useState,
  Fragment,
  useLocation,
  useContext,
  useEffect,
} from "react";
import { userController } from "../../../../../controllers/userController";
import { MyTextInput } from "../../../../common/components";
import MyButton from "../../../../common/components/MyButton";
import { toast } from "react-toastify";
import { MyActivity } from "../../../../common/components/MyActivity";
import AppContext from "../../../../../context/AppContext";
import color from "../../../../../config/color";
import { useMediaPredicate } from "react-media-hook";

const useStyles = makeStyles((theme) => ({
  cartroot: {
    minWidth: 300,
    // maxWidth: 350,
    border : '1px solid lightgray',
    padding : 20,
    borderRadius: 10
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export const ManageBalance = ({ userInfo, updateAgentData }) => {
  const classes = useStyles();
  const [value, setValue] = useState("add");
  const [credit, setCredit] = useState(false);
  const [amount, setAmount] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [commission, setCommission] = useState(null);
  const { userData, updateUserData } = useContext(AppContext);
  let contextData = JSON.parse(userData);
  const isPhone = useMediaPredicate("(max-width: 850px)");
  const [isLoading,setIsLoading] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const OnClickBalance = () => {
    setIsLoading(true);
    console.log("dfdfdf",isLoading);
    let amountList = {
      userId: userInfo.Id,
      amount: amount,
    };
    let strList = JSON.stringify(amountList);

    if (amount === "") {
      toast.warning("Please Fill Amount!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      if (credit) {
        if (contextData.userId !== 1) {
          if (parseInt(amount) > contextData.balance) {
            toast.error("Balance is not enough!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          } else {
            let activityList = {
              newData: strList,
              oldData: null,
              action: "save",
              remark: null,
              newUser: contextData.userId,
              pageName: "Add Credit",
            };
            setShowLoading(true);
            userController.userCreditAdd(
              userInfo.Id,
              parseInt(amount),
              (data) => {
                updateAgentData();
                updateUserData();

                toast.success(data.message, {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
                setShowLoading(false);
                MyActivity(activityList);
                setAmount("");
              }
            );
          }
        }
      } else {
        let activityList = {
          newData: strList,
          oldData: null,
          action: "save",
          remark: null,
          newUser: contextData.userId,
          pageName: "Add Balance",
        };
        if (value === "add") {
          if (contextData.userId !== 1) {
            if (parseFloat(amount) > contextData.balance) {
              toast.error("Balance is not enough!", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            } else {
             setShowLoading(true);
              userController.userBalanceAdd(
                userInfo.Id,
                parseFloat(amount),
                (data) => {
                  updateAgentData();
                  updateUserData(); //////to context

                  toast.success(data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                  setShowLoading(false);
                  setIsLoading(false);
                  MyActivity(activityList);
                  setAmount("");
                }
              );
            }
          } else {
            setShowLoading(true);
            userController.userBalanceAdd(
              userInfo.Id,
              parseFloat(amount),
              (data) => {
                updateAgentData();
                updateUserData(); //////to context

                toast.success(data.message, {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
                setShowLoading(false);
                setIsLoading(false);
                MyActivity(activityList);
                setAmount("");
              }
            );
          }
        } else {
          if (parseFloat(amount) > userInfo.balance) {
            toast.error("Balance cannot be removed!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          } else {
            let activityList = {
              newData: strList,
              oldData: null,
              action: "remove",
              remark: null,
              newUser: contextData.userId,
              pageName: "Remove Credit",
            };
            setShowLoading(true);
            userController.userBalanceRemove(
              userInfo.Id,
              parseFloat(amount),
              (data) => {
                updateAgentData();
                updateUserData();
                toast.success(data.message, {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
                setShowLoading(false);
                MyActivity(activityList);
                setAmount("");
              }
            );
          }
        }
      }
    }
  };

  return (
    <div className={classes.cartroot}>
      {/* <Card >
        <CardContent> */}
      <h4>Manage Balance</h4>
      {
        <Fragment>
          <MyTextInput
            label={"Amount"}
            fullWidth={true}
            iconName={"fa fa-wallet"}
            type={"number"}
            disabled={false}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {!credit ? (
            <RadioGroup
              value={value}
              onChange={handleChange}
              row
              fullWidth={true}
            >
              <FormControlLabel
                value="add"
                control={<Radio color="primary" />}
                label="Add"
              />
              <FormControlLabel
                value="remove"
                control={<Radio color="primary" />}
                label="Remove"
              />
            </RadioGroup>
          ) : null}
        </Fragment>
      }

      {/* <FormControlLabel
            control={
              <Checkbox
                checked={credit}
                onChange={() => setCredit(!credit)}
                name="credit"
                color="primary"
              />
            }
            label="Credit"
          />---26-1-2021--kyn--*/}

      <MyButton
        icon={isLoading ?<Icon className="fas fa-spinner" color="default" />:<Icon className="fa fa-save" color="default" />}
        onClick={()=>OnClickBalance()}
        disabled={isLoading}
        text={isLoading ?"Loading......":credit ? "Add Credit" : value === "add" ? "Add" : "Remove"}
        fullWidth={true}
      />
      <h2 style={{ color: color.secondaryBackground, fontSize: isPhone ? 20 : null }}>
        Balance : {userInfo.balance.toLocaleString("en-US")}
      </h2>
      {/* </CardContent>
      </Card> */}
    </div>
  );
};
