import { Button,Icon, makeStyles } from "@material-ui/core";
import React from "react";

const MyButton = (props) => {
  const { fullWidth, onClick, type,text,icon, disabled} = props;
  const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(1),      height: 40,
      color: "#fff",
      // backgroundColor: "#560505",
      // "#574b90"
      backgroundColor:"#574b90",
      '&:hover': {
        backgroundColor: '#624dc5',
        color: '#fff',
    }
      
    },
    margin:{    margin: theme.spacing(1),
    }
  }));
  const classes = useStyles();
  return (
    <Button
      type={type}
        fullWidth={fullWidth}
      variant="contained"
      className={classes.submit}
      startIcon={icon?icon:null}
      onClick={onClick}
      disabled={disabled === undefined? false : disabled}
    >
      {text}
    </Button>
  );
};
export default MyButton;
