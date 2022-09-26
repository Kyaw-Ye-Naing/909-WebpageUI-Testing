import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Box, Collapse, IconButton, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { userController } from "../../../../../controllers/userController";
import moment from "moment";
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

export const MemberTransactionsRow = (props) => {
  const { row, date, userId } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const [history, setHistory] = useState([]);

  const expandClick = () => {
    userController.getTransactionsDetails(parseInt(userId), date, (data) => {
      setHistory(data.transactions);
    });
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={expandClick}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.createdDate}
        </TableCell>
        <TableCell align="right">
          {/* {Math.round(row.inward, 2).toLocaleString("en-US")} */}
          {row.inward.toLocaleString("en-US")}
        </TableCell>
        <TableCell align="right">
          {/* {Math.round(row.outward, 2).toLocaleString("en-US")} */}
          {row.outward.toLocaleString("en-US")}
        </TableCell>
        <TableCell align="right">
          {/* {Math.round(row.betAmount, 2).toLocaleString("en-US")} */}
          {row.betAmount.toLocaleString("en-US")}
        </TableCell>
        <TableCell align="right">
          {/* {Math.round(row.winAmount, 2).toLocaleString("en-US")} */}
          {row.winAmount.toLocaleString("en-US")}
        </TableCell>
        <TableCell align="right">
          {/* {Math.round(row.commissionAmount, 2).toLocaleString("en-US")} */}
          {row.commissionAmount.toLocaleString("en-US")}
        </TableCell>
        <TableCell align="right">
          {/* {Math.round(row.balance, 2).toLocaleString("en-US")} */}
          {row.balance.toLocaleString("en-US")}
        </TableCell>
      </TableRow>
      {history !== [] && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#dddddd" }}>
                      <TableCell>DateTime</TableCell>
                      <TableCell align="left">Description</TableCell>
                      <TableCell align="left">Transaction Type</TableCell>
                      <TableCell align="left">Amount</TableCell>
                      <TableCell align="left">Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history &&
                      history.map((historyRow) => (
                        <TableRow key={historyRow.createdDate}>
                          <TableCell component="th" scope="row">
                            {moment(historyRow.createdDate).format(
                              "DD-MM-YYYY HH:mm:ss A"
                            )}
                          </TableCell>

                          <TableCell align="left">
                            {historyRow.description}
                          </TableCell>
                          <TableCell>{historyRow.transactionType}</TableCell>
                          <TableCell align="left">
                            {historyRow.inward == 0
                              ? historyRow.outward.toLocaleString("en-US")
                              : historyRow.inward.toLocaleString("en-US")}
                          </TableCell>
                          <TableCell align="left">
                            {historyRow.balance.toLocaleString("en-US")}
                          </TableCell>
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
