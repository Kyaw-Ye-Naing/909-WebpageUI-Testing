import React, { useContext, useEffect, useState } from "react";
import { withTheme } from "../../common/hoc/withTheme";
import Mycolor from "../../../config/color";
import MyFont from "../../../config/fonts";
import Table from "./table";
import AppContext from "../../../context/AppContext";
import moment from "moment";
import { MyTable } from "../../common/components/MyTable";
import { userController } from "../../../controllers/userController/userController";

const Dashboard = (props) => {
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  const { userData } = useContext(AppContext);
  const [selectedDateForStart, setSelectedDateForStart] = useState(defaultDate);
  const [selectedDateForEnd, setSelectedDateForEnd] = useState(defaultDate);
  const [transactionsData, setTransactionsData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [seniorMasterCount, setSeniorMasterCount] = useState(0);
  const [masterCount, setMasterCount] = useState(0);
  const [agentCount, setAgentCount] = useState(0);
  const [showLoading, setShowLoading] = useState(false);

  let userInfo = JSON.parse(userData);
  const { history } = props;

  const columns = [
    { id: "id", label: "No", minWidth: 50, maxWidth: 50, align: "left" },
    {
      id: "date",
      label: "Date",
      minWidth: 100,
      maxWidth: 150,
      align: "left",
    },
    {
      id: "transferIn",
      label: "Transfer In",
      minWidth: 50,
      maxWidth: 50,
      align: "left",
    },
    {
      id: "transferOut",
      label: "Transfer Out",
      minWidth: 50,
      maxWidth: 50,
      align: "left",
    },
    {
      id: "commissionAmount",
      label: "Commission Amount",
      minWidth: 50,
      maxWidth: 50,
      align: "left",
    },
    {
      id: "balance",
      label: "Balance",
      minWidth: 50,
      maxWidth: 50,
      align: "left",
    },
    {
      id: "detail",
      label: "Action",
      minWidth: 50,
      maxWidth: 50,
      align: "center",
    },
  ];

  const createData = (
    id,
    date,
    transferIn,
    transferOut,
    commissionAmount,
    balance,
    detail
  ) => {
    return {
      id,
      date,
      transferIn,
      transferOut,
      commissionAmount,
      balance,
      detail,
    };
  };

  const rows = [
    {
      no: 1,
      date: "12.9.2020",
      transferIn: 19300,
      transferOut: 202830,
      commissionAmount: "10%",
      balance: 10000000,
      detail: "btn",
    },
    {
      no: 2,
      date: "12.9.2020",
      transferIn: 19300,
      transferOut: 202830,
      commissionAmount: "10%",
      balance: 10000000,
      detail: "btn",
    },
    {
      no: 3,
      date: "12.9.2020",
      transferIn: 19300,
      transferOut: 202830,
      commissionAmount: "10%",
      balance: 10000000,
      detail: "btn",
    },
  ];

  const detailClick = (data) => {
    let startDate = transactionsData
      .filter((c) => c.id == data)
      .map((v) => v.date);
    history.push(`/transactions?date=${startDate}`);
  };

  const searchDataForTransaction = () => {
    console.log("hey  i am working from table")
    props.setLoading(true);
    userData &&
      userController.getTransactionsForDashboard(
        userInfo && userInfo.userId,
        selectedDateForStart,
        selectedDateForEnd,
        (data) => {
          if (data.message == "Ok") {
            if (!data.userTransactions) return null;
            const data1 = data.userTransactions.map(
              (v, k) => ({
                id: k + 1,
                balance: v.balance,
                date: v.createdDate,
                createdDate: moment(v.createdDate).format("DD-MM-YYYY"),
                inward: v.inward,
                outward: v.outward,
                commissionAmount: v.commissionAmount,
              }),
              {}
            );
            setTransactionsData(data1);
          }

          props.setLoading(false);
        }
      );
  };

  const getUserCount = () => {
    console.log("hey  i am working from count")
    userController.getUserCount((data) => {
      setUserCount(data.userCount);
      setSeniorMasterCount(data.seniorCount);
      setMasterCount(data.masterCount);
      setAgentCount(data.agentCount);
    });
  };

  useEffect(() => {
    getUserCount();
  }, []);

  useEffect(() => {
    searchDataForTransaction();
  }, [userData]);

  return (
    <div className="container">
      <div className="container d-flex flex-row flex-wrap justify-content-around my-2">
        {userInfo && userInfo.userId == 1 ? (
          <Card
            count={seniorMasterCount}
            details={"Senior Master"}
            background={"#303A52"}
            icon={"fas fa-user-friends"}
          />
        ) : (
          <Card1
            count={userInfo ? userInfo.memberCount : 0}
            details={"Members"}
            background={"#000060"}
            icon={"fas fa-user-friends"}
          />
        )}

        {userInfo && userInfo.userId == 1 ? (
          <Card
            count={masterCount}
            details={"Master"}
            background={"#000060"}
            icon={"fas fa-user-friends"}
          />
        ) : (
          <Card1
            count={userInfo ? userInfo.balance.toLocaleString("en-US") : 0}
            details={"Balance"}
            background={"#007a33"}
            icon={"fas fa-dollar-sign"}
          />
        )}

        {userInfo && userInfo.userId == 1 ? (
          <Card
            count={agentCount}
            details={"Agent"}
            background={"#ff6700"}
            icon={"fas fa-user-friends"}
          />
        ) : null}

        {userInfo && userInfo.userId == 1 ? (
          <Card
            count={userCount}
            details={"User"}
            background={"#D7A319"}
            icon={"fas fa-user-friends"}
          />
        ) : (
          <Card1
            count={userInfo ? userInfo.credit.toLocaleString("en-US") : 0}
            details={"Credits"}
            background={"#ff6700"}
            icon={"fas fa-dollar-sign"}
          />
        )}

        {userInfo && userInfo.userId == 1 ? (
          <Card
            count={userInfo ? userInfo.balance.toLocaleString("en-US") : 0}
            details={"Balance"}
            background={"#007a33"}
            icon={"fas fa-dollar-sign"}
          />
        ) : (
          <Card1
            count={
              userInfo
                ? (userInfo.balance - userInfo.credit).toLocaleString("en-US")
                : 0
            }
            details={"Status"}
            background={"#5c5b68"}
            icon={"fas fa-dollar-sign"}
          />
        )}
        {/* <Card
          count={userCount}
          details={"Users"}
          background={"#ff6700"}
          icon={"fas fa-user-friends"}
        /> */}
        {userInfo && userInfo.userId == 1 ? (
          <Card
            count={
              userInfo
                ? (userInfo.balance - userInfo.credit).toLocaleString("en-US")
                : 0
            }
            details={"Status"}
            background={"#5c5b68"}
            icon={"fas fa-dollar-sign"}
          />
        ) : null}
      </div>
      {/* <div className="d-flex align-items-center h-100"> */}
      <div className="container row border rounded pt-2 pb-4">
        <div className="row p-2" style={{ width: "60%" }}>
          <div className="p-2 col-lg-4 col-md-4 col-sm-4">
            <div className="text-muted" style={{ fontSize: MyFont.small }}>
              Start Date:
            </div>
            <div className="" style={{ maxWidth: 200 }}>
              <input
                type="date"
                style={{ width: "100%" }}
                className="form-control"
                value={selectedDateForStart}
                onChange={(v) => setSelectedDateForStart(v.target.value)}
              />
            </div>
          </div>
          <div className="p-2 col-lg-4 col-md-4 col-sm-4">
            <div className="text-muted" style={{ fontSize: MyFont.small }}>
              End Date:
            </div>
            <div className="" style={{ maxWidth: 200 }}>
              <input
                type="date"
                style={{ width: "100%" }}
                className="form-control"
                value={selectedDateForEnd}
                onChange={(v) => setSelectedDateForEnd(v.target.value)}
              />
            </div>
          </div>
          <div
            className="col-lg-4 col-md-4 col-sm-4"
            style={{ padding: "26px 10px 10px 5px" }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              style={{
                backgroundColor: Mycolor.secondaryBackground,
                color: "#fff",
                minWidth: 100,
                maxHeight: 40,
              }}
              onClick={searchDataForTransaction}
            >
              <i className="fas fa-search px-2"></i>Search
            </button>
          </div>
        </div>
        <div className="row w-100 m-0">
          <MyTable
            showLoading={showLoading}
            columns={columns}
            // rows={rows}
            rows={transactionsData.map((v, k) =>
              createData(
                k + 1,
                v.createdDate,
                v.inward,
                v.outward,
                v.commissionAmount,
                v.balance,
                "btn"
              )
            )}
            maxWidth={"800"}
            btnText="Details"
            btnAction={(data) => detailClick(data)}
          />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
export default withTheme(Dashboard);

export const Card = (props) => {
  const { count, details, background, icon } = props;
  return (
    <div className="d-flex justify-content-center p-2 col-lg-4 col-md-4 col-sm-12">
      <div
        className="border bg-white p-2 shadow d-flex justify-content-center"
        style={{
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          minWidth: 80,
        }}
      >
        <i
          className={`${icon} py-3`}
          style={{ color: background, fontSize: 40 }}
        />
      </div>
      <div
        className="border p-1 shadow"
        style={{
          minWidth: 170,
          background: background,
          color: Mycolor.bodyText,
        }}
      >
        <div
          className="px-2 pt-2"
          style={{ fontWeight: 600, fontSize: MyFont.heading }}
        >
          {count}
        </div>
        <div className="px-2 pt-1" style={{ fontSize: MyFont.small }}>
          {details}
        </div>
      </div>
    </div>
  );
};

export const Card1 = (props) => {
  const { count, details, background, icon } = props;
  return (
    <div className="d-flex justify-content-center p-2 col-lg-6 col-md-6 col-sm-12">
      <div
        className="border bg-white p-2 shadow d-flex justify-content-center"
        style={{
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          minWidth: 80,
        }}
      >
        <i
          className={`${icon} py-3`}
          style={{ color: background, fontSize: 40 }}
        />
      </div>
      <div
        className="border p-1 shadow"
        style={{
          minWidth: 170,
          background: background,
          color: Mycolor.bodyText,
        }}
      >
        <div
          className="px-2 pt-2"
          style={{ fontWeight: 600, fontSize: MyFont.heading }}
        >
          {count}
        </div>
        <div className="px-2 pt-1" style={{ fontSize: MyFont.small }}>
          {details}
        </div>
      </div>
    </div>
  );
};
