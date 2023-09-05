import React, { Fragment, useContext, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  Link,
  useLocation,
} from "react-router-dom";
import MyColor from "../../../config/color";
import MyFont from "../../../config/fonts";
import AppContext from "../../../context/AppContext";
import dashboard from "../../pages/dashboard";

const SideBar = (props) => {
  const { userData } = useContext(AppContext);
  let userInfo = JSON.parse(userData);
  const [showReportDetails, setShowReportDetails] = useState(false);
  const [showAgentDetails, setShowAgentDetails] = useState(false);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showSettingDetails, setShowSettingDetails] = useState(false);

  let location = useLocation();
  let loc = location.pathname;
  let isShare = localStorage.getItem("isShare");

  return (
    <div
      className="sidenav text-center pt-2"
      style={{ minWidth: 240, background: MyColor.bg, cursor: "pointer" }}
    >
      <div
        className="pb-0"
        style={{ borderBottom: `1px solid ${MyColor.divider}` }}
      >
        <i
          className="fas fa-user-circle fa-5x"
          style={{ color: MyColor.bodyText }}
        />
        <br></br>
        <span
          className="p-0"
          style={{
            fontWeight: 600,
            fontSize: MyFont.heading2,
            color: MyColor.bodyText,
          }}
        >
          {userInfo && userInfo.username}
        </span>
        <br></br>
        <span className="pt-0" style={{ color: MyColor.bodyText }}>
          {userInfo && userInfo.role}
        </span>
        <p
          className="text-right px-2 pb-0 pt-1 text-center"
          style={{ fontSize: MyFont.small, color: MyColor.bodyText }}
        >
          Points : {userInfo && userInfo.balance.toLocaleString("en-US")}
        </p>
      </div>

      <div className="pb-2">
        <Link
          to={isShare == "true" ? "/subdashboard" : "dashboard"}
          className=""
          style={{
            textDecoration: "none",
            fontWeight: loc.includes("dashboard") ? 600 : 400,
          }}
        >
          <div
            className="d-flex p-2 px-3 align-items-center justify-content-between "
            style={{
              background: loc.includes("dashboard")
                ? MyColor.secondarySelected
                : MyColor.dropDownItemColor,
              borderBottom: `1px solid ${MyColor.divider}`,
              color: loc.includes("dashboard")
                ? MyColor.secondarySelectedText
                : MyColor.bodyText,
              fontWeight: loc.includes("dashboard") ? 600 : 400,
            }}
          >
            <div className="d-flex align-items-center">
              <i className="fas fa-home px-2 "></i>
              <div className="">Dashboard</div>
            </div>
          </div>
        </Link>
        <div>
          {isShare == "true" ?
           null
            : 
             <>
            <SideBarItem
              ItemName={userInfo && userInfo.subRole}
              icon={"fas fa-user-cog px-2"}
              loc={loc}
              route="agent"
              showIcon={
                showAgentDetails
                  ? `fas fa-angle-up px-2`
                  : `fas fa-angle-down px-2`
              }
              onClick={() => setShowAgentDetails(!showAgentDetails)}
            />
            {showAgentDetails && (
              <Fragment>
                <Item text="Create" route="agent/create" loc={loc} />
                <Item text="List" route="agent/list" loc={loc} />
                {userInfo && userInfo.roleId == 2 ?
                  <Item text="Sub Masters" route="agent/sub" loc={loc} /> : null
                }
              </Fragment>
            )}
          </>
          }
        </div>
        <div>
          <SideBarItem
            ItemName={"Reports"}
            icon={"fas fa-chart-line px-2"}
            loc={loc}
            route="reports"
            showIcon={
              showReportDetails
                ? `fas fa-angle-up px-2`
                : `fas fa-angle-down px-2`
            }
            onClick={() => setShowReportDetails(!showReportDetails)}
          />
          {showReportDetails && (
            <Fragment>
              {/*--Modified by KYN---*/}
              <Item text="Win/Lose" route="reports/by-collections" loc={loc} />
              {/* <Item text="By Date" route="reports/by-date" loc={loc} /> */}
              {/* <Item text="Win/Lose" route="reports/win/log-report" loc={loc} /> */}
              {userInfo && userInfo.roleId == 1 ? (
                <Item
                  text="Goal Result"
                  route="reports/goal-result"
                  loc={loc}
                />
              ) : null}
              {/* {userInfo&&userInfo.roleId == 1 ? */}
             { isShare == "true" ? null :
              <Item
                text="Member Outstanding"
                route="reports/gambling-report"
                loc={loc}
              />
             }
              {userInfo && userInfo.roleId == 1 ? (
                <Item
                  text="Selected Events"
                  route="reports/selected-events"
                  loc={loc}
                />
              ) : null}
              {userInfo && userInfo.roleId == 1 ? (
                <Item
                  text="Total Bet Amount"
                  route="reports/bet-amount-total"
                  loc={loc}
                />
              ) : null}
              {userInfo && userInfo.roleId == 1 ? (
                <Item
                  text="Body Live Data Report"
                  route="reports/live-data-report"
                  loc={loc}
                />
              ) : null}
              {userInfo && userInfo.roleId == 1 ? (
                <Item
                  text="Goal Live Data Report"
                  route="reports/over-under-report"
                  loc={loc}
                />
              ) : null}
              {userInfo && userInfo.roleId == 1 ? (
                <Item
                  text="Mix Live Data Report"
                  route="reports/mix-report"
                  loc={loc}
                />
              ) : null}
              {userInfo && userInfo.roleId == 1 ? (
                <Item
                  text="Odd Summary Report"
                  route="reports/odd-summary"
                  loc={loc}
                />
              ) : null}
            </Fragment>
          )}
        </div>

        {userInfo && userInfo.roleId == 1 ? (
          <div>
            <SideBarItem
              ItemName={"Settings"}
              icon={"fas fa-cog px-2"}
              loc={loc}
              route="settings"
              showIcon={
                showSettingDetails
                  ? `fas fa-angle-up px-2`
                  : `fas fa-angle-down px-2`
              }
              onClick={() => setShowSettingDetails(!showSettingDetails)}
            />
            {showSettingDetails && (
              <Fragment>
                <Item text="League" route="settings/league" loc={loc} />
                <Item text="Buffer" route="settings/selectedLeague" loc={loc} />
                <Item text="Bet Amount" route="settings/bet-amount" loc={loc} />
                <Item text="Teams" route="settings/teams" loc={loc} />
                {/*<Item text="Bet Earning" route="settings/bet-earning" loc={loc}/>*/}
                <Item
                  text="Activity Logs"
                  route="settings/activity-logs"
                  loc={loc}
                />
                <Item
                  text="Rule and Regulation"
                  route="settings/rule-and-regulation"
                  loc={loc}
                />
                <Item
                  text="Display Text for Mobile"
                  route="settings/display-text-mobile"
                  loc={loc}
                />
              </Fragment>
            )}
          </div>
        ) : null}

        <div>
          <SideBarItem
            ItemName={"Account"}
            icon={"fas fa-shield-alt px-2"}
            loc={loc}
            route="account"
            showIcon={
              showAccountDetails
                ? `fas fa-angle-up px-2`
                : `fas fa-angle-down px-2`
            }
            onClick={() => setShowAccountDetails(!showAccountDetails)}
          />
          {showAccountDetails && (
            <Item
              text="Change Password"
              route={isShare == "true" ? "sub-password" : "account/change-password"}
              loc={loc}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default SideBar;

export const SideBarItem = (props) => {
  const { ItemName, icon, loc, route, showIcon, onClick } = props;
  const bgColor = loc.includes(route)
    ? MyColor.secondarySelected
    : MyColor.dropDownItemColor;
  return (
    <div
      className="d-flex p-2 px-3 align-items-center justify-content-between"
      onClick={onClick}
      style={{
        background: bgColor,
        borderBottom: `1px solid ${MyColor.divider}`,
        color: loc.includes(route)
          ? MyColor.secondarySelectedText
          : MyColor.bodyText,
        fontWeight: loc.includes(route) ? 600 : 400,
      }}
    >
      <div className="d-flex align-items-center">
        <i className={icon}></i>
        <div className="">{ItemName}</div>
      </div>
      <i className={showIcon}></i>
    </div>
  );
};

export const Item = ({ text, route, loc }) => {
  const bgColor = loc.includes(route)
    ? MyColor.secondarySelected
    : MyColor.ddItem;
  return (
    <div className="">
      <Link
        to={`/${route}`}
        className=""
        style={{
          textDecoration: "none",
          fontWeight: loc.includes(route) ? 600 : 400,
        }}
      >
        <div
          className="pl-5 py-1 text-left d-flex flex-column dropDownItem"
          style={{
            borderBottom: `1px solid ${MyColor.divider}`,
            fontSize: MyFont.small1,
            fontWeight: 400,
            background: bgColor,
            color: MyColor.secondaryText,
          }}
        >
          <span>{text}</span>
        </div>
        {/* <div className='pl-5 py-1 text-left d-flex flex-column dropDownItem' style={{ borderRadius: 10, borderBottom: `1px solid ${MyColor.divider}`, fontSize: MyFont.small1, fontWeight: 400, background: bgColor, color: MyColor.secondaryText }}>
          <span>
            {text}
          </span>
        </div> */}
      </Link>
    </div>
  );
};
