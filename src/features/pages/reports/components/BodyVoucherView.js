import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Badge,
  } from "@material-ui/core";
  import { toast } from "react-toastify";
  import { useMediaPredicate } from "react-media-hook";
  import { reportController } from "../../../../controllers/reportController";
  import MyColor from "../../../../config/color";
  import SearchBar from "material-ui-search-bar";
  import { MyEventModal } from "../../../common/components/MyEventModal";
  import React, { useEffect, useState } from 'react'
  import { useParams, withRouter } from "react-router-dom";
  import { withTheme } from "../../../common/hoc/withTheme";
  const data = [
    {
      "voucherName": "GB09384834834838438",
      "rapidEventId": 3,
      "userName": "Sout Chaw Gyi",
      "bettedDate": "2023-01-17 12:00 pm",
      "userId": "abkaknkynkkl",
      "amount": 50000,
      "gamblingId":1
    },
    {
      "voucherName": "GB09384834834838438",
      "rapidEventId": 3,
      "userName": "Sout Chaw Gyi",
      "bettedDate": "2023-01-17 12:00 pm",
      "userId": "abkaknkynkkl",
      "amount": 50000,
      "gamblingId":2
    },
    {
      "voucherName": "GB09384834834838438",
      "rapidEventId": 3,
      "userName": "Sout Chaw Gyi",
      "bettedDate": "2023-01-17 12:00 pm",
      "userId": "abkaknkynkkl",
      "amount": 50000,
      "gamblingId":3
    },
    {
      "voucherName": "GB09384834834838438",
      "rapidEventId": 3,
      "userName": "Sout Chaw Gyi",
      "bettedDate": "2023-01-17 12:00 pm",
      "userId": "abkaknkynkkl",
      "amount": 50000,
      "gamblingId":4
    },
    {
      "voucherName": "GB09384834834838438",
      "rapidEventId": 3,
      "userName": "Sout Chaw Gyi",
      "bettedDate": "2023-01-17 12:00 pm",
      "userId": "abkaknkynkkl",
      "amount": 50000,
      "gamblingId":5
    },
    {
      "voucherName": "GB09384834834838438",
      "rapidEventId": 3,
      "userName": "Sout Chaw Gyi",
      "bettedDate": "2023-01-17 12:00 pm",
      "userId": "abkaknkynkkl",
      "amount": 50000,
      "gamblingId":6
    },
    {
      "voucherName": "GB09384834834838438",
      "rapidEventId": 3,
      "userName": "Sout Chaw Gyi",
      "bettedDate": "2023-01-17 12:00 pm",
      "userId": "abkaknkynkkl",
      "amount": 50000,
      "gamblingId":7
    },
    {
      "voucherName": "GB09384834834838438",
      "rapidEventId": 3,
      "userName": "Sout Chaw Gyi",
      "bettedDate": "2023-01-17 12:00 pm",
      "userId": "abkaknkynkkl",
      "amount": 50000,
      "gamblingId":8
    },
    {
      "voucherName": "GB09384834834838438",
      "rapidEventId": 3,
      "userName": "Sout Chaw Gyi",
      "bettedDate": "2023-01-17 12:00 pm",
      "userId": "abkaknkynkkl",
      "amount": 50000,
      "gamblingId":9
    },
    {
      "voucherName": "GB09384834834838438",
      "rapidEventId": 3,
      "userName": "Sout Chaw Gyi",
      "bettedDate": "2023-01-17 12:00 pm",
      "userId": "abkaknkynkkl",
      "amount": 50000,
      "gamblingId":10
    },
    {
      "voucherName": "GB09384834834838438",
      "rapidEventId": 3,
      "userName": "Sout Chaw Gyi",
      "bettedDate": "2023-01-17 12:00 pm",
      "userId": "abkaknkynkkl",
      "amount": 50000,
      "gamblingId":11
    },
    {
      "voucherName": "GB09384834834838438",
      "rapidEventId": 3,
      "userName": "Sout Chaw Gyi",
      "bettedDate": "2023-01-17 12:00 pm",
      "userId": "abkaknkynkkl",
      "amount": 50000,
      "gamblingId":12
    },
    {
      "voucherName": "GB09384834834838438",
      "rapidEventId": 3,
      "userName": "Sout Chaw Gyi",
      "bettedDate": "2023-01-17 12:00 pm",
      "userId": "abkaknkynkkl",
      "amount": 50000,
      "gamblingId":13
    },
    {
      "voucherName": "GB09384834834838438",
      "rapidEventId": 3,
      "userName": "Sout Chaw Gyi",
      "bettedDate": "2023-01-17 12:00 pm",
      "userId": "abkaknkynkkl",
      "amount": 50000,
      "gamblingId":14
    },
    {
      "voucherName": "GB09384834834838438",
      "rapidEventId": 3,
      "userName": "Sout Chaw Gyi",
      "bettedDate": "2023-01-17 12:00 pm",
      "userId": "abkaknkynkkl",
      "amount": 50000,
      "gamblingId":15
    },
  ]
  
  const BodyVoucherView = (props) => {
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
  
    const classes = useStyles();
    const { rapidEventId,type } = useParams();
  
    const [rowPerPage, setRowPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [gamId, setGamId] = useState(0);
    const [isExist, setIsExist] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [mixVoucherList, setMixVoucherList] = useState([]);
    const [searchVoucher, setSearchVoucher] = useState([]);
    const isPhone = useMediaPredicate("(max-width: 800px)");
  
    useEffect(() => {
       getMixVoucher();
    }, []);
  
    const getMixVoucher = () => {
      props.setLoading(true);
      reportController.getSingleVoucherList(rapidEventId,type == "body" ? true : false, (data) => {
      setMixVoucherList(data.voucher);
      setSearchVoucher(data.voucher);
      props.setLoading(false);
      });
    };
  
    const requestSearch = (value) => {
      setSearchText(value);
      const voucherFilter = searchVoucher.filter((v) => {
        return (
          v.postingNo.toLowerCase().includes(value.toLowerCase()) ||
          v.userName.toLowerCase().includes(value.toLowerCase())
        );
      });
      setMixVoucherList(voucherFilter);
    };
  
    const cancelSearch = () => {
      setSearchText("");
      requestSearch("");
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const onClickDetail = (gamblingWinId) => {
      setGamId(gamblingWinId);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper className={classes.root}>
        <h2>Body Live Voucher List{type}</h2>
        <hr />
        <SearchBar
          placeholder={"Search"}
          value={searchText}
          style={{ marginBottom: 10, marginLeft: 15, width: isPhone ? 200 : 300 }}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        {isExist == true ? (
          <div>
            <MyEventModal gamblingWinId={gamId} setLoading={props.setLoading} />
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
                  {mixVoucherList.length > 0 &&
                    mixVoucherList
                      .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                      .map((v, k) => (
                        <TableRow key={k}>
                          <TableCell>
                            {page > 0 ? k + 1 + rowPerPage * page : k + 1}
                          </TableCell>
                          <TableCell align="left">
                            {v.postingNo} <br />{" "}
                            <small>
                              {v.bettedTime}
                            </small>
                          </TableCell>
                          <TableCell align="left">{v.userId}</TableCell>
                          <TableCell align="left">{v.userName}</TableCell>
                          <TableCell align="left">{v.amount}</TableCell>
                          <TableCell align="left">
                            <span style={{color:v.color}}>{v.bettedTeam}</span>
                            </TableCell>
                            <TableCell align="left">
                            <span>{v.odds}</span>
                            </TableCell>
                          {/* <TableCell>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                onClickDetail(129191);
                              }}
                              data-toggle="modal"
                              data-target="#exampleModalLong"
                              style={{
                                backgroundColor: MyColor.secondaryBackground,
                              }}
                            >
                              View Details
                            </button>
                          </TableCell> */}
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
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <h2>No Data Found!</h2>
          </div>
        )}
      </Paper>
    )
  };
  
  export default withTheme(BodyVoucherView);
  
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
      id: "amount",
      label: "Amount",
      align: "left",
      minWidth: 50,
    },
    {
      id: "betted",
      label: "Bet Team",
      align: "left",
      minWidth: 50,
    },
    {
      id:"odd",
      label:"Odds",
      align:"left",
      minWidth:50,
    },
    // {
    //   id: "action",
    //   label: "Action",
    //   align: "left",
    //   minWidth: 20,
    // },
  ];