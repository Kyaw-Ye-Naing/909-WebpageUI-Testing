import { apiList } from "../_apiHelper/apiList";
import { getApi } from "../_apiHelper/getApi";
import { postApi } from "../_apiHelper/postApi";
import { putApi } from "../_apiHelper/putApi";

const getAllUser = (userId, setUserList) => {
  getApi(`${apiList.userListApi}${userId}`, (data) => {
    setUserList(data);
  });
};

const getUserInfoAndCommission = (userId, setUserInfo, setCommission) => {
  getApi(`${apiList.getUserInfoAndCommission}${userId}`, (data) => {
    if (data.message == "Ok") {
      setUserInfo(data.userInfo);
      setCommission(data.userCommission);
    }
  });
};

const editUserInfoAndCommission = (editedData, setResponse) => {
  postApi(`${apiList.editUserInfoAndCommission}`, editedData, (data) => {
    setResponse(data);
  });
};

const createUserInfoAndCommission = (userData, setResponse) => {
  postApi(`${apiList.createUserInfoAndCommission}`, userData, (data) => {
    setResponse(data);
  });
};

const getTransactionsForUser = (userId, startDate, endDate, setResponse) => {
  putApi(
    `${apiList.getTransactionsForUser}`,
    { userId: parseInt(userId), startDate: startDate, endDate: endDate },
    (data) => {
      setResponse(data);
    }
  );
};

const getTransactionsForDashboard = (
  userId,
  startDate,
  endDate,
  setResponse
) => {
  putApi(
    `${apiList.getTransactionsForDashboard}`,
    { userId: userId, startDate: startDate, endDate: endDate },
    (data) => {
      setResponse(data);
    }
  );
};

const getTransactionsDetails = (userId, date, setResponse) => {
  putApi(
    `${apiList.getTransactionsDetails}`,
    { userId: userId, startDate: date },
    (data) => {
      setResponse(data);
    }
  );
};

const changePassword = (userId, oldPassword, password, setResponse) => {
  postApi(
    `${apiList.changePassword}`,
    {
      userId: userId,
      CurrentPassword: oldPassword,
      NewPassword: password,
      ConfirmPassword: password,
    },
    (data) => {
      setResponse(data);
    }
  );
};

const changePasswordSub = (username, oldPassword, password, setResponse) => {
 // console.log("hey yo",username,oldPassword,password)
  postApi(
    `${apiList.changePasswordSub}`,
    {
      userName: username,
      CurrentPassword: oldPassword,
      NewPassword: password,
      ConfirmPassword: password,
    },
    (data) => {
      setResponse(data);
    }
  );
};

const resetPassword = (userId, password, setResponse) => {
  postApi(
    `${apiList.resetPassword}`,
    {
      userId: userId,
      NewPassword: password,
    },
    (data) => {
      setResponse(data);
    }
  );
};

const userBalanceAdd = (userId, amount, setResponse) => {
  putApi(`${apiList.userBalanceAdd}`, { userId, amount }, (data) => {
    setResponse(data);
  });
};

const userBalanceRemove = (userId, amount, setResponse) => {
  putApi(`${apiList.userBalanceRemove}`, { userId, amount }, (data) => {
    setResponse(data);
  });
};

const getUserCredit = (userId, setResponse) => {
  getApi(`${apiList.getUserCredit}${userId}`, (data) => {
    setResponse(data);
  });
};

const saveUserCredit = (creditList, setResponse) => {
  putApi(`${apiList.saveUserCredit}`, creditList, (data) => {
    setResponse(data);
  });
};

const userCreditAdd = (userId, amount, setResponse) => {
  postApi(`${apiList.userCreditAdd}`, { userId, amount }, (data) => {
    setResponse(data);
  });
};

const userLock = (userId, isLock, setResponse) => {
  postApi(`${apiList.userLock}`, { userId, isLock }, (data) => {
    setResponse(data);
  });
};

