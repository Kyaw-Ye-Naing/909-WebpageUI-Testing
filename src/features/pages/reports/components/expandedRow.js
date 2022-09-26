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
import MyColor from "../../../../config/color";
import moment from "moment";
import AppContext from "../../../../context/AppContext";
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
    date: "6-10-2020",
    username: "Mg Mg",
    betamount: 50000,
    winamount: 1000,
    lossAmount: 10000,
    balance: 2000,
    betTeam: "Arseanal",
  },
  {
    no: "2",
    date: "6-10-2020",
    username: "U Hla",
    betamount: 50000,
    winamount: 1000,
    lossAmount: 10000,
    balance: 2000,
    betTeam: "Liverpool",
  },
  {
    no: "3",
    date: "6-10-2020",
    username: "Aung Aung",
    betamount: 50000,
    winamount: 1000,
    lossAmount: 10000,
    balance: 2000,
    betTeam: "Manchester United",
  },
];

export const ExpandedRow = (props) => {
  const { userData } = useContext(AppContext);
  const userInfo = JSON.parse(userData);
  const { row, date, userId } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const [history, setHistory] = useState(History);

  const expandClick = () => {
    
    ///userInfo ? userInfo.userId : 0
    userController.getWinLoseReportDetail(row.id , (data) => {
      if(data.winReportsDetails){
        let value = data.winReportsDetails.map((v, k) => {
          return {
            id: k+1,
            leaguesname: v.leagueName,
            teamname: v.footballTeamMyan,
            bettype: v.betType,
            odd: v.odd
          };
        });
        setHistory(value)
      }else {
        setHistory(history);
      }
      
    });
    setOpen(!open);
  };

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
        <TableCell>{row.id}</TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell>{row.username}</TableCell>
        <TableCell>{row.gamblingtype}</TableCell>
        <TableCell>
          {row.betamount < 0 ? 
          (<span style={{color: MyColor.minusColor}}>{Math.round(row.betamount, 2).toLocaleString("en-US")}</span>)
          :Math.round(row.betamount, 2).toLocaleString("en-US")}
        </TableCell>
        <TableCell>
        {row.winamount < 0 ? 
          (<span style={{color: MyColor.minusColor}}>{Math.round(row.winamount, 2).toLocaleString("en-US")}</span>)
          :Math.round(row.winamount, 2).toLocaleString("en-US")}
        </TableCell>
        {/* <TableCell align="right">
                    {Math.round(row.lossAmount, 2).toLocaleString("en-US")}
                </TableCell> */}

        {/* <TableCell align="right">
                    {Math.round(row.balance, 2).toLocaleString("en-US")}
                </TableCell>
                <TableCell align="right">
                    {row.betTeam}
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
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>League Name</TableCell>
                      {/* <TableCell>UseName</TableCell> */}
                      <TableCell>Football Team</TableCell>
                      <TableCell>Bet Type</TableCell>
                      {/* <TableCell align="right">Loss Amount</TableCell> */}
                      {/* <TableCell align="right">Balance</TableCell> */}
                      <TableCell>Odd</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map((historyRow) => (
                      <TableRow key={historyRow.no}>
                        <TableCell>{historyRow.id}</TableCell>
                        <TableCell component="th" scope="row">
                          {historyRow.leaguesname}
                        </TableCell>
                        {/* <TableCell>{historyRow.username}</TableCell> */}
                        <TableCell>{historyRow.teamname}</TableCell>
                        <TableCell>
                          {historyRow.bettype}
                        </TableCell>
                        {/* <TableCell align="right">
                                                {historyRow.lossAmount.toLocaleString("en-US")}
                                            </TableCell> */}
                        {/* <TableCell align="right">
                                                {historyRow.balance.toLocaleString("en-US")}
                                            </TableCell> */}
                        <TableCell>{historyRow.odd}</TableCell>
                      </TableRow>
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
