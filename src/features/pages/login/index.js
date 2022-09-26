import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Translate } from "@material-ui/icons";

import React, { useContext, useState, useEffect } from "react";
import { withTheme } from "../../../features/common/hoc/withTheme";
import MyColor from "../../../config/color";
import MyButton from "../../common/components/MyButton";
import { loginController } from "../../../controllers/userController/loginController";
import { Icon, InputAdornment, makeStyles, TextField } from "@material-ui/core";
import { toast } from "react-toastify";
import AppContext from "../../../context/AppContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">909 Soccer Gambling</Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    margin: theme.spacing(1),
    backgroundColor: "#fff",
  },
  avatarIcon: {
    color: MyColor.offBg,
    width: 110,
    height: 110,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    height: 40,
    color: "#fff",
    backgroundColor: MyColor.offBg,
  },
  textInput: {
    color: "#fff",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const { userData, setuserData } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginClick = () => {
    props.setLoading(true);
    if (username === "") {
      toast.warning("Please Fill User Name!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      props.setLoading(false);
    } else if (password === "") {
      toast.warning("Please Fill Password!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      props.setLoading(false);
    } else {
      loginController(props, username, password, setuserData, (message) => {
        if (message === "Login Success") {
          toast.success(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          toast.error(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
      props.setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon className={classes.avatarIcon} />
          </Avatar>
          {/* <Typography component="h1" variant="h5">
          Sign in
        </Typography> */}
          <div className={classes.form}>
            <TextField
              className={classes.textInput}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="User name" /// changed label by TNA (07/06/2021)
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              className={classes.textInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => loginClick()}
            >
              Sign In
            </Button>
          </div>
        </div>
      </Container>
      <div style={{ position: "fixed", bottom: 0 }}>
        <Copyright />
      </div>
    </React.Fragment>
  );
};

export default withTheme(Login);

// import React, { useContext, useState } from "react";
// import { withTheme } from "../../../features/common/hoc/withTheme";
// import MyColor from "../../../config/color";
// import MyButton from "../../common/components/MyButton";
// import { loginController } from "../../../controllers/userController/loginController";
// import { Icon, InputAdornment, makeStyles, TextField } from "@material-ui/core";
// import { toast } from "react-toastify";
// import AppContext from "../../../context/AppContext";

// const useStyles = makeStyles((theme) => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
//   multilineColor: {
//     color: "white",
//   },
//   floatingLabelFocusStyle: {
//     color: "white",
//   },
//   label: {
//     "&$focusedLabel": {
//       color: "cyan",
//     },
//     "&$erroredLabel": {
//       color: "orange",
//     },
//   },
//   focusedLabel: {},
//   erroredLabel: {},
//   underline: {
//     "&:before": {
//       borderBottom: `1px solid white`,
//     },
//     "&:after": {
//       borderBottom: `2px solid white`,
//     },
//   },
//   error: {},
// }));

// const Login = (props) => {
//   const { userData, setuserData } = useContext(AppContext);
//   const classes = useStyles();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const loginClick = () => {
//     if (username === "") {
//       toast.warning("Please Fill User Name!", {
//         position: toast.POSITION.BOTTOM_RIGHT,
//       });
//     } else if (password === "") {
//       toast.warning("Please Fill Password!", {
//         position: toast.POSITION.BOTTOM_RIGHT,
//       });
//     } else {
//       loginController(props, username, password,setuserData, (message) => {
//         if (message === "Login Success") {
//           toast.success(message, {
//             position: toast.POSITION.BOTTOM_RIGHT,
//           });
//         } else {
//           toast.error(message, {
//             position: toast.POSITION.BOTTOM_RIGHT,
//           });
//         }
//       });
//     }
//   };
//   return (
//     <div>
//       <div className=" d-flex  justify-content-center " style={{}}>
//         <img
//           src={"/fff.png"}
//           alt="Background"
//           className="img-fluid"
//           style={{ backgroundRepeat: "no-repeat" }}
//         />

//         <div
//           className="d-flex flex-column p-5 rounded"
//           style={{
//             top: "20%",
//             position: "absolute",
//             background: "rgba(42, 1, 3, 0.6)",
//             minHeight: 400,
//           }}
//         >
//           {/* <img src={"./user.png"} alt="user" className=' mx-auto d-block' style={{ width: 100, borderRadius: 50 }} /> */}
//           <div className="d-flex justify-content-center">
//             <i
//               className="fas fa-user-circle fa-7x"
//               style={{ color: MyColor.bodyText }}
//             />
//             <br></br>
//           </div>
//           <div className="py-4" autoComplete={false}>
//             <TextField
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               disabled={false}
//               type={"text"}
//               className={classes.margin}
//               id="input-with-icon-textfield"
//               label={"User Name"}
//               fullWidth={true}
//               placeholder="User Name"
//               InputLabelProps={{
//                 style: { color: "white" },
//                 classes: {
//                   root: classes.label,
//                   focused: classes.focusedLabel,
//                   error: classes.erroredLabel,
//                 },
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Icon className={"fa fa-user"} style={{ color: "white" }} />
//                   </InputAdornment>
//                 ),
//                 className: classes.multilineColor,
//                 classes: {
//                   root: classes.underline,
//                   error: classes.error,
//                 },
//               }}
//             />
//             <br></br>
//             <TextField
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               disabled={false}
//               type={"password"}
//               className={classes.margin}
//               id="input-with-icon-textfield"
//               label={"Password"}
//               fullWidth={true}
//               placeholder="Password"
//               InputLabelProps={{
//                 style: { color: "white" },
//                 classes: {
//                   root: classes.label,
//                   focused: classes.focusedLabel,
//                   error: classes.erroredLabel,
//                 },
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Icon
//                       className={"fas fa-lock"}
//                       style={{ color: "white" }}
//                     />
//                   </InputAdornment>
//                 ),
//                 className: classes.multilineColor,
//                 classes: {
//                   root: classes.underline,
//                   error: classes.error,
//                 },
//               }}
//             />
//             {/* <i className="fas fa-lock px-2" style={{ color: "#fff" }} />
//             <input
//               className="border border-top-0 border-left-0 border-right-0 text-left pt-4"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               // type="password"
//               style={{
//                 background: "transparent",
//                 border: "none",
//                 color: "#FFF",
//                 textAlign: "center",
//                 minWidth: 240,
//                 outline: "none",
//               }}
//             /> */}
//           </div>
//           <br></br>
//           <MyButton name={"Login"} onClick={loginClick} />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default withTheme(Login);
