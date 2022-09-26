import React from "react";
import { Link } from "react-router-dom";
import MyColor from "../../../config/color";

const DataTable = (props) => {
  // const {} = props;
  return (
    <div className="px-2" style={{ maxHeight: 400, overflowY: "auto" }}>
      <table className="table">
        <thead
          className="bg-secondary" 
        >
          <tr style={{ backgroundColor: MyColor.secondaryBackground}}>
            <th scope="col">No</th>
            <th scope="col">Date</th>
            <th scope="col">Transfer In</th>
            <th scope="col">Transfer Out</th>
            <th scope="col">Commission Amount</th>
            <th scope="col">Balance</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>12.9.2020</td>
            <td>19300</td>
            <td>202830</td>
            <td>10%</td>
            <td>10000000</td>
            <td>
            <Link to={`/transactions?id=3`} className="btn btn-primary" >
                  <span>Details</span>
                </Link>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>12.9.2020</td>
            <td>19300</td>
            <td>202830</td>
            <td>10%</td>
            <td>10000000</td>
            <td>
            <Link to={`/transactions?id=2`} className="btn btn-primary" >
                  <span>Details</span>
                </Link>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>12.9.2020</td>
            <td>19300</td>
            <td>202830</td>
            <td>10%</td>
            <td>10000000</td>
            <td>
                <Link to={`/transactions?id=1`} className="btn btn-primary" >
                  <span>Details</span>
                </Link>
              {/* <button className='btn btn-success'>Details</button> */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default DataTable;
