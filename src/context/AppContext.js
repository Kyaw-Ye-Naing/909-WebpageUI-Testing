import React, { useState, createContext, useEffect } from "react";
import { tokenIncrease, userController } from "../controllers/userController";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { BrowserTabTracker } from "browser-session-tabs";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setuserData] = useState(null);
  const [collectionDataContext, setCollectionDataContext] = useState(null);
  const [adminRole, setAdminRole] = useState(1);
  const [seniorMasterRole, setSeniorMasterRole] = useState(2);
  const [masterRole, setMasterRole] = useState(3);
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(defaultDate);
  const [endDate, setEndDate] = useState(defaultDate);
  const [state1, setState1] = useState(null);
  let isDrawing = false;
  const history = useHistory();
  const userInformation = JSON.parse(userData);

  // BrowserTabTracker.initialize({
  //   storageKey: "my-custom-storage-key",
  //   sessionIdGenerator: () => {
  //     return new Date().getTime();
  //   },
  //   sessionStartedCallback: (sessionId, tabId) => {
  //     console.log("New session", sessionId, tabId);
  //   },
  // });
  // const sessionId = BrowserTabTracker.sessionId;
  // const currentId = BrowserTabTracker.tabId;

  window.addEventListener("storage", function (e) {
    // Some storage value changed. Reload tab!
    window.location.reload();
  });

  const updateUserData = () => {
    let storageData = JSON.parse(localStorage.getItem("aaaLoginData"));
    let contextData =
      userData == null
        ? storageData
          ? storageData.userDetails
          : null
        : JSON.parse(userData);
    if (contextData) {
      userController.getUserInfoAndCommission(
        contextData.userId,
        (data) => {
          const tempStorageData = { ...storageData };
          //update storage data
          tempStorageData.userDetails.memberCount = data[0].memberCount;
          tempStorageData.userDetails.sharePercent = data[0].sharePercent;
          tempStorageData.userDetails.lock = data[0].lock;
          tempStorageData.userDetails.betLimitForMix = data[0].betLimitForMix;
          tempStorageData.userDetails.betLimitForSingle =
            data[0].betLimitForSingle;
          tempStorageData.userDetails.inward = data[0].inward;
          tempStorageData.userDetails.outward = data[0].outward;
          tempStorageData.userDetails.balance = data[0].balance;
          tempStorageData.userDetails.credit = data[0].credit;
          localStorage.setItem("aaaLoginData", JSON.stringify(tempStorageData));
          //update context user data
          contextData.memberCount = data[0].memberCount;
          contextData.sharePercent = data[0].sharePercent;
          contextData.lock = data[0].lock;
          contextData.betLimitForMix = data[0].betLimitForMix;
          contextData.betLimitForSingle = data[0].betLimitForSingle;
          contextData.inward = data[0].inward;
          contextData.outward = data[0].outward;
          contextData.balance = data[0].balance;
          contextData.credit = data[0].credit;
          setuserData(JSON.stringify(contextData));
        },
        (data) => {}
      );
    }
  };

  useEffect(() => {
    let storageData = JSON.parse(localStorage.getItem("aaaLoginData"));
    if (storageData == null && userData == null) {
      if (window.location.pathname != "/") {
        window.location.pathname = "/";
      }
      console.log("all user info null>", window.location.pathname);

      return;
    } else {
      updateUserData();
      setuserData(storageData ? JSON.stringify(storageData.userDetails) : null);
      setCollectionDataContext(
        storageData ? JSON.stringify(storageData.userDetails) : null
      );
    }
  }, [userData]);

  return (
    <AppContext.Provider
      value={{
        // state,
        userData,
        setuserData,
        updateUserData,
        collectionDataContext,
        setCollectionDataContext,
        adminRole,
        setAdminRole,
        seniorMasterRole,
        setSeniorMasterRole,
        masterRole,
        setMasterRole,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        state1,
        setState1,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
