import React, { Fragment } from 'react'
import { withTheme } from '../../common/hoc/withTheme'
import { MyCollapsibleTable } from "../../common/components/MyCollapsibleTable";
import { MyDateRangeSearch } from "../../common/components/MyDateRange";

class ByDate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         
        };
    }
    render() {
      return (
        <div className=''>
          <h1>ByDate</h1>  
          <Fragment>
            <MyDateRangeSearch/>
            <MyCollapsibleTable
              columns={columns}
              rows={rows}
              maxWidth={""}
              btnText="Edit"
              // btnAction={(id) => handleOpen(id)}
            />
            </Fragment>
        </div>
      );
    }
  }
  export default withTheme(ByDate)

  const columns = [
    {
      id: "account",
      label: "Account",
      minWidth: 50,
      maxWidth: 50,
      align: "left",
    },
    {
      id: "currency",
      label: "Currency",
      minWidth: 100,
      maxWidth: 150,
      align: "left",
    },
    {
      id: "contact",
      label: "Contact",
      minWidth: 50,
      maxWidth: 50,
      align: "left",
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 50,
      maxWidth: 50,
      align: "left",
    },
    {
      id: "valid amount",
      label: "Valid Amount",
      minWidth: 50,
      maxWidth: 50,
      align: "left",
    },
    {
      id: "members",
      label: "Members",
      minWidth: 50,
      maxWidth: 50,
      align: "center",
    },
    {
      id: "master profit",
      label: "Master Profit",
      minWidth: 50,
      maxWidth: 50,
      align: "center",
    },
    {
      id: "company",
      label: "Company",
      minWidth: 50,
      maxWidth: 50,
      align: "center",
    },
  ];
  
  const rows = [
    // {
    //   no: 1,
    //   date: "12.9.2020",
    //   transferIn: 19300,
    //   transferOut: 202830,
    //   commissionAmount: "10%",
    //   balance: 10000000,
    //   detail: "btn",
    // },
    // {
    //   no: 2,
    //   date: "12.9.2020",
    //   transferIn: 19300,
    //   transferOut: 202830,
    //   commissionAmount: "10%",
    //   balance: 10000000,
    //   detail: "btn",
    // },
    // {
    //   no: 3,
    //   date: "12.9.2020",
    //   transferIn: 19300,
    //   transferOut: 202830,
    //   commissionAmount: "10%",
    //   balance: 10000000,
    //   detail: "btn",
    // },
  ];