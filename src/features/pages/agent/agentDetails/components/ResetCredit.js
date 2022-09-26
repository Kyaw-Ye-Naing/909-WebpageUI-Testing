import { Button, Card, Modal, CardContent, Icon, InputAdornment, 
  makeStyles, TextField, Checkbox, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, {useState, useEffect, useContext} from "react";
import { MyTextInput } from "../../../../common/components";
import MyButton from "../../../../common/components/MyButton";
import { userController } from "../../../../../controllers/userController";
import moment from "moment";
import { toast } from "react-toastify";
import { MyActivity } from "../../../../common/components/MyActivity";
import AppContext from "../../../../../context/AppContext";

const useStyles = makeStyles((theme) => ({
    cartroot: {
      minWidth: 350,
      maxWidth: 350,
    },
    margin: {
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    itemText: {
      width:80
    }
  }));

const rand = () => {
    return Math.round(Math.random() * 20) - 10;
}
  
const getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const list = [
  {
    "transactionType_Id": 5,
    "creditsId": 1,
    "amount": 100000.00,
    "date": "2020-10-26T00:00:00"
},
{
    "transactionType_Id": 5,
    "creditsId": 2,
    "amount": 500.00,
    "date": "2020-12-01T10:48:50.897"
}
];

export const ResetCredit=({ userInfo })=> {
  const [modalOpen, setModalOpen] = useState(false);
  const [creditList, setCreditList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const { userData, updateUserData } = useContext(AppContext);
  let info = JSON.parse(userData);

  useEffect(() => {
    userController.getUserCredit(userInfo.userId, (data) => {
      setCreditList(data);
      if(data.length > 0){
        setCreditList(data);
      }
      if(data.message) {
        setCreditList(data.message);
      }
    })
  },[]);

  const handleOpenModal = () => {
      setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const handleResetCredit = () => {
    let dataList = {
      userId: userInfo.userId,
      creditsDetails: checkedList.map(v => {
        return {
          creditId: v,
          createdBy: info.userId
        }
      })
    };
    let strList = JSON.stringify(dataList);
    let activityList = {
      newData: strList,
      oldData: null,
      action: "save",
      remark: null,
      newUser: info.userId,
      pageName: "Reset Credit"
    }
    userController.saveUserCredit(dataList, (data) => {
      setModalOpen(false);
      toast.success("Process Successful",
        {  position: toast.POSITION.BOTTOM_RIGHT });
      MyActivity(activityList);
    })
    updateUserData();
  }
  
  const handleCheck = (value) => {
    const filterValue = creditList.find(v => v.creditsId === value);

    checkedList.push(filterValue.creditsId);
  }

  return (
    <>
      <Card className={classes.cartroot}>
        <CardContent>
          <h4>Reset Credit</h4>
          
          <Modal
            open={modalOpen}
            //onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
              <div className="row justify-content-between">
                <h2>Credits</h2>
                <div onClick={handleCloseModal}><i className="fa fa-window-close"  aria-hidden="true"></i></div>
              </div>
              <List className={classes.root}>
                {Array.isArray(creditList) ? 
                  creditList.length>0 && creditList.map(value => {
                  const labelId = `checkbox-list-label-${value.creditsId}`;
                  const date = moment(value.date).format("YYYY-MM-DD");
                  return (
                    <ListItem key={value.creditsId} role={undefined} onClick={() => handleCheck(value.creditsId)} dense button >
                        <ListItemIcon>
                          <Checkbox 
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText className={classes.itemText} id={labelId} primary={`${value.amount}`}></ListItemText>
                        <ListItemText id={labelId} primary={date}></ListItemText>
                        
                    </ListItem>
                  );
                }) : 
                <div>{creditList}</div>
              }
              </List>
              <MyButton
                icon={<Icon className="fa fa-credit-card" color="default" />}
                onClick={handleResetCredit}
                text={"Reset"}
                fullWidth={true}
                disabled={Array.isArray(creditList) && creditList.length > 0 ? false : true}
              />
            </div>
          </Modal>
           <MyButton
            icon={<Icon className="fa fa-credit-card" color="default" />}
            onClick={handleOpenModal}
            text={"Credits"}
            fullWidth={true}
          />
          {/* <MyTextInput
            label={"Amount"}
            fullWidth={true}
            iconName={"fa fa-wallet"}
            type={"number"}
            disabled={false}
            value=""
            onChange={(e) => console.log(e.target.value)}
          /> */}
          
          {/* <Button
            fullWidth={true}
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={
              <Icon className="fa fa-redo-alt" color="default" />
            }
          >
            RESET
          </Button> */}

        </CardContent>
      </Card>
    </>
  );
}
