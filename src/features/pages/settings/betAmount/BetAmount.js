import React, { useState, useEffect, useContext } from "react";
import { MyTable } from "../../../common/components/MyTable";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import MyColor from "../../../../config/color";
import { MyTextInput } from "../../../common/components";
import MyButton from "../../../common/components/MyButton";
import { Button, Icon, ThemeProvider } from "@material-ui/core";
import { userController } from "../../../../controllers/userController/userController";
import { toast } from "react-toastify";
import { MyActivity } from "../../../common/components/MyActivity";
import AppContext from "../../../../context/AppContext";
import { withRouter } from "react-router-dom";
import { withTheme } from "../../../common/hoc/withTheme";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${MyColor.secondaryBackground}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const columns = [
  {
    id: "id",
    label: "No",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
  {
    id: "gamblingType",
    label: "Gambling Type",
    minWidth: 100,
    maxWidth: 150,
    align: "left",
  },
  {
    id: "minBetAmount",
    label: "Min Amount",
    minWidth: 70,
    maxWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "maxBetAmount",
    label: "Max Amount",
    minWidth: 70,
    maxWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "edit", label: "", minWidth: 50, maxWidth: 50, align: "center" },
];

const rows = [
  {
    gamblingTypeId: 1,
    gamblingType: "Single",
    minBetAmount: 500,
    maxBetAmount: 100000,
    edit: "btn",
  },
  {
    gamblingTypeId: 2,
    gamblingType: "Mix",
    minBetAmount: 500,
    maxBetAmount: 100000,
    edit: "btn",
  },
];

export const BetAmount = withTheme(withRouter((props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [minBetAmount, setMinBetAmount] = useState(null);
  const [maxBetAmount, setMaxBetAmount] = useState(null);
  const { userData } = useContext(AppContext);
  const userInformation = JSON.parse(userData);
  // const [modalData, setModalData] = useState([
  //   {
  //     id: 1,
  //     gamblingType: "Single",
  //     minBetAmount: 500,
  //     maxBetAmount: 100000,
  //   },
  // ]);
  const [betAmount, setBetAmount] = useState([]);

  useEffect(() => {
    props.setLoading(true)
    userController.getBetAmount((value) => {
      let data = value.map((v, k) => {
        return {
          id: v.gamblingTypeId,
          gamblingType: v.gamblingType,
          minBetAmount: v.minBetAmount,
          maxBetAmount: v.maxBetAmount,
          edit: "btn",
        };
      });
      setBetAmount(data);
      props.setLoading(false)
    });
  },[]);

  const editBetAmount = () => {
    let oldList = {
      id: modalData.id,
      gamblingType: modalData.gamblingType,
      minBetAmount: modalData.minBetAmount,
      maxBetAmount: modalData.maxBetAmount
    }
    let newList = {
      id: modalData.id,
      gamblingType: modalData.gamblingType,
      minBetAmount: minBetAmount,
      maxBetAmount: maxBetAmount
    }
    let activityList = {
      newData: JSON.stringify(newList),
      oldData: JSON.stringify(oldList),
      action: "update",
      remark: null,
      newUser: userInformation.userId,
      pageName: "Update Bet Amount"
    }
    userController.editBetAmount(modalData.id, modalData.gamblingType,parseInt(minBetAmount),parseInt(maxBetAmount), (data) => {
      toast.success("Updated amount successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      MyActivity(activityList);
      window.location.reload();
    })
    setOpen(false);
    
  }

  const handleOpen = (id) => {
    let result = betAmount.find(function (value) {
      return value.id === id;
    });
    setModalData(result);
    setMinBetAmount(result.minBetAmount);
    setMaxBetAmount(result.maxBetAmount);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className="main justify-content-center w-100 p-1">
      <h4>Bet Amount</h4>
      <MyTable
        columns={columns}
        rows={betAmount}
        maxWidth={""}
        btnText="Edit"
        btnAction={(id) => handleOpen(id)}
      />
      <Modal
       aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
       timeout: 500,
     }}
      >
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{`${modalData.gamblingType} Bet Amount`}</h2>
            <div id="transition-modal-description">
              <MyTextInput
                label="Min Amount"
                fullWidth={true}
                iconName={"fa fa-dollar-sign"}
                type={"number"}
                disabled={false}
                value={minBetAmount}
                onChange={(e) => setMinBetAmount(e.target.value)}
              />
              <MyTextInput
                label="Max Amount"
                fullWidth={true}
                iconName={"fa fa-dollar-sign"}
                type={"number"}
                disabled={false}
                value={maxBetAmount}
                onChange={(e) => setMaxBetAmount(e.target.value)}
              />
              <MyButton
                  icon={<Icon className="fa fa save" color="default" />}
                  onClick={editBetAmount}
                  text={"Save"}
                  fullWidth={true} 
                    />
            </div>
          </div>
        
      </Modal>
    </div>
  );
}));

// import React, { useState, useEffect } from "react";
// import { MyTable } from "../../../common/components/MyTable";
// import { makeStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
// import Fade from "@material-ui/core/Fade";
// import MyColor from "../../../../config/color";
// import { MyTextInput } from "../../../common/components/MyTextInput";
// import { Button, Icon, ThemeProvider } from "@material-ui/core";
// import { userController } from "../../../../controllers/userController/userController";
// import { toast } from "react-toastify";
// import { MyActivity } from "../../../common/components/MyActivity";

// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     border: `2px solid ${MyColor.secondaryBackground}`,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

// const columns = [
//   {
//     id: "id",
//     label: "No",
//     minWidth: 50,
//     maxWidth: 50,
//     align: "left",
//   },
//   {
//     id: "gamblingType",
//     label: "Gambling Type",
//     minWidth: 100,
//     maxWidth: 150,
//     align: "left",
//   },
//   {
//     id: "minBetAmount",
//     label: "Min Amount",
//     minWidth: 70,
//     maxWidth: 100,
//     align: "center",
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "maxBetAmount",
//     label: "Max Amount",
//     minWidth: 70,
//     maxWidth: 100,
//     align: "center",
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   { id: "edit", label: "", minWidth: 50, maxWidth: 50, align: "center" },
// ];

// const rows = [
//   {
//     gamblingTypeId: 1,
//     gamblingType: "Single",
//     minBetAmount: 500,
//     maxBetAmount: 100000,
//     edit: "btn",
//   },
//   {
//     gamblingTypeId: 2,
//     gamblingType: "Mix",
//     minBetAmount: 500,
//     maxBetAmount: 100000,
//     edit: "btn",
//   },
// ];

// export const BetAmount = () => {
//   const classes = useStyles();
//   const [open, setOpen] = useState(false);
//  // const [modalData, setModalData] = useState([]);
//   const [modalData, setModalData] = useState([
//     {
//       id: 1,
//       gamblingType: "Single",
//       minBetAmount: 500,
//       maxBetAmount: 100000,
//     },
//   ]);
//   const [betAmount, setBetAmount] = useState([]);
//   const [prevData, setPrevData] = useState([]);

//   useEffect(() => {
//     userController.getBetAmount((value) => {
//       let data = value.map((v, k) => {
//         return {
//           id: v.gamblingTypeId,
//           gamblingType: v.gamblingType,
//           minBetAmount: v.minBetAmount,
//           maxBetAmount: v.maxBetAmount,
//           edit: "btn",
//         };
//       });
//       setBetAmount(data);
//     });
//   });

//   const editBetAmount = () => {
//     let id = modalData[0].id
//     let gamblingType = modalData[0].gamblingType
//     let minBetAmount = modalData[0].minBetAmount
//     let maxBetAmount = modalData[0].maxBetAmount
//     // userController.editBetAmount(id, gamblingType,minBetAmount,maxBetAmount, (data) => {
//     //   toast.success("Updated amount successful!", {
//     //     position: toast.POSITION.BOTTOM_RIGHT,
//     //   });
//     // })
//     // setOpen(false)
//     // let oldObj = prevData.find(v => v.id === id)
//     // let oldData = {
//     //   id: oldObj.id,
//     //   gamblingType: oldObj.gamblingType,
//     //   minBetAmount: oldObj.minBetAmount,
//     //   maxBetAmount: oldObj.maxBetAmount,
//     // }
//     // let newData = {
//     //   id: id,
//     //   gamblingType: gamblingType,
//     //   minBetAmount: minBetAmount,
//     //   maxBetAmount: maxBetAmount,
//     // };
//   }

//   const handleOpen = (id) => {
//     let result = betAmount.filter(function (value) {
//       return value.id === id;
//     });
//     setModalData(result);
//     setPrevData(result);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleMinBetAmt = (value) => {
//     let obj = { ...modalData };
//     obj[0]["minBetAmount"] = parseInt(value);
//     setModalData(obj);
//   }

//   return (
//     <div className="main justify-content-center w-100 p-1">
//       <h4>Bet Amount</h4>
//       <MyTable
//         columns={columns}
//         rows={betAmount}
//         maxWidth={""}
//         btnText="Edit"
//         btnAction={(id) => handleOpen(id)}
//       />
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         className={classes.modal}
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         {/* <Fade in={open}> */}
//           <div className={classes.paper} key={modalData[0].id}>
//             <h2 id="transition-modal-title">{`${modalData[0].gamblingType} Bet Amount`}</h2>
//             <div id="transition-modal-description">
//               <MyTextInput
//                 label="Min Amount"
//                 fullWidth={true}
//                 iconName={"fa fa-dollar-sign"}
//                 type={"number"}
//                 disabled={false}
//                 value={modalData[0].minBetAmount}
//                 onChange={(e) => handleMinBetAmt(e.target.value)}
//               />
//               <MyTextInput
//                 label="Max Amount"
//                 fullWidth={true}
//                 iconName={"fa fa-dollar-sign"}
//                 type={"number"}
//                 disabled={false}
//                 value={modalData[0].maxBetAmount}
//                 onChange={(e) => {
//                   let obj = { ...modalData };
//                   obj[0]["maxBetAmount"] = parseInt(e.target.value);
//                   setModalData(obj);
//                 }}
//               />
//               <Button
//                 fullWidth={true}
//                 variant="contained"
//                 color="primary"
//                 startIcon={<Icon className="fa fa-save" color="default" />}
//                 style={{ marginTop: 10, marginBottom: 10 }}
//                 onClick={editBetAmount}
//               >
//                 SAVE
//               </Button>
//             </div>
//           </div>
//         {/* </Fade> */}
//       </Modal>
//     </div>
//   );
// };
