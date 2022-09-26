import React, { useEffect, useState } from "react";
import moment from "moment";
import { makeStyles, Paper, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MyColor from "../../../config/color";
import TableContainer from "@material-ui/core/TableContainer";
import { reportController } from "../../../controllers/reportController";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import { withTheme } from "../../common/hoc/withTheme";
import { useMediaPredicate } from "react-media-hook";

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
  tableHeader: {
    backgroundColor: MyColor.secondaryBackground,
    color: "#fff",
  },
}));

const MixLiveDataReport = (props) => {
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  const [choseDate, setChoseDate] = useState(defaultDate);
  const [mixliveData, setMixLiveData] = useState([]);
  const [page, setPage] = useState(0); // Add by AKPM 27-4-2021
  const [rowsPerPage, setRowsPerPage] = useState(5); // Add by AKPM 27-4-2021
  const classes = useStyles();
  const isPhone = useMediaPredicate("(max-width: 800px)");

  useEffect(() => {
    getmixLiveDataReport();
  }, []);

  const getmixLiveDataReport = () => {
    props.setLoading(true);
    reportController.getMixLiveDataReport(choseDate, (data) => {
      setMixLiveData(data.length > 0 ? data : []);
      props.setLoading(false);
    });
  };

  const handleChangePage = (event, newPage) => {
    // Add by AKPM 27-4-2021
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // Add by AKPM 27-4-2021
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const float = (number) => {
    return parseFloat(number).toFixed(2);
  }

  return (
    <div className="container">
      {isPhone ? (<h3>Mix Live Data Report</h3>) : (<h1>Mix Live Data Report</h1>)}
      <Paper className={classes.root}>
        <div className="d-flex p-2 align-items-end">
          <TextField
            id="date"
            label=" Date :"
            type="date"
            value={choseDate}
            onChange={(e) => setChoseDate(e.target.value)}
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
              onClick={getmixLiveDataReport}
            >
              <i className="fas fa-search px-2"></i>Search
            </button>
          </div>
        </div>
        {
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="right" className={classes.tableHeader}>No</TableCell>
                  <TableCell align="right" className={classes.tableHeader}>
                    Mix Type
                  </TableCell>
                  <TableCell align="right" className={classes.tableHeader}>Count</TableCell>
                  <TableCell align="right" className={classes.tableHeader}>
                    Total Amount
                  </TableCell>

                  {/*--------*/}
                </TableRow>
              </TableHead>

              <TableBody>
                {mixliveData.length > 0 &&
                  mixliveData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((ld, ldId) => {
                      return (
                        // <Fragment key={edId}>
                        <TableRow key={ldId}>
                          <TableCell align="right">
                            {page > 0
                              ? ldId + 1 + rowsPerPage * page
                              : ldId + 1}
                          </TableCell>

                          <TableCell align="right">{ld.mixtype}</TableCell>

                          <TableCell align="right">{ld.count}</TableCell>
                          {/*modified by kyn 22-4-2-21 --add color--*/}

                          <TableCell align="right">
                            {ld.totalamount < 0 ? (
                              <span style={{ color: MyColor.minusColor }}>
                                {float(ld.totalamount)}
                              </span>
                            ) : (
                              float(ld.totalamount)
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        }

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={mixliveData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default withTheme(MixLiveDataReport);
