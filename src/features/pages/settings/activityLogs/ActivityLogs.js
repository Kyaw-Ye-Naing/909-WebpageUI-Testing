import React, {useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import MyColor from "../../../../config/color";
import { TextField } from "@material-ui/core";
import { userController } from "../../../../controllers/userController";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { withTheme } from '../../../common/hoc/withTheme';
import { useMediaPredicate } from 'react-media-hook';

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

const columns = [
    { id: "", label: "No", minWidth: 50, maxWidth: 50, align: "left" },
    {
        id: "createdDate",
        label: "Created Date",
        minWidth: 60,
        maxWidth: 80,
        align: "left",
    },
    {
        id: "pageName",
        label: "Page Name",
        minWidth: 60,
        maxWidth: 80,
        align: "left",
    },
    {
      id: "username",
      label: "User Name",
      minWidth: 50,
      maxWidth: 50,
      align: "left",
    },
    
    {
        id: "action",
        label: "Action",
        minWidth: 50,
        maxWidth: 50,
        align: "left",
    },
    {
      id: "newData",
      label: "New Data",
      minWidth: 50,
      maxWidth: 70,
      align: "left",
    },
    {
      id: "oldData",
      label: "Old Data",
      minWidth: 50,
      maxWidth: 100,
      align: "left",
    },
    {
      id: "remark",
      label: "Remark",
      minWidth: 50,
      maxWidth: 70,
      align: "left",
    },
    
]

export const ActivityLogs = withTheme(props => {
    const defaultDate = moment(new Date()).format("YYYY-MM-DD");
    const classes = useStyles();
    const [startDate, setStartDate] = useState(defaultDate);
    const [endDate, setEndDate] = useState(defaultDate);
    const [activityList, setActivityList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const isPhone = useMediaPredicate("(max-width: 800px)");

    useEffect(() => {
        props.setLoading(true);
        getActivityLogData();
    },[]);

    const getActivityLogData = () => {
        userController.getActivityLog(startDate, endDate, (data) => {
            setActivityList(data);
            props.setLoading(false);
        })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
       setRowsPerPage(+event.target.value);
       setPage(0);
    };

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
    //     );
    // } else {
        return(
            <div className="container">
                <h1>Activity Logs</h1>
                <Paper className={classes.root}>
                <div className="d-flex p-2 align-items-end">
                    <TextField
                        id="date"
                        label="Start Date :"
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
                        label="End Date :"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
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
                                fontSize: isPhone ? 12 : null,
                            }}
                            onClick={() => getActivityLogData()}
                        >
                        <i className="fas fa-search px-2"></i>Search
                        </button>
                    </div>
                </div>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                          <TableRow>
                          {columns.map((column, k) => (
                              <TableCell
                              key={k}
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
                          {activityList && activityList
                              .slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage)
                              .map((v, k) => {
                                  return (
                                      <TableRow hover role="checkbox" tabIndex={-1} key={k}>
                                          <TableCell key={k} align={"left"} padding="default">{page>0? (k+1)+(rowsPerPage*page) : k+1}</TableCell>
                                          <TableCell key={k} align={"left"} padding="default">{moment(v.createdDate).format("DD-MM-YYYY")}</TableCell>
                                          <TableCell key={k} align={"left"} padding="default">{v.pageName}</TableCell>
                                          <TableCell key={k} align={"left"} padding="default">{v.username}</TableCell>
                                          <TableCell key={k} align={"left"} padding="default">{v.action}</TableCell>
                                          <TableCell key={k} align={"left"} padding="default">{v.newData}</TableCell>
                                          <TableCell key={k} align={"left"} padding="default">{v.oldData}</TableCell>
                                          <TableCell key={k} align={"left"} padding="default">{v.remark}</TableCell>
                                          
                                          
                                      </TableRow>
                                  )
                              })
                          }
                      </TableBody>
                  </Table>
              </TableContainer> 
              <TablePagination
                   rowsPerPageOptions={[5, 10, 25, 50, 100]}
                   component="div"
                   count={activityList.length}
                   rowsPerPage={rowsPerPage}
                   page={page}
                   onChangePage={handleChangePage}
                   onChangeRowsPerPage={handleChangeRowsPerPage}
              />
                </Paper>
            </div>
        );
    
    })
   