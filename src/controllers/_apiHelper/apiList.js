export const apiList = {
  loginApi: "LogIn/authenticate",
  userListApi: "UserBalance/balance/",
  getUserInfoAndCommission: "TblUsers/GetUserDataWithBalance/",
  editUserInfoAndCommission: "TblUsers/editUser",
  createUserInfoAndCommission: "TblUsers/createNewUser",
  getAllRoleWithRoleId: "TblRoles/GetAllRollWithRoleId/",
  getUserRole: "TblRoles",
  getTransactionsDetails: "UserBalance/GetTransactionDetailsForUserWithDate",
  getTransactionsForUser: "UserBalance/GetTransactionForUser",
  getUserDataWithBalance: "TblUsers/GetUserDataWithBalance/",

  getTransactionsForDashboard: "UserBalance/GetTransactionForDashboard",
  createUser: "TblUsers",

  // @hmh

  getLeagues: "TblLeagues",
  getLeaguesForDropdown: "TblLeagues/dropdown-league-data",
  saveLeague: "TblLeagues",
  getFootballTeam: "TblFootballTeams",
  editFootballTeam: "TblFootballTeams",
  getBetAmount: "UserBalance/getMinMax",
  editBetAmount: "UserBalance/minmax",

  getWinLost: "WinOrLose/getWinReport",
  getWinLostDetail: "WinOrLose/getWinReportDetails/",

  getGambling: "Betting/getBettingReport",
  getGroupGambling: "Betting/getgroupBettingReport",
  getGamblingDetail: "Betting/getBettingReportDetails/",
  getGoalResult: "GoalsResult/SearchGoalsResult",
  searchSelectedEvent: "GoalsResult/SelectedEventReport",
  removeEventsPre:"GoalsResult",
  updateGoalResult: "GoalsResultEdit/updateResult",
  betAmountTotal: "Betting/getTotal/",

  getActivityLog: "ActivityLog/searchlog",
  saveActivityLog: "ActivityLog/savelog",

  //add new
  getUserCredit: "Credit/show/",
  saveUserCredit: "Credit/return",
  userBalanceAdd: "UserBalance/add", //body json {Amount:0000}
  userBalanceRemove: "UserBalance/remove/", //body json {Amount:0000}
  userCreditAdd: "Credit/give", //body json {Amount:0000}
  userLock: "UserSetting/lock", //body json {userId:0,isLock:true}
  resetPassword: "UserSetting/reset", //body json {userId:0,OldPassword:0,NewPassword:0}
  changePassword: "UserSetting/change", //body json {userId:0,CurrentPassword:0,NewPassword:0,ConfirmPassword:0}
  changePasswordSub: "UserSetting/sub-change",

  ruleAndRegulation: "Rule",
  displayRegulation: "Regulation",
  liveData: "LiveData",
  mixLiveData: "LiveData/mix", //add kyn 27-4-2021--
  singleVoucherLists: "LiveData/single-body-voucher",
  mixVoucherLists:"LiveData/mix-voucher-details",
  voucherDetailsView:"LiveData/voucher-view-details",

  betAmountLimitForAdmin: "UserBalance/minmax/", //need gamblingTypeId route param//body json {MinBetAmount:0,MaxBetAmount:0}
  getCollectionData: "ByCollection/GetCollectionReport",
  getCollectionEvent: "ByCollection/getDetails",
  getUserCount: "UserSetting/UserCount",
  tokenIncrease: "LogIn/token-increase",
  getVoucher: "GoalsResult/get-voucher",
  getBufferData:"TblLeagues/get-buffer-list",
  saveBufferTable:"TblLeagues/buffer-temp",
  saveEventManual:"TblLeagues/event-manual",
  updateEvent365:"TblLeagues/update-odds-365",
  removeVoucher:"GoalsResult/cancel-voucher",

  getPreupcommingEvent : "OddSummary/get-preupcomming",
  getEventOddSummary : "OddSummary/get-event-odd-summary",
  getUpdateStatus : "TblLeagues/fetch-update-status",
  getUpdateStatusResult : "GoalsResultEdit/fetch-update-status-result",

  getSubUserInfo : "TblUsers/GetSubUserInfo",
  addSubUserInfo : "TblUsers/SaveSubUserInfo",
  editSubUserInfo : "TblUsers/EditSubUserInfo",

  fetchOddsManual : "TblLeagues/fetch-odds-manual",
  getMixWinVoucherList : "BettingHistory/mix-win-history",
  getMixWinVoucherInfo : "BettingHistory/mix-win-history-info"
};
