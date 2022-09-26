import { Icon, InputAdornment, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { MyTextInput } from "../../../../common/components";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
export const MixBetCommission = ({ mixCommission, setMixCommission }) => {
  const classes = useStyles();
  return (
    <>
      <h4>Mix Bet Commission</h4>
      <div className="row">
        {mixCommission[0] &&
          mixCommission.map((data,index) => {
            return (
              <div className="col-md-6 col-12">
                <MyTextInput
                  key={data.UserCommissionId}
                  label={`Match Count ${data.betTeamCount} Commission ${data.commissionType}`}
                  fullWidth={true}
                  iconName={"fa fa-percentage"}
                  type={"number"}
                  disabled={false}
                  value={data.subUserCommission}
                  onChange={(e) => setMixCommission(index,e.target.value)}
                />
              </div>
            )
          })}
      </div>
    </>
  );
};
