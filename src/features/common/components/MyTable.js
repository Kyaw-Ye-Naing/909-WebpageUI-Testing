import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import MyColor from "../../../config/color";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import AppContext from "../../../context/AppContext";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: 5,
    marginRight: 5,
    // maxWidth: maxWidth,
  },
  container: {
    maxHeight: 430,
  },
});

export const MyTable = (props) => {
  const { columns, rows, maxWidth, btnText, btnAction, showLoading, link } =
    props;
  const classes = useStyles(maxWidth);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { state1, setState1 } = React.useContext(AppContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const minusColor = {
    color: MyColor.minusColor,
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{
                    maxWidth: column.maxWidth,
                    minWidth: column.minWidth,
                    backgroundColor: MyColor.secondaryBackground,
                    color: "#fff",
                  }}
                >
                  {column.label === "5%Com" ? state1 : column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              <Fragment>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column, index) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={index}
                              align={column.align}
                              padding="default"
                            >
                              {column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : value === "view" || value === "btn" ? (
                                <div
                                  className="btn btn-primary"
                                  onClick={() => btnAction(row.id)}
                                >
                                  {btnText}
                                </div>
                              ) : value === "check" ? (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={row.isSingle}
                                      onChange={() => {
                                        btnAction(row.id, "single");
                                      }}
                                      name="checkedTeam"
                                      color="primary"
                                    />
                                  }
                                />
                              ) : value === "check1" ? (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={row.isMix}
                                      onChange={() => btnAction(row.id, "mix")}
                                      name="checkedTeam"
                                      color="primary"
                                    />
                                  }
                                />
                              ) : value === "check2" ? (
                                row.isSingle == true ? (
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={row.isFivePercent}
                                        onChange={() =>
                                          btnAction(row.id, "FivePercent")
                                        }
                                        name="checkedTeam"
                                        color="primary"
                                      />
                                    }
                                  />
                                ) : null
                              ) : value === "link" ? (
                                <Link
                                  to={link + `?id=${row.id}`}
                                  onClick={() => btnAction(row.id)}
                                  className="btn btn-primary"
                                >
                                  <span>Edit</span>
                                </Link>
                              ) : value < 0 ? (
                                <span style={minusColor}>{value}</span>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </Fragment>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