const getUserDataWithBalance = (userId, setResponse) => {
  getApi(`${apiList.getUserDataWithBalance}${userId}`, (data) => {
    setResponse(data);
  });
};

const getRegulationText = (setResponse) => {
  getApi(`${apiList.displayRegulation}`, (data) => {
    setResponse(data);
  });
};

const updateRegulationText = (textData, setResponse) => {
  putApi(`${apiList.displayRegulation}`, textData, (data) => {
    setResponse(data);
  });
};

const createUserWithBalance = (
  username,
  password,
  lock,
  roleId,
  mobile,
  sharePercent,
  betLimitForMix,
  betLimitForSingle,
  commission,
  setResponse
) => {
  postApi(
    `${apiList.createUser}`,
    {
      username: username,
      password: password,
      lock: lock,
      roleId: roleId,
      mobile: mobile,
      sharePercent: sharePercent,
      betLimitForMix: betLimitForMix,
      betLimitForSingle: betLimitForSingle,
      commission: commission,
    },
    (data) => {
      setResponse(data);
    }
  );
};

const betAmountLimitForAdmin = (
  gamblingTypeId,
  minAmt,
  maxAmt,
  setResponse
) => {
  putApi(
    `${apiList.betAmountLimitForAdmin}${gamblingTypeId}`,
    { MinBetAmount: minAmt, MaxBetAmount: maxAmt },
    (data) => {
      setResponse(data);
    }
  );
};

// @hmh

const getLeagues = (setLeaguesData) => {
  getApi(`${apiList.getLeagues}`, (data) => {
    setLeaguesData(data);
  });
};

const getLeaguesForDropdown = (setLeaguesDataForDropdown) => {
  getApi(`${apiList.getLeaguesForDropdown}`, (data) => {
    setLeaguesDataForDropdown(data);
  })
}

const fetchSaveLeagues = (leagueList, setResponse) => {
  postApi(`${apiList.saveLeague}`, leagueList, (data) => {
    setResponse(data);
  });
};

const getFootballTeam = (setFootballTeamData) => {
  getApi(`${apiList.getFootballTeam}`, (data) => {
    setFootballTeamData(data);
  });
};

const getFootballTeamWithLeagueId = (id, setData) => {
  putApi(`${apiList.getFootballTeam}/${id}`, id, (data) => {
    setData(data);
  })
}

const editFootballTeam = (id, name, setResponse) => {
  postApi(
    `${apiList.editFootballTeam}`,
    {
      id: id,
      name: name,
    },
    (data) => {
      setResponse(data);
    }
  );
};

const getBetAmount = (setBetAmount) => {
  getApi(`${apiList.getBetAmount}`, (data) => {
    setBetAmount(data);
  });
};

const editBetAmount = (
  id,
  gamblingType,
  minBetAmount,
  maxBetAmount,
  setResponse
) => {
  putApi(
    `${apiList.editBetAmount}`,
    {
      id: id,
      gamblingType: gamblingType,
      minBetAmount: minBetAmount,
      maxBetAmount: maxBetAmount,
    },
    (data) => {
      setResponse(data);
    }
  );
};

const getWinLoseReport = (startDate, setWinOrLose) => {
  postApi(
    `${apiList.getWinLost}`,
    {
      searchDate: startDate,
    },
    (data) => {
      setWinOrLose(data);
    }
  );
};

const getWinLoseReportDetail = (userId, setWinOrLoseDetail) => {
  getApi(`${apiList.getWinLostDetail}${userId}`, (data) => {
    setWinOrLoseDetail(data);
  });
};

const getGambling = (startDate, userId, setGambling) => {
  postApi(
    `${apiList.getGambling}`,
    {
      searchDate: startDate,
      userId: userId,
    },
    (data) => {
      setGambling(data);
    }
  );
};

const getGroupGambling = (startDate,userId, setGambling) => {
  postApi(
    `${apiList.getGroupGambling}`,
    {
      SearchDate: startDate,
      UserId:parseInt(userId)
    },
    (data) => {
      setGambling(data);
    }
  );
};

