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
import React, { useEffect, useState } from "react";
import MyColor from "../../../../config/color";
import { useParams, withRouter } from "react-router-dom";
import { reportController } from "../../../../controllers/reportController";
import {userController} from "../../../../controllers/userController"
import moment from "moment";
import { MyEventModal } from "../../../common/components/MyEventModal";
import SearchBar from "material-ui-search-bar";
import { useMediaPredicate } from "react-media-hook";
import { withTheme } from "../../../common/hoc/withTheme";

const EventWithVoucher = withRouter((props) => {
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
  const [rowPerPage, setRowPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [eventWithVoucher, setEventWithVoucher] = useState([]);
  const [searchVoucher, setSearchVoucher] = useState([]);
  const [isExist, setIsExist] = useState(null);
  const { rapidEventId } = useParams();
  const [gamId, setGamId] = useState(0);
  const [searchText, setSearchText] = useState("");
  const isPhone = useMediaPredicate("(max-width: 800px)");
  const [tempRejectData,setTempRejectData]=useState({
    "gamblingId":0,
    "status":""
  });

  const [newLoading, setnewLoading] = useState(false);

  useEffect(() => {
    getEventWithVoucher();
  }, []);

  const getEventWithVoucher = () => {
    setnewLoading(true);
    reportController.getEventWithVoucher(rapidEventId, (data) => {
      setEventWithVoucher(data.voucherData);
      setSearchVoucher(data.voucherData);
      setIsExist(data.isExist);
      setnewLoading(false);
    });
  };

  const onClickDetail = (gamblingWinId) => {
    setGamId(gamblingWinId);
  };

const onRejectHandle = (tempRejectData) => {
  console.log("dfsf",tempRejectData)
  props.setLoading(true);
  let tempStatus = "";
  if(tempRejectData.status == true){
    tempStatus = "active";
  }else{
    tempStatus = "finished";
  }
  //console.log("dfsf",tempStatus)
  userController.removeVoucherNo(tempRejectData.gamblingId,tempStatus,(data) => {
    toast.success(data.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    props.setLoading(false);
  });
}

  const requestSearch = (value) => {
    setSearchText(value);
    const voucherFilter = searchVoucher.filter((v) => {
      return (
        v.voucherNo.toLowerCase().includes(value.toLowerCase()) ||
        v.gamblingType.toLowerCase().includes(value.toLowerCase())
      );
    });
    setEventWithVoucher(voucherFilter);
  };

  const cancelSearch = () => {
    setSearchText("");
    requestSearch("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
       <ConfirmBoxModal
        tempRejectData={tempRejectData}
        setTempRejectData={setTempRejectData}
        onRejectHandle={onRejectHandle}
      />
      <h2>Event With Voucher</h2>
      <hr />
      <SearchBar
        placeholder={"Search"}
        value={searchText}
        style={{ marginBottom: 10, marginLeft: 15, width: isPhone ? 200 : 300 }}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
      { newLoading ? 
        <div className="d-flex justify-content-center">
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={'/dist/loading.gif'} />
            <span style={{ marginTop: "-50px", fontSize: "1rem", fontWeight: "bold" }}>Loading ... </span>
          </div>
        </div> :
      ( isExist ? (
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
                {eventWithVoucher.length > 0 &&
                  eventWithVoucher
                    .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                    .map((v, k) => (
                      <TableRow key={k}>
                        <TableCell>
                          {page > 0 ? k + 1 + rowPerPage * page : k + 1}
                        </TableCell>
                        <TableCell align="left">
                          {v.voucherNo} <br />{" "}
                          <small>
                            {moment(v.bettingTime).format(
                              "YYYY-MM-DD hh:mm:ss A"
                            )}
                          </small>
                        </TableCell>
                        <TableCell align="left">{v.userName}</TableCell>
                        <TableCell align="left">{v.name}</TableCell>
                        <TableCell align="left">{v.amount}</TableCell>
                        <TableCell>{v.gamblingType}</TableCell>
                        <TableCell>
                          {v.active == 1 ? (
                            <span
                              class="badge badge-warning"
                              style={{ padding: 8, fontWeight: "bolder" }}
                            >
                              Pending
                            </span>
                          ) : (
                            <span
                              class="badge badge-success"
                              style={{ padding: 8, fontWeight: "bolder" }}
                            >
                              Finished
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                        {v.active == 1 ? (
                            null
                          ) : (
                            <button
                            className="btn"
                            onClick={() => {
                              onClickDetail(v.gamblingWinId);
                            }}
                            style={{
                              backgroundColor: MyColor.secondaryBackground,
                            }}
                            data-toggle="modal"
                            data-target="#exampleModalLong"
                          >
                            View                            
                          </button>
                          )}
                          

                          <button
                            className="btn"
                            data-toggle="modal"
                            data-target="#confirmModal"
                            onClick={() => {
                              setTempRejectData({gamblingId:v.gamblingId,status:v.active});
                            }}
                            style={{
                              backgroundColor: MyColor.secondaryBackground,
                              marginLeft:5
                            }}
                          >
                            Reject  
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
            count={eventWithVoucher.length}
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
      ))
}
    </Paper>
  );
});

export default withTheme(EventWithVoucher);

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
    id: "status",
    label: "Status",
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

export function ConfirmBoxModal({
  tempRejectData,
  setTempRejectData,
  onRejectHandle,
}) {
  return (
    <div className="row">
      <div
        className="modal fade"
        id="confirmModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <br />
              <span style={{color:"black",fontWeight:"bold",fontSize:"15px"}}>
                <i className="fas fa-ban mr-1" style={{color:"red"}}></i>
                Are you sure you want to reject this event?</span> <br />
              <span style={{color:"grey",fontSize:"12px",marginLeft:"15px"}}>
                This change will reflect in your modal after an minute.
              </span>
              <div className="d-flex justify-content-end mt-1">
                <button
                  type="button"
                  style={{marginRight:2}}
                  onClick={() =>
                    setTempRejectData({ gamblingId: 0, status: "" })
                  }
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  className="btn btn-danger"
                  onClick={() => onRejectHandle(tempRejectData)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
