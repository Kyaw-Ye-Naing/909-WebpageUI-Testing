import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MyColor from "../../../config/color";
import { withRouter } from "react-router-dom";
import { reportController } from "../../../controllers/reportController";
import AppContext from "../../../context/AppContext";
import moment from "moment";


var borderLine = "1px solid black";

export const MyCollapsibleTable = withRouter((props) => {
  const {
    columns,
    maxWidth,
    btnText,
    btnAction,
    showLoading,
    rows,
    getCollectionReport,
    handleViewEvent
  } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { collectionDataContext, startDate, endDate } = useContext(AppContext);
  let userInfo = JSON.parse(collectionDataContext);

  const totalAmount = (items) => {
    return items.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
  };
  const totalSubWL = (items) => {
    return items.map(({ subWL }) => subWL).reduce((sum, i) => sum + i, 0);
  };
  const totalSuCom = (items) => {
    return items.map(({ suCom }) => suCom).reduce((sum, i) => sum + i, 0);
  };
  const totalsubWL_PM = (items) => {
    return items.map(({ subWL_PM }) => subWL_PM).reduce((sum, i) => sum + i, 0);
  };
  const totalUserWL = (items) => {
    return items.map(({ userWL }) => userWL).reduce((sum, i) => sum + i, 0);
  };
  const totalUserCom = (items) => {
    return items.map(({ userCom }) => userCom).reduce((sum, i) => sum + i, 0);
  };
  const totalUserWL_PM = (items) => {
    return items
      .map(({ userWL_PM }) => userWL_PM)
      .reduce((sum, i) => sum + i, 0);
  };
  const totalUpWL = (items) => {
    return items.map(({ upWL }) => upWL).reduce((sum, i) => sum + i, 0);
  };
  const totalUpCom = (items) => {
    return items.map(({ upCom }) => upCom).reduce((sum, i) => sum + i, 0);
  };
  const totalUpWL_PM = (items) => {
    return items.map(({ upWL_PM }) => upWL_PM).reduce((sum, i) => sum + i, 0);
  };

  const totalData = {
    amount: totalAmount(rows),
    subWL: totalSubWL(rows),
    suCom: totalSuCom(rows),
    subWL_PM: totalsubWL_PM(rows),
    userWL: totalUserWL(rows),
    userCom: totalUserCom(rows),
    userWL_PM: totalUserWL_PM(rows),
    upWL: totalUpWL(rows),
    upCom: totalUpCom(rows),
    upWL_PM: totalUpWL_PM(rows),
  };

  const float = (number) => {
    return parseFloat(number).toFixed(2);
  };

  // const amount = totalAmount(rows);
  // const subWL = totalSubWL(rows);
  // const suCom = totalSuCom(rows);
  // const subWL_PM = totalsubWL_PM(rows);
  // const userWL = totalUserWL(rows);
  // const userCom = totalUserCom(rows);
  // const userWL_PM = totalUserWL_PM(rows);
  // const upWL = totalUpWL(rows);
  // const upCom = totalUpCom(rows);
  // const upWL_PM = totalUpWL_PM(rows);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size={"small"}>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                backgroundColor: MyColor.secondaryBackground,
                color: "#fff",
              }}
            />
            {columns.map((column, k) => (
              <TableCell
                // padding={"none"}
                key={k}
                align={column.align}
                colSpan={
                  column.label === "Admin Profit" ||
                  column.label === "Senior Master Profit" ||
                  column.label === "Master Profit" ||
                  column.label === "Agent Profit" ||
                  column.label === "Company Profit" ||
                  column.label === "User Profit" ||
                  column.label === "Member Profit"
                    ? 3
                    : null
                }
                // colSpan={
                //   column.label === "Admin Profit" || column.label === "Senior Master Profit" ||
                //     column.label === "Master Profit" || column.label === "Agent Profit" ||
                //     column.label === "Company Profit" || column.label === "User Profit"
                //     ? 3
                //     : null
                // }
                style={{
                  // border: borderLine,
                  backgroundColor: MyColor.secondaryBackground,
                  color: "#fff",
                }}
              >
                {column.label}
                {column.label === "Admin Profit" ||
                column.label === "Senior Master Profit" ||
                column.label === "Master Profit" ||
                column.label === "Agent Profit" ||
                column.label === "Company Profit" ||
                column.label === "User Profit" ||
                column.label === "Member Profit" ? (
                  <TableRow style={{ color: MyColor.bodyText }}>
                    <TableCell
                      style={{
                        color: MyColor.bodyText,minWidth:"120px"
                      }}
                    >
                      W/L
                    </TableCell>
                    <TableCell style={{ color: MyColor.bodyText,minWidth:"120px" }}>
                      Com
                    </TableCell>
                    <TableCell style={{ color: MyColor.bodyText,minWidth:"120px" }}>
                      W/L + Com
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, k) => (

            <Row
             key={k+row.postingNO}
              row={row}
              dataList={rows}
              id={k + 1}
              startDate={startDate}
              endDate={endDate}
              handleViewEvent={handleViewEvent}
              getCollectionReport={getCollectionReport}
            />
            
          ))}
        </TableBody>
        <TableFooter>
          {rows && rows.length > 0 ? (
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell
                align="right"
                style={{
                  fontSize: 16,
                  color: "black",
                  border: borderLine,
                  fontWeight: "bold",
                }}
              >
                Total All
              </TableCell>
              <TableCell
                align="right"
                style={{
                  color: totalData.amount < 0 ? MyColor.minusColor : "black",
                  fontSize: 15,
                  border: borderLine,
                  fontWeight: "bold",
                }}
              >
                {float(totalData.amount)}
              </TableCell>
              {/*------edited by kyn 8-4-2021 add color to minus data amount---*/}

              <TableCell
                align="right"
                style={{
                  color: totalData.subWL < 0 ? MyColor.minusColor : "black",
                  fontSize: 15,
                  border: borderLine,
                  fontWeight: "bold",
                }}
              >
                {float(totalData.subWL)}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  color: totalData.suCom < 0 ? MyColor.minusColor : "black",
                  fontSize: 15,
                  border: borderLine,
                  fontWeight: "bold",
                }}
              >
                {float(totalData.suCom)}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  color: totalData.subWL_PM < 0 ? MyColor.minusColor : "black",
                  fontSize: 15,
                  border: borderLine,
                  fontWeight: "bold",
                }}
              >
                {float(totalData.subWL_PM)}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  color: totalData.userWL < 0 ? MyColor.minusColor : "black",
                  backgroundColor: MyColor.lightYellow,
                  fontSize: 15,
                  border: borderLine,
                  fontWeight: "bold",
                }}
              >
                {float(totalData.userWL)}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  color: totalData.userCom < 0 ? MyColor.minusColor : "black",
                  backgroundColor: MyColor.lightYellow,
                  fontSize: 15,
                  border: borderLine,
                  fontWeight: "bold",
                }}
              >
                {float(totalData.userCom)}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  color: totalData.userWL_PM < 0 ? MyColor.minusColor : "black",
                  backgroundColor: MyColor.lightYellow,
                  fontSize: 15,
                  border: borderLine,
                  fontWeight: "bold",
                }}
              >
                {float(totalData.userWL_PM)}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  color: totalData.upWL < 0 ? MyColor.minusColor : "black",
                  fontSize: 15,
                  border: borderLine,
                  fontWeight: "bold",
                }}
              >
                {float(totalData.upWL)}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  color: totalData.upCom < 0 ? MyColor.minusColor : "black",
                  fontSize: 15,
                  border: borderLine,
                  fontWeight: "bold",
                }}
              >
                {float(totalData.upCom)}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  color: totalData.upWL_PM < 0 ? MyColor.minusColor : "black",
                  fontSize: 15,
                  border: borderLine,
                  fontWeight: "bold",
                }}
              >
                {float(totalData.upWL_PM)}
              </TableCell>
            </TableRow>
          ) : null}
        </TableFooter>
      </Table>
    </TableContainer>
  );
});

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: 250,
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
  },
}));

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};
const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const Row = withRouter((props) => {
  const { row, id, startDate, endDate, getCollectionReport, dataList , handleViewEvent} = props;
  const [open, setOpen] = React.useState(false);
  const {
    collectionDataContext,
    setCollectionDataContext,
    adminRole,
    setAdminRole,
    seniorMasterRole,
    setSeniorMasterRole,
    masterRole,
    setMasterRole,
    
  } = useContext(AppContext);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [resultList, setResultList] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [eventData, setEventData] = React.useState([]);
  
  const [eventDataDetail, setEventDataDetail] = React.useState([]);

  let userInfo = JSON.parse(collectionDataContext);

  const handleExpand = () => {
    if (userInfo.roleId == 1) {
      if (adminRole < 4) {
        setAdminRole(adminRole + 1);
      }
    } else if (userInfo.roleId == 2) {
      if (seniorMasterRole < 4) {
        setSeniorMasterRole(seniorMasterRole + 1);
      }
    } else {
      if (masterRole < 4) {
        setMasterRole(masterRole + 1);
      }
    }
    let prevList = [];
    let newList = [];
    let prevObj = {
      roleId: userInfo.roleId,
      userId: userInfo.userId,
      path: window.location.pathname,
    };

    if (userInfo.prevData !== undefined && userInfo.prevData.length > 0) {
      prevList = userInfo.prevData;
      prevList.push(prevObj);
    } else {
      prevList.push(prevObj);
    }

    userInfo.prevData = prevList;
    let newRoleId;
    userInfo.newData = [];
    if (open) {
      //userInfo.roleId = prevList.slice(-2)[0].roleId;
      newRoleId = prevList.slice(-2)[0].roleId;
    } else {
      // userInfo.roleId = row.subRoleId;
      newRoleId = row.subRoleId;
    }
    userInfo.userId = row.subUserId;
    userInfo.startDate = startDate;
    userInfo.endDate = endDate;
    userInfo.subRoleId = userInfo.roleId + 1;

    ///// issues fixed by TNA (07/06/2021)
    let newObj = {
      roleId: newRoleId,
      userId: row.subUserId,
      subRoleId: userInfo.roleId + 1,
    };
    newList.push(newObj);
    userInfo.newData = newList;

    let dataList = {
      userId: userInfo.newData[0].userId,
      startDate: userInfo.startDate,
      endDate: userInfo.endDate,
    };

    reportController.getCollectionData(dataList, (data) => {
      userInfo.collectionData = data;

      let newUrl = "collections-user";
      if (data[0].gamblingWinId === 0) {
        if (row.subRoleId === 1) {
          newUrl = "collections-admin";
        } else if (row.subRoleId === 2) {
          newUrl = "collections-seniormaster";
        } else if (row.subRoleId === 3) {
          newUrl = "collections-master";
        } else if (row.subRoleId === 4) {
          newUrl = "collections-agent";
        } else {
          newUrl = "collections-agent";
          setOpen(!open);
        }

        props.history.push(newUrl);
      } else {
        setResultList(data);
        setOpen(!open);
      }
    });
    if (row.subRoleId !== 5) setCollectionDataContext(JSON.stringify(userInfo));
  };

  // const handleViewEvent = (gamblingWinId) => {
  //   //setModalOpen(true);
  //   // reportController.getCollectionEvent(gamblingWinId, (data) => {
  //   //   setEventDataDetail(data);
  //   //   setEventData(data.viewDetails);
  //   // });
  //   setgamid(gamblingWinId);
  // };

  const minuscolor = {
    color: MyColor.minusColor,
  };

  const pluscolor = {
    color: "grey",
  };

  const float = (number) => {
    return parseFloat(number).toFixed(2);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleExpand()}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right" style={{ border: borderLine,minWidth:"90px"}}>
          {row.userId}
        </TableCell>
        <TableCell align="right" style={{ border: borderLine,minWidth:"200px" }}>
          {row.userName}
        </TableCell>
        <TableCell align="right" style={{ border: borderLine }}>
          {float(row.amount)}
        </TableCell>
        {/*------edited by kyn 8-4-2021 add color to minus data amount---*/}
        {row.subWL < 0 ? (
          <TableCell align="right" style={{ border: borderLine }}>
            <span style={minuscolor}>{float(row.subWL)}</span>
          </TableCell>
        ) : (
          <TableCell align="right" style={{ border: borderLine }}>
            {float(row.subWL)}
          </TableCell>
        )}

        {row.suCom < 0 ? (
          <TableCell align="right" style={{ border: borderLine }}>
            <span style={minuscolor}>{float(row.suCom)}</span>
          </TableCell>
        ) : (
          <TableCell align="right" style={{ border: borderLine }}>
            {float(row.suCom)}
          </TableCell>
        )}

        {row.subWL_PM < 0 ? (
          <TableCell align="right" style={{ border: borderLine }}>
            <span style={minuscolor}>{float(row.subWL_PM)}</span>
          </TableCell>
        ) : (
          <TableCell align="right" style={{ border: borderLine }}>
            {float(row.subWL_PM)}
          </TableCell>
        )}

        {row.userWL < 0 ? (
          <TableCell
            align="right"
            style={{
              backgroundColor: MyColor.lightYellow,
              border: borderLine,
            }}
          >
            <span style={minuscolor}>{float(row.userWL)}</span>
          </TableCell>
        ) : (
          <TableCell
            align="right"
            style={{
              backgroundColor: MyColor.lightYellow,
              border: borderLine,
            }}
          >
            {float(row.userWL)}
          </TableCell>
        )}

        {row.userCom < 0 ? (
          <TableCell
            align="right"
            style={{
              backgroundColor: MyColor.lightYellow,
              border: borderLine,
            }}
          >
            <span style={minuscolor}>{float(row.userCom)}</span>
          </TableCell>
        ) : (
          <TableCell
            align="right"
            style={{
              backgroundColor: MyColor.lightYellow,
              border: borderLine,
            }}
          >
            {float(row.userCom)}
          </TableCell>
        )}

        {row.userWL_PM < 0 ? (
          <TableCell
            align="right"
            style={{
              backgroundColor: MyColor.lightYellow,
              border: borderLine,
            }}
          >
            <span style={minuscolor}>{float(row.userWL_PM)}</span>
          </TableCell>
        ) : (
          <TableCell
            align="right"
            style={{
              backgroundColor: MyColor.lightYellow,
              border: borderLine,
            }}
          >
            {float(row.userWL_PM)}
          </TableCell>
        )}

        {row.upWL < 0 ? (
          <TableCell align="right" style={{ border: borderLine }}>
            <span style={minuscolor}>{float(row.upWL)}</span>
          </TableCell>
        ) : (
          <TableCell align="right" style={{ border: borderLine }}>
            {float(row.upWL)}
          </TableCell>
        )}

        {row.upCom < 0 ? (
          <TableCell align="right" style={{ border: borderLine }}>
            <span style={minuscolor}>{float(row.upCom)}</span>
          </TableCell>
        ) : (
          <TableCell align="right" style={{ border: borderLine }}>
            {float(row.upCom)}
          </TableCell>
        )}

        {row.upWL_PM < 0 ? (
          <TableCell align="right" style={{ border: borderLine }}>
            <span style={minuscolor}>{float(row.upWL_PM)}</span>
          </TableCell>
        ) : (
          <TableCell align="right" style={{ border: borderLine }}>
            {float(row.upWL_PM)}
          </TableCell>
        )}
        {/* -------------------------- */}
      </TableRow>
      <TableRow style={{ backgroundColor: MyColor.softHighlight }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="span">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#dddddd" }}>
                    <TableCell>Date & Vouchar</TableCell>
                    <TableCell align="right">Event</TableCell>
                    <TableCell align="right">W/L</TableCell>
                    <TableCell align="right">Com</TableCell>
                    <TableCell align="right">W/L+Com</TableCell>
                    <TableCell align="right">W/L</TableCell>
                    <TableCell align="right">Com</TableCell>
                    <TableCell align="right">W/L+Com</TableCell>
                    <TableCell align="right">W/L</TableCell>
                    <TableCell align="right">Com</TableCell>
                    <TableCell align="right">W/L+Com</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultList &&
                    resultList.map((detail,k) => (
                      <TableRow key={detail.postingNO+k}>
                        <TableCell align="right" style={{ border: borderLine }}>
                          {detail.postingNO} <br />
                          <small>
                            {moment(detail.createdDate).format(
                              "YYYY-MM-DD hh:mm:ss A"
                            )}
                          </small>
                        </TableCell>
                        <TableCell align="right" style={{ border: borderLine }}>
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              handleViewEvent(detail.gamblingWinId)
                            }
                            style={{
                              backgroundColor: MyColor.secondaryBackground,
                            }}
                            data-toggle="modal"
                            data-target="#exampleModalLong"
                          >
                            View
                          </button>
                        </TableCell>
                        {/* //--kyn edited 8-4-2021---remove user win lose */}
                        <TableCell
                          align="right"
                          style={{
                            border: borderLine,
                            color:
                              detail.subWL < 0 ? MyColor.minusColor : "black",
                          }}
                        >
                          {float(detail.subWL)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            border: borderLine,
                            color:
                              detail.suCom < 0 ? MyColor.minusColor : "black",
                          }}
                        >
                          {float(detail.suCom)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            border: borderLine,
                            color:
                              detail.subWL_PM < 0
                                ? MyColor.minusColor
                                : "black",
                          }}
                        >
                          {float(detail.subWL_PM)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            backgroundColor: MyColor.lightYellow,
                            border: borderLine,
                            color:
                              detail.userWL < 0 ? MyColor.minusColor : "black",
                          }}
                        >
                          {float(detail.userWL)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            backgroundColor: MyColor.lightYellow,
                            border: borderLine,
                            color:
                              detail.userCom < 0 ? MyColor.minusColor : "black",
                          }}
                        >
                          {float(detail.userCom)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            backgroundColor: MyColor.lightYellow,
                            border: borderLine,
                            color:
                              detail.userWL_PM < 0
                                ? MyColor.minusColor
                                : "black",
                          }}
                        >
                          {float(detail.userWL_PM)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            border: borderLine,
                            color:
                              detail.upWL < 0 ? MyColor.minusColor : "black",
                          }}
                        >
                          {float(detail.upWL)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            border: borderLine,
                            color:
                              detail.upCom < 0 ? MyColor.minusColor : "black",
                          }}
                        >
                          {float(detail.upCom)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            border: borderLine,
                            color:
                              detail.upWL_PM < 0 ? MyColor.minusColor : "black",
                          }}
                        >
                          {float(detail.upWL_PM)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* <Modal
            open={modalOpen}
            //onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
              <div className="row justify-content-between">
                <h2>View Event</h2>
                <div onClick={() => setModalOpen(false)}><i className="fa fa-window-close"  aria-hidden="true"></i></div>
              </div>
            </div>
          </Modal> */}
      
    </React.Fragment>
  );
});
