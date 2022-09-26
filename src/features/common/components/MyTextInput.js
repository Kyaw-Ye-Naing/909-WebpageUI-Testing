import { createMuiTheme,Icon, InputAdornment, makeStyles, TextField, ThemeProvider } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import React from "react";
import myColor from '../../../config/color'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    border:red
  },
  textArea: {
    width:'100%',
    border:red
  }
}));

export const MyTextInput = ({
  label,
  fullWidth,
  iconName,
  type,
  disabled,
  value,
  onChange,
  error,
  isTextArea,
  rows,
  name,
  required
}) => {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {main:`${myColor.bg}`},
    },
  });
  return (
    <ThemeProvider theme={theme}>
      { isTextArea === undefined ? 
        <TextField
        error={error == undefined ? false : error}
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type === undefined ? "text" : type}
        className={classes.margin}
        required={required === undefined ? false : required}
        autoComplete="off"
        autoCapitalize={false}
        autoCorrect={false}
        autoFocus={false}
        // id="input-with-icon-textfield"
        id={name}
        label={label}
        fullWidth={fullWidth}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon className={iconName} color="gray" />
            </InputAdornment>
          ),
        }}
      />
      : 
      <TextField
        id="standard-multiline-static"
        className={classes.textArea}
        label={label}
        fullWidth={fullWidth}
        onChange={onChange}
        multiline
        rows={rows}
        value={value}
        autoComplete="off"
        autoCapitalize={false}
        autoCorrect={false}
        autoFocus={false}
        size="small"
        name={name !== undefined ? name : null}
    />

      }
      
      </ThemeProvider>
  );
};
