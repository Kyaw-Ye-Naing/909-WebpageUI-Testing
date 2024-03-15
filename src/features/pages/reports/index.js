import React, { Fragment } from "react";
import { withTheme } from "../../common/hoc/withTheme";
import ByDate from "./ByDate";
import ByCollections from "./ByCollections";
import WinLostReport from "./ReportForWinOrLost";
import GamblingReport from "./gambling";
import GoalResult from "./GoalResult";
import BetAmountTotal from "./BetAmountTotal";
import LiveDataReport from "./LiveDataReport";
import MixLiveDataReport from "./MixLiveDataReport";
import GoalLiveDataReport from "./GoalLiveDataReport";
import { ExpandedCollections } from "./ExpandedCollections";
import {
  CollectionsAdmin,
  CollectionsSeniorMaster,
  CollectionsMaster,
  CollectionsAgent,
  CollectionsUser,
  EventWithVoucher,
} from "./components";
import SelectedEvents from "./SelectedEvents";
import OddSummary from "./OddSummary";
import MixWinHistory from "./MixWinHistory";

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const loc =
      this.props.location.pathname === "by-collections"
        ? 1
        : this.props.location.pathname.includes("date")
        ? 2
        : this.props.location.pathname.includes("win")
        ? 3
        : this.props.location.pathname.includes("goal")
        ? 4
        : this.props.location.pathname.includes("gambling-report")
        ? 5
        : this.props.location.pathname.includes("bet-amount-total")
        ? 6
        : this.props.location.pathname.includes("live-data-report")
        ? 7
        : this.props.location.pathname.includes("mix-report")
        ? 8
        : this.props.location.pathname.includes("collections-admin")
        ? 9
        : this.props.location.pathname.includes("collections-seniormaster")
        ? 10
        : this.props.location.pathname.includes("collections-master")
        ? 11
        : this.props.location.pathname.includes("collections-agent")
        ? 12
        : this.props.location.pathname.includes("selected-events")
        ? 13
        :this.props.location.pathname.includes("odd-summary")
        ? 14
        :this.props.location.pathname.includes("over-under-report")
        ? 15
        :this.props.location.pathname.includes("mix-history")
        ? 16
        : 17;

    return (
      <div className="w-100">
        {loc == 1 ? (
          <ByCollections />
        ) : loc == 2 ? (
          <ByDate />
        ) : loc == 3 ? (
          <WinLostReport />
        ) : loc == 4 ? (
          <GoalResult />
        ) : loc == 5 ? (
          <GamblingReport />
        ) : loc == 6 ? (
          <BetAmountTotal />
        ) : loc == 7 ? (
          <LiveDataReport />
        ) : loc == 8 ? (
          <MixLiveDataReport />
        ) : loc == 9 ? (
          <CollectionsAdmin />
        ) : loc == 10 ? (
          <CollectionsSeniorMaster />
        ) : loc == 11 ? (
          <CollectionsAgent />
        ) : loc == 12 ? (
          <ExpandedCollections />
        ) : loc == 13 ? (
          <SelectedEvents />
        ) : loc == 14 ? (
          <OddSummary/>
        ): loc == 15 ? (
          <GoalLiveDataReport/>
        ): loc == 16 ? (
          <MixWinHistory/>
        ):
        (
          <CollectionsUser />
        )}
      </div>
    );
  }
}
export default withTheme(Report);
