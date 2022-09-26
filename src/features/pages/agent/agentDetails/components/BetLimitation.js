import React from "react";
import { MyTextInput } from "../../../../common/components";

export const BetLimitation = ({ userInfo, setUserInfo }) => {
  return (
    <>
      <h4>Bet Limitation</h4>
      <div className="row">
        <div className="col-md-6 col-12">
          <MyTextInput
            label={"Max For Mix Bet"}
            fullWidth={true}
            iconName={"fa fa-wallet"}
            type={"number"}
            disabled={false}
            value={userInfo ? userInfo.betLimitForMix : ""}
            onChange={(e) => setUserInfo('betLimitForMix',e.target.value)}
          />
        </div>

        <div className="col-md-6 col-12">
          <MyTextInput
            label={"Max For Single Bet"}
            fullWidth={true}
            iconName={"fa fa-wallet"}
            type={"number"}
            disabled={false}
            value={userInfo ? userInfo.betLimitForSingle : ""}
            onChange={(e) => setUserInfo('betLimitForSingle',e.target.value)}
          />
        </div>
      </div>
    </>
  );
};
