// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { withTheme } from "../../common/hoc/withTheme";
// import MyColor from "../../../config/color";
// import { Divider } from "@material-ui/core";
// import { Button, Icon, ThemeProvider } from "@material-ui/core";
// import { userController } from "../../../controllers/userController/userController";
// import AppContext from "../../../context/AppContext";
// import SearchBar from "material-ui-search-bar";

// const List = (props) => {
//   const { userData } = useContext(AppContext);
//   const userInfo = JSON.parse(userData);
//   const [userList, setUserList] = useState([]);
//   {/* edited by kyn --add search button 23-4-2021*/ }
//   const [searchText, setSearchText] = useState("");
//   const [searchedName, setSearchedName] = useState([]);
//   {/*-------------*/ }

//   useEffect(() => {
//     userController.getAllUser(userInfo ? userInfo.userId : 0, (value) => {
//       setUserList(value.userLists);
//       setSearchedName(value.userLists);//---added by kyn
//     });
//   }, []);

//   {/* edited by kyn --add search button 23-4-2021*/ }
//   const requestSearch = (searchedVal) => {
//     setSearchText(searchedVal);
//     const filteredRows = userList.filter((row) => {
//       return row.name.toLowerCase().includes(searchedVal.toLowerCase());
//     });
//     setSearchedName(filteredRows);
//   };

//   const cancelSearch = () => {
//     setSearchText("");
//     requestSearch("");
//   };
//   {/*----------------*/ }

//   return (
//     <div
//       className="w-100 bg-white border rounded p-3 "
//       style={{ maxHeight: 400, overflowY: "auto" }}
//     >
//       {/* edited by kyn --add search button 23-4-2021*/}
//       <div className="d-flex justify-content-between">
//         <h4>Users List</h4>

//         <SearchBar
//           value={searchText}
//           onChange={(searchVal) => requestSearch(searchVal)}
//           onCancelSearch={() => cancelSearch()}
//         />
//       </div>
//       {/*----------*/}
//       <Divider />
//       <table className="table">
//         <thead className="bg-secondary">
//           <tr style={{ backgroundColor: MyColor.secondaryBackground }}>
//             <th scope="col">No</th>
//             <th scope="col">User Id</th>
//             <th scope="col">User Name</th>
//             <th scope="col">Role Name</th>
//             <th scope="col">Balance</th>
//             <th scope="col">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {searchedName.map((row, index) => {
//             return (
//               <tr>
//                 <th scope="row">{index + 1}</th>
//                 <td>{row.userName}</td>
//                 <td>{row.name}</td>
//                 <td>{row.roleName}</td>
//                 <td>{row.balance.toLocaleString("en-US")}</td>
//                 <td>
//                   <Link to={`/agentDetails?id=${row.userId}`} className="btn btn-primary">
//                     <span>Edit</span>
//                   </Link>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default withTheme(List);
