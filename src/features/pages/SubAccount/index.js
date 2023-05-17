import React, { useEffect, useState, useContext } from 'react';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    makeStyles,
    Paper,
    TextField,
    Tooltip
} from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import { toast } from "react-toastify";
import { withTheme } from '../../common/hoc/withTheme';
import AppContext from '../../../context/AppContext';
import MyColor from "../../../config/color";
import SearchBar from "material-ui-search-bar";
import { userController } from '../../../controllers/userController';
import { error } from 'jquery';

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
        padding: 2,
        marginBottom: 10
    },
    tableHeader: {
        backgroundColor: MyColor.secondaryBackground,
        color: "#fff",
    }
}));


const SubAccount = (props) => {
    const [searchText, setSearchText] = useState("");
    const { userData } = useContext(AppContext);
    const userInfo = JSON.parse(userData);
    const [userList,setUserList] = useState([]);
    const [searchUserList, setSearchUserList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const classes = useStyles();
    const [userError, setUserError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [type, setType] = useState("");
    const [account, setAccount] = useState([]);
    const [showModal, setshowModal] = useState(false);

    useEffect(() => {
        getUserInfo();
    }, [userData]);

    const getUserInfo = () => {
        props.setLoading(true);
        userInfo &&
            userController.getSubUser(userInfo && userInfo.userId, (data) => {
                setSearchUserList(data.userdata);
                setUserList(data.userdata);
                props.setLoading(false);
            });
    }

    const handleOnClick = (account, type) => {
        console.log("final data >>>>>", account, type);
        // props.setLoading(true);
        if (account.username == "") {
            console.log("i am in")
            setUserError(true);
        }
        else if (account.name == '') {
            setNameError(true);
        }
        else if (account.mobile == '') {
            setMobileError(true);
        }
        else if (account.password == '') {
            setPassError(true);
        }
        else {
            if (type == "Create") {
                userController.SaveSubUser(account, userInfo && userInfo.userId, (data) => {
                    //setSearchUserList(data.userdata);
                    if (data.status == 1) {
                        toast.success(data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    }
                    if (data.status == 0) {
                        toast.error(data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    }
                    getUserInfo();
                    props.setLoading(false);
                    //props.setLoading(false);
                });
            }
            if (type == "Edit" || type == "password") {
                userController.UpdateSubUser(account, (data) => {
                    if (data.status == 1) {
                        toast.success(data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    }
                    getUserInfo();
                    props.setLoading(false);
                });
            }
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const cancelSearch = () => {
        setSearchText("");
        requestSearch("");
    };

    const handleEditChange = (userInfodata, type) => {
        setType(type)

        if (type == "Create") {
            const obj = {
                "id": 0,
                "userId": 0,
                "username": "",
                "name": "",
                "mobile": "",
                "password": "",
                "lock": ""
            }
            setAccount(obj);
        }

        if (type == "Edit" || type == "lock" || type == "password") {
            const obj = {
                "userId": userInfodata.userId,
                "username": userInfodata.username.replace(userInfo && userInfo.username, ''),
                "name": userInfodata.name,
                "mobile": userInfodata.mobile,
                "id": userInfodata.id,
                "password": type == "password" ? "" : userInfodata.password,
                "lock": type == "lock" ? !userInfodata.lock : userInfodata.lock
            }
            setAccount(obj);

            if (type == "lock") {
                props.setLoading(true);
                userController.UpdateSubUser(obj, (data) => {
                    if (data.status == 1) {
                        toast.success(data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    }
                    getUserInfo();
                    props.setLoading(false);
                });
            }
        }
    }

    const handleOnClose = () => {
        const obj = {
            "id": 0,
            "userId": 0,
            "username": "",
            "name": "",
            "mobile": "",
            "password": "",
            "lock": ""
        }
        setAccount(obj);
    }

    const requestSearch = (searchedVal) => {
        console.log("request text",searchedVal)
        setSearchText(searchedVal);
        const filteredRows = userList.filter((row) => {
          return (
            row.username.toLowerCase().includes(searchedVal.toLowerCase())
          );
        });
        console.log("request value",filteredRows)
        setSearchUserList(filteredRows);
      };
    
    return (
        <>
            <AccountModal
                account={account}
                setAccount={setAccount}
                handleOnClick={handleOnClick}
                type={type}
                userError={userError}
                setUserError={setUserError}
                setNameError={setNameError}
                setMobileError={setMobileError}
                setPassError={setPassError}
                nameError={nameError}
                mobileError={mobileError}
                passError={passError}
                handleOnClose={handleOnClose}
                username={userInfo && userInfo.username}
            />
            <div className="container" style={{ marginTop: 10 }}>
                <h1>Sub Masters</h1>
                <Paper>
                    <div className="d-flex p-2 justify-content-between align-items-center">
                        <SearchBar
                            placeholder={"Search "}
                            value={searchText}
                            onChange={(searchVal) => requestSearch(searchVal)}
                            onCancelSearch={() => cancelSearch()}
                        />
                        <button
                            className="btn btn-primary"
                            data-toggle="modal"
                            data-target="#accountModal"
                            onClick={() => handleEditChange(null, "Create")}
                        >
                            Create &nbsp;
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHeader}>No</TableCell>
                                    <TableCell className={classes.tableHeader}>
                                        User Id
                                    </TableCell>
                                    <TableCell className={classes.tableHeader}>User Name</TableCell>                                 
                                    <TableCell className={classes.tableHeader}>
                                        Mobile
                                    </TableCell>
                                    <TableCell className={classes.tableHeader}>Password</TableCell>
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
                                                <TableRow key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{row.username}</TableCell>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell>{row.mobile}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title="Change Password" arrow>
                                                            <a onClick={() => handleEditChange(row, "password")}
                                                                data-toggle="modal"
                                                                data-target="#accountModal">
                                                                <i className="fas fa-tools" style={{ fontSize: '1.5rem', marginLeft: 10 }}></i>
                                                            </a>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell>
                                                        <button
                                                            className="btn btn-primary"
                                                            data-toggle="modal"
                                                            data-target="#accountModal"
                                                            onClick={() => handleEditChange(row, "Edit")}
                                                        >Edit&nbsp;
                                                            <i className="far fa-edit" style={{ fontSize: "1rem" }}></i>
                                                        </button>
                                                        &nbsp;
                                                        <button
                                                            className={`${row.lock ? "btn btn-success" : "btn btn-danger"}`}
                                                            onClick={() => handleEditChange(row, "lock")}
                                                        >{row.lock ? "Unlock" : "Lock"}&nbsp;
                                                            <i className={`${row.lock ? "fas fa-lock-open" : "fas fa-lock"}`} style={{ fontSize: "1rem" }}></i>
                                                        </button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20, 50, 100]}
                        component="div"
                        count={searchUserList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </>
    )
}

export default withTheme(SubAccount);

const data = [
    {
        id: 1,
        name: "Bo BO",
        userId: "bbgg",
        mobile: "09867565",
        password: "sfsfsf",
    },
    {
        id: 2,
        name: "Bo BO 33",
        userId: "bbcc",
        mobile: "09645454",
        password: "r3rere",
    },
    {
        id: 3,
        name: "Bo BO 44",
        userId: "bbff",
        mobile: "092323232",
        password: "jyjhthgrgf",
    }
]

export function AccountModal({
    account,
    handleOnClick,
    type,
    handleOnClose,
    setAccount,
    username,
    userError,
    nameError,
    mobileError,
    passError,
    setUserError,
    setNameError,
    setMobileError,
    setPassError
}) {
    const classes = useStyles();

    const handleOnChange = (data, type) => {
        if (type == "username") setUserError(false);
        if (type == "name") setNameError(false);
        if (type == "mobile") setMobileError(false);
        if (type == "password") setPassError(false);

        let newObj = { ...account };
        newObj[type] = data;
        setAccount(newObj);
    }

    return (
        <div className="modal fade" id="accountModal" data-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{type == "password" ? "Password Change" : `${type} Sub Master`}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div>
                            {
                                type == "Edit" || type == "Create" ?
                                    <>
                                        <TextField
                                            label="User Id"
                                            className={classes.textField}
                                            value={account.username}
                                            id="filled-start-adornment"
                                            error={userError}
                                            helperText={userError ? "Please input user id !" : null}
                                            onChange={(e) => handleOnChange(e.target.value, "username")}
                                            fullWidth
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><span style={{ color: "black" }}>{username}</span></InputAdornment>,
                                            }}
                                            variant="outlined"
                                        />
                                        {/* <TextField
                                            fullWidth
                                            className={classes.textField}
                                            value={account.username}
                                            onChange={(e) => handleOnChange(e.target.value, "username")}
                                            id="outlined-basic"
                                            label="User Id"
                                            variant="outlined"
                                        /> */}

                                        <TextField
                                            fullWidth
                                            className={classes.textField}
                                            value={account.name}
                                            error={nameError}
                                            helperText={nameError ? "Please input username !" : null}
                                            onChange={(e) => handleOnChange(e.target.value, "name")}
                                            id="outlined-basic"
                                            label="User Name"
                                            variant="outlined"
                                        />
                                        <TextField
                                            fullWidth
                                            className={classes.textField}
                                            value={account.mobile}
                                            error={mobileError}
                                            helperText={mobileError ? "Please input mobile !" : null}
                                            onChange={(e) => handleOnChange(e.target.value, "mobile")}
                                            id="outlined-basic1"
                                            label="Mobile"
                                            variant="outlined"
                                        />
                                    </>
                                    : null
                            }
                            {
                                type == "password" || type == "Create" ?
                                    <TextField
                                        fullWidth
                                        className={classes.textField}
                                        value={account.password}
                                        error={passError}
                                        helperText={passError ? "Please input password !" : null}
                                        onChange={(e) => handleOnChange(e.target.value, "password")}
                                        id="outlined-basic2"
                                        label="Password"
                                        variant="outlined"
                                    />
                                    : null
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => handleOnClose()}
                            data-dismiss="modal"
                        >
                            Close&nbsp;
                            <i className="fas fa-times"></i>
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleOnClick(account, type)}
                        >
                            Save&nbsp;
                            <i className="fas fa-save"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
