import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { userController } from "../../../controllers/userController";
import { withTheme } from "../../common/hoc/withTheme";
import AppContext from "../../../context/AppContext";
import Create from "./Create";
import List from "./List";

const Agent = (props) => {
  const [showLoading, setShowLoading] = useState(false);

  const loc = props.location.pathname.includes("create") ? true : false;

  return (
    <div className="w-100 py-3 pr-2">
      {loc ? (
        <div className="rounded px-2" style={{ background: "" }}>
          {showLoading ? (
            <h3 className="text-center"> Loading...</h3>
          ) : (
            <Create />
          )}
        </div>
      ) : (
        <List />
      )}
    </div>
  );
};

export default withTheme(Agent);
