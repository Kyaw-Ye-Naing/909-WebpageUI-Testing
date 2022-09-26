import React, { Fragment, useState, useEffect, useContext } from "react";
import { withTheme } from "../../common/hoc/withTheme";
import {
  makeStyles,
  Paper,
  TableContainer,
  TablePagination,
  TextField,
} from "@material-ui/core";
import DataTable from "../dashboard/table";
import { withRouter } from "react-router-dom";
import { MyCollapsibleTable } from "../../common/components/MyCollapsibleTable";
import { MyDateRangeSearch } from "../../common/components/MyDateRange";
import { reportController } from "../../../controllers/reportController";
import AppContext from "../../../context/AppContext";
import MyColor from "../../../config/color";
import { useMediaPredicate } from "react-media-hook";
import { MyEventModal } from "../../common/components/MyEventModal";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 3,
  },
  container: {
    maxHeight: 500,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    padding: 2,
  },
}));

const ByCollections = withRouter((props) => {
  const classes = useStyles();
  const [collectionData, setCollectionData] = useState([]);
  const [back, setBack] = useState(false);
  const [page, setPage] = useState(0); // Add by AKPM 07-09-2021
  const [rowsPerPage, setRowsPerPage] = useState(50); // Add by AKPM 07-09-2021
  const isPhone = useMediaPredicate("(max-width: 800px)");
  const [gamid, setgamid] = React.useState(0);
  // console.log('collection Data ===>', collectionData)

  const {
    collectionDataContext,
    setCollectionDataContext,
    adminRole,
    setAdminRole,
    seniorMasterRole,
    setSeniorMasterRole,
    masterRole,
    setMasterRole,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    userData,
  } = useContext(AppContext);
  let userInfo = JSON.parse(collectionDataContext);
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");

  // console.log('data context ===>', userInfo)
  // console.log('userData ===>', userData);

  useEffect(() => {
    collectionDataContext && getCollectionReport();
    if (window.location.pathname !== "/reports/by-collections") {
      setBack(!back);
    }
    //  console.log('useEffect working ===>')
      // if (window.location.pathname.includes('/reports/collections-seniormaster') && window.location.pathname.includes('/reports/collections-master') && window.location.pathname.includes('/reports/collections-agent')) {
        // setStartDate(defaultDate);
        // setEndDate(defaultDate);
      //   setCollectionData([]);
      //   setAdminRole(1);
      //   setSeniorMasterRole(2);
      //   setMasterRole(3);
      // }
     
  }, [collectionDataContext]);

  // useEffect(() => {
  //   if (window.location.pathname !== '/reports/collections-seniormaster' && window.location.pathname !== '/reports/collections-master' && window.location.pathname !== '/reports/collections-agent') {
  //     setStartDate(defaultDate);
  //     setEndDate(defaultDate);
  //     setCollectionData([]);
  //     setAdminRole(1);
  //     setSeniorMasterRole(2);
  //     setMasterRole(3);
  //   }
  // }, [])

  const columns = [
    {
      id: "account",
      label: "User Id",
      minWidth: 50,
      maxWidth: 50,
      align: "right",
    },
    {
      id: "account",
      label: "Name",
      minWidth: 50,
      maxWidth: 50,
      align: "right",
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 50,
      maxWidth: 50,
      align: "right",
    },
    {
      id: "",
      // label: (userInfo !== null && userInfo.roleId !== undefined) && userInfo.roleId === 1 ? "Senior Master Profit" :
      //   (userInfo !== null && userInfo.roleId !== undefined) && userInfo.roleId === 2 ? "Master Profit" :
      //     (userInfo !== null && userInfo.roleId !== undefined) && userInfo.roleId === 3 ? "Agent Profit" :
      //       (userInfo !== null && userInfo.roleId !== undefined) && userInfo.roleId === 4 ? "User Profit" : "User Profit",
      label: "Member Profit",
      minWidth: 50,
      maxWidth: 50,
      align: "center",
    },
    {
      id: "",
      label:
        userInfo !== null &&
        userInfo.roleId !== undefined &&
        userInfo.roleId === 1
          ? adminRole == 1
            ? "Admin Profit"
            : adminRole == 2
            ? "Senior Master Profit"
            : adminRole == 3
            ? "Master Profit"
            : adminRole == 4
            ? "Agent Profit"
            : "Admin Profit"
          : userInfo !== null &&
            userInfo.roleId !== undefined &&
            userInfo.roleId === 2
          ? seniorMasterRole == 2
            ? "Senior Master Profit"
            : seniorMasterRole == 3
            ? "Master Profit"
            : seniorMasterRole == 4
            ? "Agent Profit"
            : "Senior Master Profit"
          : userInfo !== null &&
            userInfo.roleId !== undefined &&
            userInfo.roleId === 3
          ? masterRole == 3
            ? "Master Profit"
            : masterRole == 4
            ? "Agent Profit"
            : "Master Profit"
          : userInfo !== null &&
            userInfo.roleId !== undefined &&
            userInfo.roleId === 4
          ? "Agent Profit"
          : "User Profit",
      minWidth: 50,
      maxWidth: 50,
      align: "center",
    },
    {
      id: "",
      // label: (userInfo !== null && userInfo.roleId !== undefined) && userInfo.roleId === 1 ? "Company Profit" :
      //   (userInfo !== null && userInfo.roleId !== undefined) && userInfo.roleId === 2 ? "Admin Profit" :
      //     (userInfo !== null && userInfo.roleId !== undefined) && userInfo.roleId === 3 ? "Senior Master Profit" :
      //       (userInfo !== null && userInfo.roleId !== undefined) && userInfo.roleId === 4 ? "Master Profit" : "Agent Profit",
      label: "Company Profit",
      minWidth: 50,
      maxWidth: 50,
      align: "center",
    },
  ];

  const getCollectionReport = () => {
    props.setLoading(true);
    let dataList;
    if (userInfo !== null) {
      if (userInfo.collectionData !== undefined) {
        setCollectionData(userInfo.collectionData);
      } else {
        // if (
        //   userInfo.prevData !== undefined &&
        //   userInfo.startDate !== undefined &&
        //   userInfo.endDate !== undefined
        // ) {
        //   dataList = {
        //     userId: userInfo.userId,
        //     startDate: userInfo.startDate,
        //     endDate: userInfo.endDate,
        //   };
        // } else {
        dataList = {
          userId: userInfo.userId,
          startDate: startDate,
          endDate: endDate,
        };
        // }
        props.setLoading(true);
        reportController.getCollectionData(dataList, (data) => {
          setCollectionData(data);
          props.setLoading(false);
        });
      }
    }
  };

  // var displayhidden =
  //   userInfo.roleId == 1
  //     ? userInfo.roleId == adminRole
  //       ? "none"
  //       : "block"
  //     : userInfo.roleId == 2
  //     ? userInfo.roleId == seniorMasterRole
  //       ? "none"
  //       : "block"
  //     : userInfo.roleId == 3
  //     ? userInfo.roleId == masterRole
  //       ? "none"
  //       : "block"
  //     : userInfo.roleId == 4
  //     ? userInfo.roleId == agentRole
  //       ? "none"
  //       : "block"
  //     : "block";

  const handleBack = () => {
    if (userInfo.roleId == 1) {
      if (adminRole > 1) {
        setAdminRole(adminRole - 1);
      }
    } else if (userInfo.roleId == 2) {
      if (seniorMasterRole > 2) {
        setSeniorMasterRole(seniorMasterRole - 1);
      }
    } else if (userInfo.roleId == 3) {
      if (masterRole > 3) {
        setMasterRole(masterRole - 1);
      }
    }
    // window.history.back();
    if (userInfo !== null && userInfo.prevData !== undefined) {
      var last = userInfo.prevData.slice(-1)[0];
      const currentUrl = window.location.pathname;
      props.history.push(last.path);
      const newUrl = last.path;
      userInfo.roleId = last.roleId;
      userInfo.userId = last.userId;
      userInfo.prevData.splice(-1, 1);
      if (currentUrl === newUrl) {
        handleBack();
      } else {
        // setuserData(JSON.stringify(userInfo));
        setCollectionDataContext(JSON.stringify(userInfo));
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    // Add by AKPM 07-09-2021
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // Add by AKPM 07-09-2021
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewEvent = (gamblingWinId) => {
    //setModalOpen(true);
    // reportController.getCollectionEvent(gamblingWinId, (data) => {
    //   setEventDataDetail(data);
    //   setEventData(data.viewDetails);
    // });
    setgamid(gamblingWinId);
  };

  return (
    <div className="w-100">
      {isPhone ? <h3>Win/Lose Report</h3> : <h1>Win/Lose Report</h1>}
      <Paper className={classes.root}>
        <div className="row p-3">
          <div className="col-12 d-flex flex-warp">
            <TextField
              id="date"
              label="Start date :"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id="date"
              label="End date :"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className="p-2">
              <button
                type="button"
                className="btn btn-secondary"
                style={{
                  backgroundColor: MyColor.secondaryBackground,
                  color: "#fff",
                  minWidth: 100,
                  maxHeight: 40,
                  fontSize: isPhone ? 12 : null,
                }}
                onClick={getCollectionReport}
              >
                <i className="fas fa-search px-2"></i>Search
              </button>
            </div>
          </div>
          <div className="col-2">
            {back && (
              <div className="p-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{
                    backgroundColor: MyColor.secondaryBackground,
                    color: "#fff",
                    minWidth: 100,
                    maxHeight: 40,
                    // display: displayhidden,
                  }}
                  onClick={handleBack}
                >
                  <i className="fas fa-backward"></i> Back
                </button>
              </div>
            )}
          </div>
        </div>
        <MyEventModal gamblingWinId={gamid} setLoading={props.setLoading} />
        <TableContainer className={classes.container}>
          <Fragment>
            <MyCollapsibleTable
              columns={columns}
              rows={collectionData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )}
              maxWidth={400}
              btnText="Edit"
              getCollectionReport={getCollectionReport}
              back={back}
              setBack={setBack}
              handleViewEvent={handleViewEvent}
              // btnAction={(id) => handleOpen(id)}
            />
          </Fragment>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={collectionData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
});

export default withTheme(ByCollections);

// const rows = [
//     {
//       no: 1,
//       date: "12.9.2020",
//       transferIn: 19300,
//       transferOut: 202830,
//       commissionAmount: "10%",
//       balance: 10000000,
//       detail: "btn",
//     },
//     {
//       no: 2,
//       date: "12.9.2020",
//       transferIn: 19300,
//       transferOut: 202830,
//       commissionAmount: "10%",
//       balance: 10000000,
//       detail: "btn",
//     },
//     {
//       no: 3,
//       date: "12.9.2020",
//       transferIn: 19300,
//       transferOut: 202830,
//       commissionAmount: "10%",
//       balance: 10000000,
//       detail: "btn",
//     },
//   ];
