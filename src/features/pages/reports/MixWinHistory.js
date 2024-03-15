import React,{useEffect, useState} from 'react';
import { withTheme } from '../../common/hoc/withTheme';
import { useMediaPredicate } from "react-media-hook";
import { useHistory } from "react-router-dom";
import { makeStyles, Paper, TextField } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MyColor from "../../../config/color";
import moment from "moment";
import { reportController } from '../../../controllers/reportController';

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

const MixWinHistory = (props) => {
const defaultDate = moment(new Date()).format("YYYY-MM-DD");
const temp_date = sessionStorage.getItem('mix_win_history');
const [choseDate, setChoseDate] = useState(temp_date === null ? defaultDate : temp_date);
const [mixWinData, setMixWinData] = useState([]);
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const isPhone = useMediaPredicate("(max-width: 800px)");
const history = useHistory();
const classes = useStyles();

useEffect(()=>{
 getMixVoucher();
},[])

 const getMixVoucher = () => {
        props.setLoading(true);
        reportController.getMixWinVoucherList(choseDate,(data) => {
        setMixWinData(data.payload);
        props.setLoading(false);
        });
      };

const handleChangeRowsPerPage = (event) => {
    // Add by AKPM 27-4-2021
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    // Add by AKPM 27-4-2021
    setPage(newPage);
  };

  const float = (number) => {
    return parseFloat(number).toFixed(2);
  }

  const handleClickView = (mixtype) => {
    sessionStorage.setItem("mix_win_history",choseDate.toString());
    history.push(`/mix-win-voucher-view/${choseDate}/${mixtype}`);
  }

  return (
    <div className="container">
         {isPhone ? (<h3 style={{marginLeft:8}}>Mix Win History Report</h3>) : (<h1 style={{marginLeft:8}}>Mix Win History Report</h1>)}
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
              onClick={getMixVoucher}
            >
              <i className="fas fa-search px-2"></i>Search
            </button>
          </div>
        </div>
        <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={classes.tableHeader}>
                    Mix Type
                  </TableCell>
                  <TableCell align="left" className={classes.tableHeader}>
                    Win Amount
                  </TableCell>
                  <TableCell align="left" className={classes.tableHeader}>
                    Voucher Count
                  </TableCell>
                  <TableCell align="left" className={classes.tableHeader}>
                   Action
                  </TableCell>
                  {/*--------*/}
                </TableRow>
              </TableHead>

              <TableBody>
                {mixWinData.length > 0 &&
                  mixWinData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((ld, ldId) => {
                      return (
                        // <Fragment key={edId}>
                        <TableRow key={ldId}>
                          <TableCell align="center">
                            {ld.gamblingType} mix
                        </TableCell>
                          <TableCell align="left">
                            {ld.winAmount < 0 ? (
                              <span style={{ color: MyColor.minusColor }}>
                                {float(ld.winAmount)}
                              </span>
                            ) : (
                              float(ld.winAmount)
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {ld.voucherCount}
                        </TableCell>
                          <TableCell align="left">
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                handleClickView(ld.gamblingType);
                              }}
                              style={{
                                backgroundColor: MyColor.secondaryBackground,
                              }}
                            >
                              View Details
                            </button>
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
          count={mixWinData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
         </Paper>
    </div>
  )
}

export default withTheme(MixWinHistory);

const configMyan = {
  2 : "၂ မောင်း",
  3 : "၃ မောင်း",
  4 : "၄ မောင်း",
  5 : "၅ မောင်း",
  6 : "၆ မောင်း",
  7 : "၇ မောင်း",
  8 : "၈ မောင်း",
  9 : "၉ မောင်း",
  10 : "၁၀ မောင်း",
  11 : "၁၁ မောင်း",
}