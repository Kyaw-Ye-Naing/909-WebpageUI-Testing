import React, { useEffect, useState } from "react";
import { withTheme } from "../../common/hoc/withTheme";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import MyColor from "../../../config/color";
import { TextField } from "@material-ui/core";
import { ExpandedRow } from "./components";
import { MyTable } from "../../common/components";
import { reportController } from "../../../controllers/reportController";
import moment from "moment";
import { escapeSelector } from "jquery";
import { useMediaPredicate } from "react-media-hook";

const BetAmountTotal = (props) => {
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startDate, setStartDate] = useState(defaultDate);
  const [totalBetAmountData, setTotalBetAmountData] = useState([]);
  const [status, setStatus] = useState("");
  const isPhone = useMediaPredicate("(max-width: 800px)");

  useEffect(() => {
    props.setLoading(true);
    getTotalBetAmountData();
  }, []);

  const getTotalBetAmountData = () => {
    reportController.getBetAmountTotal(startDate, (data) => {
      if (data.message == "Ok") {
        setTotalBetAmountData(data.bettingReports);
        props.setLoading(false);
      } else {
        props.setLoading(false);
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const searchBetAmountTotal = () => {
    setTotalBetAmountData([]);
    getTotalBetAmountData();
  };

  const float = (number) => {
    return parseFloat(number).toFixed(2);
  }

  // if(loading){
  //     return(
  //         <div
  //             className="row justify-content-center"
  //             style={{
  //             paddingTop: "38vh",
  //             zIndex: 3000,
  //             }}>
  //         <h3>Loading...</h3>
  //         </div>
  //     )
  // } else {
  return (
    <div>
       {isPhone ? (<h3>Total Bet Amount</h3>) : (<h1>Total Bet Amount</h1>)}
      <Paper className={classes.root}>
        <div className="d-flex p-2 align-items-end">
          <TextField
            id="date"
            label="Choose Date :"
            type="date"
            value={startDate || defaultDate}
            onChange={(e) => setStartDate(e.target.value)}
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
              }}
              onClick={() => searchBetAmountTotal()}
            >
              <i className="fas fa-search px-2"></i>Search
            </button>
          </div>
        </div>
        {totalBetAmountData.length > 0 ? (
          <div>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          maxWidth: column.maxWidth,
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
                  {totalBetAmountData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((v, k) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={v.gamblingTypeId}
                        >
                          <TableCell
                            key={v.eventId}
                            align={"left"}
                            padding="default"
                          >
                            {page > 0 ? k + 1 + rowsPerPage * page : k + 1}
                          </TableCell>
                          <TableCell
                            key={v.eventId}
                            align={"left"}
                            padding="default"
                          >
                            {v.gamblingType}
                          </TableCell>
                          <TableCell
                            key={v.eventId}
                            align={"left"}
                            padding="default"
                          >
                            {v.betAmount < 0 ? (
                              <span style={{ color: MyColor.minusColor }}>
                                {float(v.betAmount)}
                              </span>
                            ) : (
                              float(v.betAmount)
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={totalBetAmountData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        ) : (
          <div className="row justify-content-center pb-3">
            <h4 className="text-secondary">No data found!</h4>
          </div>
        )}
      </Paper>
    </div>
  );
};

const rows = [
  {
    gamblingTypeId: 1,
    gamblingType: "Single",
    betAmount: "20000",
  },
  {
    gamblingTypeId: 2,
    gamblingType: "Mix",
    betAmount: "40000",
  },
];

const columns = [
  {
    id: "gamblingTypeId",
    label: "No",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
  {
    id: "gamblingType",
    label: "Gambling Type",
    minWidth: 100,
    maxWidth: 150,
    align: "left",
  },
  {
    id: "betAmount",
    label: "Bet Amount",
    minWidth: 50,
    maxWidth: 50,
    align: "left",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 3,
  },
  container: {
    maxHeight: 350,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    padding: 2,
  },
  tableHeader: {
    backgroundColor: MyColor.secondaryBackground,
    color: "#fff",
  },
}));

export default withTheme(BetAmountTotal);
