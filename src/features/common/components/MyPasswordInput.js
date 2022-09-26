import {
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    minWidth: '100%',
},
}));

export const MyPasswordInput = ({ label,value, onChange,iconName, required }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false)
  return (
    <FormControl error className={classes.formControl}>
      <TextField
        value={value}
        onChange={onChange}
        // fullWidth={true}
        className={classes.margin}
        id="input-with-icon-textfield"
        label={label}
        type={showPassword ? "text" : "password"}
        required={required === undefined ? false : required}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon className={iconName} color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={()=>setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};
