import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Box, Collapse, IconButton, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { userController } from "../../../../controllers/userController";
import moment from "moment";
import AppContext from "../../../../context/AppContext";
import MyColor from "../../../../config/color";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

// const history = [
//   {
//     datetime: "28/09/2020, 08:12 am",
//     description: "From Admin",
//     transactionType: "IN",
//     amount: 5000,
//     balance: 5000,
//   },
//   {
//     datetime: "28/09/2020, 08:12 am",
//     description: "To Member",
//     transactionType: "OUT",
//     amount: 5000,
//     balance: 5000,
//   },
//   {
//     datetime: "28/09/2020, 08:12 am",
//     description: "From Admin",
//     transactionType: "WIN",
//     amount: 5000,
//     balance: 5000,
//   },
// ];
const History = [
  {
    no: "1",
    leaguesname: "China Super League",
    teamname: "Hal Nan Gyin Yal",
    bettype: "Over",
    odd: "2 + 90",
  },
  {
    no: "2",
    leaguesname: "Vietnam Division 2",
    teamname: "Ti Yan Gi Yan",
    bettype: "Under",
    odd: "5 + 50",
  },
  {
    no: "3",
    leaguesname: "Vietnam Division 2",
    teamname: "Nan Dinn 2",
    bettype: "Home",
    odd: "1 + 80",
  },
];

export const ExpandedRow1 = (props) => {
  const { userData } = useContext(AppContext);
  const userInfo = JSON.parse(userData);
  const { row, index } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const [history, setHistory] = useState([]);

  const expandClick = () => {
    userController.getGamblingDetail(row.id, (data) => {
      let value = data.winReportsDetails.map((v, k) => {
        return {
          id: k + 1,
          leaguesname: v.leagueName,
          teamname: v.footballTeamMyan,
          bettype: v.betType,
          odd: v.odd,
          color:v.color
        };
      });
      console.log("ko ko lay swe",value);
      setHistory(value);
    });
    setOpen(!open);
  };

  let headerColor = "#dddddd";

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={expandClick}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{row.postingno}</TableCell>
        <TableCell component="th" scope="row">
          {moment(row.date).format("DD-MM-YYYY hh:mm:ss a")}
        </TableCell>
        <TableCell>{row.gamblingtype}</TableCell>
        <TableCell>{row.betamount}</TableCell>
        {/* <TableCell>
         
          {row.teamcount}
        </TableCell>
        <TableCell>
          
          {row.betamount < 0 ? (
            <span style={{ color: MyColor.minusColor }}>{row.betamount}</span>
          ) : (
            row.betamount
          )}
        </TableCell> */}
      </TableRow>
      {history && history.length != 0 && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#dddddd" }}>
                      <TableCell>No</TableCell>
                      <TableCell>League Name</TableCell>

                      <TableCell>Team Name</TableCell>
                      <TableCell>Bet Type</TableCell>

                      <TableCell>Odd</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell>{historyRow.id}</TableCell>
                        <TableCell component="th" scope="row">
                          {historyRow.leaguesname}
                        </TableCell>

                        <TableCell>{historyRow.teamname}</TableCell>
                        <TableCell><span style={{color:historyRow.color}}>{historyRow.bettype}</span></TableCell>                                
                        <TableCell>{historyRow.odd}</TableCell>
                      </TableRow>
                      // {/* {moment(historyRow.date).format("YYYY-MM-DD HH:mm:ss A")} */}
                      // {/* <TableCell>{historyRow.username}</TableCell> */}
                      // {/* <TableCell align="right">
                      //                         {historyRow.lossAmount.toLocaleString("en-US")}
                      //                     </TableCell> */}
                      // {/* <TableCell align="right">
                      //                         {historyRow.balance.toLocaleString("en-US")}
                      //                     </TableCell> */}
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};
