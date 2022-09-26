import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { BetAmount } from "./betAmount";
import { League } from "./league";
import Teams from './teams/TeamTable'
import { BetEarning } from "./betEarning";
import { ActivityLogs } from  "./activityLogs";
import { RuleAndRegulation } from "./ruleAndRegulation";
import { DisplayTextRegulation } from "./displayText";
import { SelectedLeague } from "./league/SelectedLeague";

export const Setting = () => {
  let { url } = useRouteMatch();
  return (
    < >
      <Route path={`${url}/league`} component={League} />
      <Route path={`${url}/selectedLeague`} component={SelectedLeague} />
      <Route path={`${url}/bet-amount`} component={BetAmount} />
      <Route path={`${url}/teams`} component={Teams} />
      <Route path={`${url}/bet-earning`} component={BetEarning} />
      <Route path={`${url}/activity-logs`} component={ActivityLogs}/>
      <Route path={`${url}/rule-and-regulation`} component={RuleAndRegulation} />
      <Route path={`${url}/display-text-mobile`} component={DisplayTextRegulation} />
    </>
  );
};
