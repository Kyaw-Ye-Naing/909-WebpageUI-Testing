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
  Checkbox,
} from "@material-ui/core";
import { toast } from "react-toastify";
import {FormGroup,FormControlLabel} from "@material-ui/core";
import { useMediaPredicate } from "react-media-hook";
import { reportController } from "../../../../controllers/reportController";
import MyColor from "../../../../config/color";
import SearchBar from "material-ui-search-bar";
import VoucherViewModal from "./VoucherViewModal";
import React, { useEffect, useState } from 'react'
import { useParams, withRouter } from "react-router-dom";
import { withTheme } from "../../../common/hoc/withTheme";
import { Button } from "../../agent/Create";
const data = [
  {
    "voucherName": "GB09384834834838438",
    "gamblingTypeId": 3,
    "userName": "Sout Chaw Gyi",
    "bettedDate": "2023-01-17 12:00 pm",
    "userId": "abkaknkynkkl",
    "amount": 50000
  },
  {
    "voucherName": "GB09384834834838438",
    "gamblingTypeId": 3,
    "userName": "Sout Chaw Gyi",
    "bettedDate": "2023-01-17 12:00 pm",
    "userId": "abkaknkynkkl",
    "amount": 50000
  },
  {
    "voucherName": "GB09384834834838438",
    "gamblingTypeId": 3,
    "userName": "Sout Chaw Gyi",
    "bettedDate": "2023-01-17 12:00 pm",
    "userId": "abkaknkynkkl",
    "amount": 50000
  },
  {
    "voucherName": "GB09384834834838438",
    "gamblingTypeId": 3,
    "userName": "Sout Chaw Gyi",
    "bettedDate": "2023-01-17 12:00 pm",
    "userId": "abkaknkynkkl",
    "amount": 50000
  },
  {
    "voucherName": "GB09384834834838438",
    "gamblingTypeId": 3,
    "userName": "Sout Chaw Gyi",
    "bettedDate": "2023-01-17 12:00 pm",
    "userId": "abkaknkynkkl",
    "amount": 50000
  },
  {
    "voucherName": "GB09384834834838438",
    "gamblingTypeId": 3,
    "userName": "Sout Chaw Gyi",
    "bettedDate": "2023-01-17 12:00 pm",
    "userId": "abkaknkynkkl",
    "amount": 50000
  },
  {
    "voucherName": "GB09384834834838438",
    "gamblingTypeId": 3,
    "userName": "Sout Chaw Gyi",
    "bettedDate": "2023-01-17 12:00 pm",
    "userId": "abkaknkynkkl",
    "amount": 50000
  },
  {
    "voucherName": "GB09384834834838438",
    "gamblingTypeId": 3,
    "userName": "Sout Chaw Gyi",
    "bettedDate": "2023-01-17 12:00 pm",
    "userId": "abkaknkynkkl",
    "amount": 50000
  },
  {
    "voucherName": "GB09384834834838438",
    "gamblingTypeId": 3,
    "userName": "Sout Chaw Gyi",
    "bettedDate": "2023-01-17 12:00 pm",
    "userId": "abkaknkynkkl",
    "amount": 50000
  },
  {
    "voucherName": "GB09384834834838438",
    "gamblingTypeId": 3,
    "userName": "Sout Chaw Gyi",
    "bettedDate": "2023-01-17 12:00 pm",
    "userId": "abkaknkynkkl",
    "amount": 50000
  },
  {
    "voucherName": "GB09384834834838438",
    "gamblingTypeId": 3,
    "userName": "Sout Chaw Gyi",
    "bettedDate": "2023-01-17 12:00 pm",
    "userId": "abkaknkynkkl",
    "amount": 50000
  },
  {
    "voucherName": "GB09384834834838438",
    "gamblingTypeId": 3,
    "userName": "Sout Chaw Gyi",
    "bettedDate": "2023-01-17 12:00 pm",
    "userId": "abkaknkynkkl",
    "amount": 50000
  },
  {
    "voucherName": "GB09384834834838438",
    "gamblingTypeId": 3,
    "userName": "Sout Chaw Gyi",
    "bettedDate": "2023-01-17 12:00 pm",
    "userId": "abkaknkynkkl",
    "amount": 50000
  },
  {
    "voucherName": "GB09384834834838438",
    "gamblingTypeId": 3,
    "userName": "Sout Chaw Gyi",
    "bettedDate": "2023-01-17 12:00 pm",
    "userId": "abkaknkynkkl",
    "amount": 50000
  },
  {
    "voucherName": "GB09384834834838438",
    "gamblingTypeId": 3,
    "userName": "Sout Chaw Gyi",
    "bettedDate": "2023-01-17 12:00 pm",
    "userId": "abkaknkynkkl",
    "amount": 50000
  },
]

const MixVoucherView = withRouter((props) => {
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
  const { selectedDate,mixtype } = useParams();

  const [rowPerPage, setRowPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [gamId, setGamId] = useState(0);
  const [isExist, setIsExist] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [mixVoucherList, setMixVoucherList] = useState([]);
  const [searchVoucher, setSearchVoucher] = useState([]);
  const isPhone = useMediaPredicate("(max-width: 800px)");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getMixVoucher();
  }, []);

  const getMixVoucher = () => {
    props.setLoading(true);
    reportController.getMixVoucherList(mixtype,selectedDate,(data) => {
    setMixVoucherList(data.voucherData);
    setSearchVoucher(data.voucherData);
    props.setLoading(false);
    });
  };

  const requestSearch = (value) => {
    setSearchText(value);
    const voucherFilter = searchVoucher.filter((v) => {
      return (
        v.postingNo.toLowerCase().includes(value.toLowerCase()) ||
        v.userName.toLowerCase().includes(value.toLowerCase())  ||
        v.groupName.toLowerCase().includes(value.toLowerCase())
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

  const onClickDetail = (gamblingId) => {
    //console.log("gamblingId from parent",gamblingId)
    setGamId(gamblingId);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(+event.target.value);
    setPage(0);
  };


  const handleChange = (event) => {
    setChecked(event.target.checked);
    //console.log("check",checked)
    if(checked == false){
      const sameMixgroupArr = mixVoucherList.filter(v => v.groupName != "-");
      const orderbyResult = sameMixgroupArr.sort((a, b) => b.groupName - a.groupName);
      setMixVoucherList([...orderbyResult])
    }
    else{
      setMixVoucherList([...searchVoucher])
    }
  };
      

  return (
    <Paper className={classes.root}>
      <h2>({mixtype}) Mix Voucher List</h2>
      <hr />
      <div style={{display:"flex",gap:"15px",alignItems:"center"}}>
      <SearchBar
        placeholder={"Search"}
        value={searchText}
        style={{ marginBottom: 10, marginLeft: 15, width: isPhone ? 200 : 300 }}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
       <FormGroup row>
       <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Same Vouchers"
      />
       </FormGroup>
      </div>
      {isExist == true ? (
        <div>
          <VoucherViewModal gamblingId={gamId} setLoading={props.setLoading}/>
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
                        <TableCell>
                          <span style={{backgroundColor:v.colorName,color:"#fff",borderRadius : 6,padding:5,fontSize:"12px"}}>
                          {v.groupName}
                          </span>
                        </TableCell>
                        <TableCell>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              onClickDetail(v.gamblingId);
                            }}
                            data-toggle="modal"
                            data-target="#voucherviewmodal"
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
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <h2>No Data Found!</h2>
        </div>
      )}
    </Paper>
  )
});

export default withTheme(MixVoucherView);

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
    id: "type",
    label: "Type",
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