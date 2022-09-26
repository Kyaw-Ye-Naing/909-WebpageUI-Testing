import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import MyColor from "../../../config/color";
import AppContext from "../../../context/AppContext";
import { userController } from "../../../controllers/userController";
const columns = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "date", label: "Date", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "left",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "balance",
    label: "Balance",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
    // format: (value) => value.toFixed(2),
  },
];

function createData(no, date, description, amount, balance) {
  return { no, date, description, amount, balance };
}

// const rows = [
//   createData(1, "6-10-2020", "Testing", 100000, 100000),
//   createData(2, "6-10-2020", "Testing", 100000, 100000),
//   createData(3, "6-10-2020", "Testing", 100000, 100000),
//   createData(4, "6-10-2020", "Testing", 100000, 100000),
//   createData(5, "6-10-2020", "Testing", 100000, 100000),
//   createData(6, "6-10-2020", "Testing", 100000, 100000),
//   createData(7, "6-10-2020", "Testing", 100000, 100000),
//   createData(8, "6-10-2020", "Testing", 100000, 100000),
//   createData(9, "6-10-2020", "Testing", 100000, 100000),
//   createData(10, "6-10-2020", "Testing", 100000, 100000),
//   createData(11, "6-10-2020", "Testing", 100000, 100000),
//   createData(12, "6-10-2020", "Testing", 100000, 100000),
//   createData(13, "6-10-2020", "Testing", 100000, 100000),
//   createData(14, "6-10-2020", "Testing", 100000, 100000),
//   createData(15, "6-10-2020", "Testing", 100000, 100000),
// ];

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: 10,
    marginRight: 5,
  },
  container: {
    maxHeight: 440,
  },
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export const Transactions = (props) => {
  const { userData } = useContext(AppContext);
  let userInfo = JSON.parse(userData); //userInf.userId
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [transactionDetailsData, setTransactionDetailsData] = React.useState(
    []
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let query = useQuery();

  let _paraDate = query.get("date");
  useEffect(() => {
    userData &&
      userController.getTransactionsDetails(
        userInfo && userInfo.userId,
        _paraDate,
        (data) => {
          if (!data) return null;
          const data1 =
            data.transactions &&
            data.transactions.map(
              (v, k) =>
                // @hmh date and time format change
                ({
                  no: k + 1,
                  balance: v.balance,
                  date: moment(v.createdDate).format("DD-MM-YYYY HH:mm:ss A"),
                  inward: v.inward,
                  description: v.description,
                  amount: v.outward == 0 ? v.inward : v.outward,
                }),
              {}
            );
          setTransactionDetailsData(data1);
        }
      );
  }, [userData]);
  const rows = transactionDetailsData.map((v, k) => {
    createData(v.no, v.createdDate, v.description, v.amount, v.balance);
  });
  return (
    <Paper className={classes.root}>
      <h4>User Transaction Details</h4>
      <hr />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: MyColor.secondaryBackground,
                    color: "#fff",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionDetailsData &&
              transactionDetailsData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
