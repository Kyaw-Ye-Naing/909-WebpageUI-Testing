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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    formControl: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      minWidth: 100,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const MixWinHistory = (props) => {
const defaultDate = moment(new Date()).format("YYYY-MM-DD");
const defaultMonth = moment(new Date()).format("YYYY-MM");
const temp_data = sessionStorage.getItem('mix_win_history');
const [startDate, setStartDate] = useState(temp_data === null ? defaultDate : JSON.parse(temp_data).type === 'custom' ? JSON.parse(temp_data).startDate : defaultDate);
const [endDate, setEndDate] = useState(temp_data === null ? defaultDate : JSON.parse(temp_data).type === 'custom' ? JSON.parse(temp_data).endDate : defaultDate);
const [mixWinData, setMixWinData] = useState([]);
const [choseDate,setChoseDate] = useState(temp_data === null ? defaultMonth : JSON.parse(temp_data).type === 'monthly' ? JSON.parse(temp_data).choseDate : defaultMonth);
const [type,setType] = useState(temp_data === null ? 'custom' : JSON.parse(temp_data).type);
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const isPhone = useMediaPredicate("(max-width: 800px)");
const history = useHistory();
const classes = useStyles();
const [total,setTotal] = useState({
  "total" : 0,
  "win": 0,
  "lose":0
});

useEffect(()=>{
 getMixVoucher();
},[])

 const getMixVoucher = () => {
        props.setLoading(true);
        const start_date = type === 'custom' ? startDate : choseDate ;
        const end_date = type === 'custom' ? endDate : choseDate ;
        reportController.getMixWinVoucherList(start_date,end_date,type,(data) => {
        const totalCountSum = data.payload.reduce((accumulator, currentValue) => accumulator + currentValue.totalCount, 0);
        const winCountSum = data.payload.reduce((accumulator, currentValue) => accumulator + currentValue.winCount, 0);
        const loseCountSum = data.payload.reduce((accumulator, currentValue) => accumulator + currentValue.loseCount, 0);
        const obj = {
          "total" : totalCountSum,
          "win": winCountSum,
          "lose":loseCountSum
        } 
        setTotal(obj);
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
    
    if(type === 'custom'){
      const obj = {startDate,endDate,type};
      sessionStorage.setItem("mix_win_history",JSON.stringify(obj));
      history.push(`/mix-win-voucher-view/${startDate}/${endDate}/${type}/${mixtype}`);
    }
    else
    {
      const obj = {choseDate,type};
      sessionStorage.setItem("mix_win_history",JSON.stringify(obj));
      history.push(`/mix-win-voucher-view/${choseDate}/${choseDate}/${type}/${mixtype}`);
    }
  }

  return (
    <div className="container">
         {isPhone ? (<h3 style={{marginLeft:8}}>Mix Win History Report</h3>) : (<h1 style={{marginLeft:8}}>Mix Win History Report</h1>)}
         <Paper className={classes.root}>
         <div className="d-flex p-2 align-items-end">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              onChange={(e)=>setType(e.target.value)}
            >
              <MenuItem value={'custom'}>Custom</MenuItem>
              <MenuItem value={'monthly'}>Monthly</MenuItem>
            </Select>
          </FormControl>
          {
            type === 'custom' ?
            <>
          <TextField
            id="date"
            label=" Date :"
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
            label=" Date :"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </> :
         <TextField
         id="date"
         label=" Date :"
         type="month"
         value={choseDate}
         onChange={(e) => setChoseDate(e.target.value)}
         className={classes.textField}
         InputLabelProps={{
           shrink: true,
         }}
       />
}
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
        <div className="d-flex align-items-center mb-2 ml-2" style={{ fontSize: '0.9rem' }}>
          <span className='ml-3'>Total Voucher : <span style={{fontWeight:'bold'}}>{total.total}</span></span>
          <span className='ml-3'>Total Win Voucher : <span style={{fontWeight:'bold'}}>{total.win}</span></span>
          <span className='ml-3'>Total Lose Voucher : <span style={{fontWeight:'bold'}}>{total.lose}</span></span>
          <span className='ml-3'>Percentage : <span style={{fontWeight:'bold'}}>{total.win === 0 && total.total === 0 ? 0 : ((total.win / total.total) * 100).toFixed(2)}%</span></span>
        </div>
        <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={classes.tableHeader}>
                    Mix Type
                  </TableCell>
                  <TableCell align="left" className={classes.tableHeader}>
                    Bet Amount
                  </TableCell>
                  <TableCell align="left" className={classes.tableHeader}>
                    Win Amount
                  </TableCell>
                  <TableCell align="left" className={classes.tableHeader}>
                    Total Voucher Count
                  </TableCell>
                  <TableCell align="left" className={classes.tableHeader}>
                    Win Voucher Count
                  </TableCell>
                  <TableCell align="left" className={classes.tableHeader}>
                    Lose Voucher Count
                  </TableCell>
                  <TableCell align="left" className={classes.tableHeader}>
                   Percentage
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
                            {(ld.betAmount).toLocaleString("en-US")}
                          </TableCell>
                          <TableCell align="left">
                            {(ld.winAmount).toLocaleString("en-US")}
                        </TableCell>
                        <TableCell align="left">
                            {ld.totalCount}
                        </TableCell>
                        <TableCell align="left">
                            {ld.winCount}
                        </TableCell>
                        <TableCell align="left">
                            {ld.loseCount}
                        </TableCell>
                        <TableCell align="left">
                          {((ld.winCount/ld.totalCount)*100).toFixed(2)}%
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