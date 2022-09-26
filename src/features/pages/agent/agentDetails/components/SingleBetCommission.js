import { Icon, InputAdornment, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { MyTextInput } from "../../../../common/components";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export const SingleBetCommisson = ({singleCommission,setSingleCommission}) => {
  const classes = useStyles();
  return (
    <>
      <h4>Single Bet Commission</h4>
      <div className="row">
        <div className="col-md-6 col-12">
          <MyTextInput
            label={"Tax 5% Commission"}
            fullWidth={true}
            iconName={"fa fa-percentage"}
            type={"number"}
            disabled={false}
            value={singleCommission[0]?singleCommission[0].subUserCommission:''}
            onChange={(e) => setSingleCommission(0,e.target.value)}
          />
        </div>

        <div className="col-md-6 col-12">
          <MyTextInput
            label={"Tax 8% Commission"}
            fullWidth={true}
            iconName={"fa fa-percentage"}
            type={"number"}
            disabled={false}
            value={singleCommission[1]?singleCommission[1].subUserCommission:''}
            onChange={(e) => setSingleCommission(1,e.target.value)}
          />
        </div>
      </div>
    </>
  );
};
