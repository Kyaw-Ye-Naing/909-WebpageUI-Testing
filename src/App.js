import React, { Fragment, useContext, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  useParams,
} from "react-router-dom";

import "./App.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import Login from "./features/pages/login";
import Dashboard from "./features/pages/dashboard";
import SubDashboard from "./features/pages/dashboard/SubDashboard";
import Navbar from "./features/common/components/Navbar";
import MyColor from "./config/color";
import SideBar from "./features/common/components/sideBar";
import Agent from "./features/pages/agent";
import AgentList from "./features/pages/List";
import Report from "./features/pages/reports";
import Account from "./features/pages/account";
import SubAccount from "./features/pages/SubAccount";
import { Transactions } from "./features/pages/dashboard/Transactions";
import { AgentDetails } from "./features/pages/agent/agentDetails/AgentDetails";
import { Setting } from "./features/pages/settings/Settings";
import { ToastContainer } from "react-toastify";
import Loading from "./features/common/components/Loading";
import { withTheme } from "./features/common/hoc/withTheme";
import AppContext from "./context/AppContext";
import EventWithVoucher from "./features/pages/reports/components/EventWithVoucher";
import MixVoucherView from "./features/pages/reports/components/MixVoucherView";
import BodyVoucherView from "./features/pages/reports/components/BodyVoucherView";
import subPassword from "./features/pages/SubAccount/SubPassword";
import MixWinHistoryInfo from "./features/pages/reports/components/MixWinHistoryInfo";

const App = (props) => {
  const { userData, setuserData } = useContext(AppContext);
  const [showSideBar, setShowSideBar] = useState(true);

  const handleClose = () => {
    setShowSideBar(!showSideBar);
  };
  const { match } = props;
  let show = `${props.location.pathname}` != "/" ? "show" : "";
  // let loginData =JSON.parse(localStorage.getItem("aaaLoginData"))
  // if((!loginData) && props.location.pathname != "/login") {
  //   props.history.push("/login");
  //   return <Route path={"/login"} component={Login} />

  // }

  return (
    <div
      className="d-flex flex-column"
      style={{
        background: MyColor.background,
      }}
    >
      <ToastContainer />
      {props.loading && <Loading loading={props.loading} />}
      {show && <Navbar onClick={() => handleClose()} />}

      <div
        className="d-flex w-100"
        style={
          {
            /*overflow: "hidden"*/
          }
        }
      >
        {show && showSideBar && (
          <div className="h-100 shadow p-0" style={{}}>
            <SideBar match={match} props={props} />
          </div>
        )}

        <div
          className={`main d-flex justify-content-center w-100`}
          style={{
            paddingLeft: !show || !showSideBar ? 0 : 250,
            filter: props.loading && "blur(2px)",
            position: "relative" /*, minWidth: 550,overflowX: "auto"*/,
          }}
        >
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/subdashboard" component={SubDashboard} />
            <Route exact path={"/"} component={Login} />
            <Route path={"/agent/create"} component={Agent} />
            {/* <Route path={"/agent/create"} component={AgentCreate} /> */}
            <Route path={"/agent/list"} component={AgentList} />
            <Route path={"/agent/sub"} component={SubAccount} />
            <Route path={"/reports"} component={Report} />
            <Route path={"/account"} component={Account} />
            <Route path={"/sub-password"} component={subPassword} />
            <Route path={"/transactions"} component={Transactions} />
            <Route path={"/agentDetails"} component={AgentDetails} />
            <Route path={"/settings"} component={Setting} />
            <Route
              path={"/event-with-voucher/:rapidEventId"}
              component={EventWithVoucher}
            />
            <Route path={"/mix-voucher-view/:selectedDate/:mixtype"} 
            component={MixVoucherView} />
             <Route path={"/body-voucher-view/:rapidEventId/:type"} 
            component={BodyVoucherView} />
             <Route path={"/mix-win-voucher-view/:selectedDate/:mixtype"} 
            component={MixWinHistoryInfo} />
            <Redirect to="/" />
          </Switch>

          {/* {(!loginData) && <Redirect to="/login" />} */}
        </div>
      </div>
    </div>
  );
};

export default withTheme(withRouter(App));
