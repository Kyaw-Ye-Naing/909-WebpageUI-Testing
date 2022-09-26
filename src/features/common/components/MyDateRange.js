import React from "react";
import Mycolor from "../../../config/color";
import MyFont from "../../../config/fonts";

export const MyDateRangeSearch = (props) => {
  const {
    selectedDateForEnd,
    searchDataForTransaction,
    selectedDateForStart,
    setSelectedDateForEnd,
    setSelectedDateForStart,
  } = props;
  return (
    <div className="d-flex p-2 align-items-end">
      <div className="p-2">
        <div className="text-muted" style={{ fontSize: MyFont.small }}>
          Start Date:
        </div>
        <div className="" style={{ width: 200 }}>
          <input
            type="date"
            className="form-control"
            value={selectedDateForStart}
            onChange={(v) => setSelectedDateForStart(v.target.value)}
          />
        </div>
      </div>
      <div className="p-2">
        <div className="text-muted" style={{ fontSize: MyFont.small }}>
          End Date:
        </div>
        <div className="" style={{ width: 200 }}>
          <input
            type="date"
            className="form-control"
            value={selectedDateForEnd}
            onChange={(v) => setSelectedDateForEnd(v.target.value)}
          />
        </div>
      </div>
      <div className="p-2">
        <button
          type="button"
          className="btn btn-secondary"
          style={{
            backgroundColor: Mycolor.secondaryBackground,
            color: "#fff",
            minWidth: 100,
            maxHeight: 40,
          }}
          onClick={searchDataForTransaction}
        >
          <i className="fas fa-search px-2"></i>Search
        </button>
      </div>
    </div>
  );
};
