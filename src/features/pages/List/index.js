import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withTheme } from "../../common/hoc/withTheme";
import moment from "moment";
import { makeStyles, Paper, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import MyColor from "../../../config/color";
import { userController } from "../../../controllers/userController/userController";
import AppContext from "../../../context/AppContext";
import SearchBar from "material-ui-search-bar";

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

const List = (props) => {
  const { userData } = useContext(AppContext);
  const userInfo = JSON.parse(userData);
  const [userList, setUserList] = useState([]);
  const [searchUserList, setSearchUserList] = useState([]);
  {
    /* edited by kyn --add search button 23-4-2021*/
  }
  const [searchText, setSearchText] = useState("");
  const [searchedName, setSearchedName] = useState([]);
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  const [choseDate, setChoseDate] = useState(defaultDate);
  const [page, setPage] = useState(0); // Add by AKPM 27-4-2021
  const [rowsPerPage, setRowsPerPage] = useState(5); // Add by AKPM 27-4-2021
  const classes = useStyles();

  useEffect(() => {
    props.setLoading(true);
    userInfo &&
      userController.getAllUser(userInfo ? userInfo.userId : 0, (value) => {
        const userLists = value.userLists.map((v, k) => ({ ...v, key: k + 1 }));
        setUserList(userLists);
        setSearchUserList(userLists);
        props.setLoading(false);
      });
  }, [userData]);

  const handleChangePage = (event, newPage) => {
    // Add by AKPM 27-4-2021
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // Add by AKPM 27-4-2021
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const requestSearch = (searchedVal) => {
    setSearchText(searchedVal);
    const filteredRows = userList.filter((row) => {
      return (
        row.userName.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.name.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.roleName.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setSearchUserList(filteredRows);
  };

  const cancelSearch = () => {
    setSearchText("");
    requestSearch("");
  };

  return (
    // <div
    //   className="w-100 bg-white border rounded p-3"
    //   style={{ maxHeight: 400,  }}
    // >
    //   <h4>Users List</h4>
    //   <Divider />
    //   <table className="table table-striped">
    //     <thead className="bg-secondary">
    //       <tr style={{ backgroundColor: MyColor.secondaryBackground }}>
    //         <th scope="col">No</th>
    //         <th scope="col">Agent Name</th>
    //         <th scope="col">Role Name</th>
    //         <th scope="col">Balance</th>
    //         <th scope="col">Action</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {userList.map((row,index) => {
    //         return (
    //           <tr>
    //             <th scope="row">{index+1}</th>
    //             <td>{row.userName}</td>
    //            <td>{row.roleName}</td>
    //             <td>{row.balance.toLocaleString("en-US")}</td>
    //             <td>
    //               <Link to={`/agentDetails?id=${row.userId}`} className="btn btn-primary">
    //                 <span>Edit</span>
    //               </Link>
    //             </td>
    //           </tr>
    //         );
    //       })}
    //     </tbody>
    //   </table>
    // </div>
    <div className="container">
      <h1> Users List</h1>
      <Paper className={classes.root}>
        <div className="d-flex p-2 align-items-end">
          {/* <TextField
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
            >
              <i className="fas fa-search px-2"></i>Search
            </button>
          </div> */}
          <SearchBar
            placeholder={"Search "}
            value={searchText}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
        </div>
        {
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeader}>No</TableCell>
                  <TableCell className={classes.tableHeader}>User Id</TableCell>
                  <TableCell className={classes.tableHeader}>
                    User Name
                  </TableCell>
                  <TableCell className={classes.tableHeader}>
                    Role Name
                  </TableCell>
                  <TableCell className={classes.tableHeader}>Balance</TableCell>
                  <TableCell className={classes.tableHeader}>Action</TableCell>

                  {/*--------*/}
                </TableRow>
              </TableHead>

              <TableBody>
                {searchUserList.length > 0 &&
                  searchUserList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        // <Fragment key={edId}>
                        <TableRow key={index}>
                          <TableCell>{row.key}</TableCell>

                          <TableCell>{row.userName}</TableCell>

                          <TableCell>{row.name}</TableCell>
                          {/*modified by kyn 22-4-2-21 --add color--*/}

                          <TableCell>{row.roleName}</TableCell>
                          <TableCell>
                            {row.balance < 0 ? (
                              <span style={{ color: MyColor.minusColor }}>
                                {row.balance.toLocaleString("en-US")}
                              </span>
                            ) : (
                              row.balance.toLocaleString("en-US")
                            )}
                            {/* color changed by TNA (08/06/2021) */}
                          </TableCell>
                          <TableCell>
                            <Link
                              to={`/agentDetails?id=${row.userId}`}
                              className="btn btn-primary"
                            >
                              <span>Edit</span>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        }

        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          component="div"
          count={userList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
export default withTheme(List);