const getGamblingDetail = (userId, setGamblingDetail) => {
  getApi(`${apiList.getGamblingDetail}${userId}`, (data) => {
    setGamblingDetail(data);
  });
};

const getActivityLog = (startDate, endDate, setResponse) => {
  postApi(`${apiList.getActivityLog}`, { startDate, endDate }, (data) => {
    setResponse(data);
  });
};

const saveActivityLog = (dataList, setResponse) => {
  postApi(`${apiList.saveActivityLog}`, dataList, (data) => {
    setResponse(data);
  });
};

const getRuleAndRegulation = (setResponse) => {
  getApi(`${apiList.ruleAndRegulation}`, (data) => {
    setResponse(data);
  });
};

const saveRuleAndRegulation = (dataList, setResponse) => {
  postApi(`${apiList.ruleAndRegulation}`, dataList, (data) => {
    setResponse(data);
  });
};

const updateRuleAndRegulation = (dataList, setResponse) => {
  putApi(`${apiList.ruleAndRegulation}`, dataList, (data) => {
    setResponse(data);
  });
};

const getUserCount = (setResponse) => {
  getApi(`${apiList.getUserCount}`, (data) => {
    setResponse(data);
  });
};

const removeVoucherNo = (gamblingId,status,setResponse) => {
  postApi(`${apiList.removeVoucher}`,
  {
    gamblingId : gamblingId,
    status : status
  },
  (data) => {
    setResponse(data);
  });
}

const getSubUser = (userId,setResponse) => {
  getApi(`${apiList.getSubUserInfo}/${userId}`,
  (data) => {
      setResponse(data);
  });
}

const SaveSubUser = (dataList,userId,setResponse) => {
  postApi(`${apiList.addSubUserInfo}`,{
    userId : userId,
    username : dataList.username,
    name : dataList.name,
    mobile : dataList.mobile,
    password : dataList.password
  },
  (data) => {
      setResponse(data);
  });
}

const UpdateSubUser = (dataList,setResponse) => {
  console.log("dataList>>>",dataList)
  putApi(`${apiList.editSubUserInfo}`,{
    userId : dataList.userId,
    username : dataList.username,
    name : dataList.name,
    mobile : dataList.mobile,
    password : dataList.password,
    id : dataList.id,
    lock : dataList.lock
  },
  (data) => {
      setResponse(data);
  });
}

const fetchOddsManual = (rapidEventId,setResponse) => {
  console.log("rapidEventId controller >>>>> ", rapidEventId);
getApi(`${apiList.fetchOddsManual}/${parseInt(rapidEventId)}`,
(data) => {
  setResponse(data);
});
}

export const userController = {
  getAllUser,
  getUserInfoAndCommission,
  editUserInfoAndCommission,
  getTransactionsForUser,
  getTransactionsDetails,
  changePassword,
  resetPassword,
  userBalanceAdd,
  userBalanceRemove,
  userCreditAdd,
  userLock,
  betAmountLimitForAdmin,
  getTransactionsForDashboard,
  getLeagues,
  getLeaguesForDropdown,
  fetchSaveLeagues,
  getFootballTeam,
  getFootballTeamWithLeagueId,
  editFootballTeam,
  getBetAmount,
  editBetAmount,
  getWinLoseReport,
  getWinLoseReportDetail,
  getGambling,
  getGamblingDetail,
  getUserDataWithBalance,
  createUserWithBalance,
  createUserInfoAndCommission,
  getUserCredit,
  saveUserCredit,
  getActivityLog,
  saveActivityLog,
  getRuleAndRegulation,
  saveRuleAndRegulation,
  updateRuleAndRegulation,
  getRegulationText,
  updateRegulationText,
  getGroupGambling,
  getUserCount,
  removeVoucherNo,
  getSubUser,
  SaveSubUser,
  UpdateSubUser,
  changePasswordSub,
  fetchOddsManual
};
