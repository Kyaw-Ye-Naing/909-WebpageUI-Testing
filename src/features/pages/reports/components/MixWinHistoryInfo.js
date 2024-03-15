import React, { useEffect, useState } from 'react';
import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
  } from "@material-ui/core";
import { useParams, withRouter } from "react-router-dom";
import { withTheme } from '../../../common/hoc/withTheme';
import { useMediaPredicate } from "react-media-hook";
import SearchBar from "material-ui-search-bar";
import MyColor from "../../../../config/color";
import { MyEventModal } from '../../../common/components/MyEventModal';
import { reportController } from '../../../../controllers/reportController';

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

const MixWinHistoryInfo = (props) => {
      const classes = useStyles();
      const { selectedDate,mixtype } = useParams();
      const [rowPerPage, setRowPerPage] = useState(5);
      const [page, setPage] = useState(0);
      const [gamId, setGamId] = useState(0);
      const [searchText, setSearchText] = useState("");
      const [mixVoucherList, setMixVoucherList] = useState([]);
      const [searchVoucher, setSearchVoucher] = useState([]);
      const isPhone = useMediaPredicate("(max-width: 800px)");
      const [totalBetAmt,setTotalBetAmt] = useState();
      const [totalWinAmt,setTotalWinAmt] = useState();

      useEffect(() => {
        getMixVoucher();
      }, []);

      const getMixVoucher = () => {
        props.setLoading(true);
        reportController.getMixWinVoucherInfo(selectedDate,mixtype,(data) => {
        setMixVoucherList(data.payload);
        setSearchVoucher(data.payload);
        let allTotal = data.payload.reduce(function (acc, obj) {
          return acc + obj.amount; 
        }, 0);
        let winTotal = data.payload.reduce(function (acc, obj) {
            return acc + obj.inward; 
          }, 0);
        setTotalBetAmt(allTotal);
        setTotalWinAmt(winTotal);
        props.setLoading(false);
        });
      };

      const requestSearch = (value) => {
        setSearchText(value);
        const voucherFilter = mixVoucherList.filter((v) => {
          return (
            v.username.toLowerCase().includes(value.toLowerCase()) ||
            v.postingNo.toLowerCase().includes(value.toLowerCase())  ||
            v.name.toLowerCase().includes(value.toLowerCase())
          );
        });
    
        setSearchVoucher(voucherFilter);
      };
    
      const cancelSearch = () => {
        setSearchText("");
        requestSearch("");
      };
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const onClickDetail = (gamblingId) => {
        setGamId(gamblingId);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowPerPage(+event.target.value);
        setPage(0);
      };

  return (
      <Paper className={classes.root}>
      <MyEventModal gamblingWinId={gamId} setLoading={props.setLoading} />
      <h2 style={{marginLeft:8}}>Mix Win Voucher List ({mixtype} mix)</h2>
      <hr />
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <SearchBar
                  placeholder={"Search"}
                  value={searchText}
                  style={{ marginBottom: 10, marginLeft: 15, width: isPhone ? 200 : 300 }}
                  onChange={(searchVal) => requestSearch(searchVal)}
                  onCancelSearch={() => cancelSearch()}
              />
              <div className='d-flex flex-column '>
                  <span style={{ fontSize: "1rem", fontWeight: 600, marginBottom: '12px' }}>Total Bet Amount : {totalBetAmt} Ks</span>
                  <span style={{ fontSize: "1rem", fontWeight: 600, marginBottom: '12px' }}>Total Win Amount : {totalWinAmt} Ks</span>
              </div>
          </div>
    
        <div>
          {/* <VoucherViewModal gamblingId={gamId} setLoading={props.setLoading}/> */}
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
                {searchVoucher.length > 0 &&
                  searchVoucher
                    .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                    .map((v, k) => (
                      <TableRow key={k}>
                        <TableCell>
                          {page > 0 ? k + 1 + rowPerPage * page : k + 1}
                        </TableCell>
                        <TableCell align="left">
                          {v.postingNo} <br />{" "}
                          <small>
                            {v.createdDate}
                          </small>
                        </TableCell>
                        <TableCell align="left">{v.username}</TableCell>
                        <TableCell align="left">{v.name}</TableCell>
                        <TableCell align="left">{v.amount}</TableCell>
                        <TableCell>
                          {v.inward}
                        </TableCell>
                        <TableCell>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              onClickDetail(v.gamblingWinId);
                            }}
                            data-toggle="modal"
                            data-target="#exampleModalLong"
                            style={{
                              backgroundColor: MyColor.secondaryBackground,
                            }}
                          >
                            View Details
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={mixVoucherList.length}
            rowsPerPage={rowPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
    
        {/* <div className="d-flex justify-content-center align-items-center">
          <h2>No Data Found!</h2>
        </div> */}
    </Paper>
  )
}

export default withRouter(withTheme(MixWinHistoryInfo));

const columns = [
    {
      id: "no",
      label: "No",
      align: "left",
      minWidth: 50,
    },
    {
      id: "date&voucher",
      label: "Date & Voucher",
      align: "left",
      minWidth: 50,
    },
    {
      id: "userId",
      label: "UserId",
      align: "left",
      minWidth: 50,
    },
    {
      id: "name",
      label: "Name",
      align: "left",
      minWidth: 50,
    },
    {
      id: "betAmount",
      label: "Bet Amount",
      align: "left",
      minWidth: 50,
    },
    {
      id: "winAmount",
      label: "Win Amount",
      align: "left",
      minWidth: 50,
    },
    {
      id: "action",
      label: "Action",
      align: "left",
      minWidth: 20,
    },
  ];
