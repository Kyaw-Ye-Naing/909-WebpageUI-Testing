import React from "react";
import { apiList } from "../_apiHelper/apiList";
import { getApi } from "../_apiHelper/getApi";
import { postApi } from "../_apiHelper/postApi";
import { putApi } from "../_apiHelper/putApi";

//--- get data for buffer page ----
const getBufferData = (setBufferList) => {
  getApi(`${apiList.getBufferData}`, (data) => {
    setBufferList(data);
  })
}

//----save leagues data to buffer table from setting league
const saveBufferData = (leagueList, setResponse) => {
  postApi(`${apiList.saveBufferTable}`, leagueList, (data) => {
    setResponse(data);
  });
};

//----update odds from buffer page to bet 365
const updateBufferEvent = (rapidEventIdList, setResponse) => {
  postApi(`${apiList.updateEvent365}`,
    {
      rapidEventId: rapidEventIdList
    },
    (data) => {
      setResponse(data);
    }
  )
}

//---save manual event from buffer page to preupcomming
const saveManualEvent = (id, isMix, isSingle, setResponse) => {
  postApi(`${apiList.saveEventManual}`,
    {
      rapidEventId: id,
      isMix: isMix,
      isSingle: isSingle
    },
    (data) => {
      setResponse(data);
    })
}

//---save final selected events to preupcomming
const saveEventsPreupcomming = (selectedEventData, setResponse) => {
  postApi(`${apiList.saveLeague}`,
    {
      BufferResponseLists: selectedEventData
    },
    (data) => {
      setResponse(data);
    })
}

//---remove selected events from pre upcomming
const removeEventsFromPre = (rapidEventId, status, setResponse) => {
  putApi(`${apiList.removeEventsPre}`,
    {
      rapidEventId: rapidEventId,
      status: status
    },
    (data) => {
      setResponse(data);
    }
  )
}

const getLiveDataReport = (date,isbody, setResponse) => {
  postApi(`${apiList.liveData}`, { searchDate: date, isBody:isbody }, (data) => {
    setResponse(data);
  });
};

const getMixLiveDataReport = (date, setResponse) => {
  putApi(`${apiList.mixLiveData}`, { searchDate: date }, (data) => {
    setResponse(data);
  });
}; //--add kyn 27-4-2021

const getBetAmountTotal = (searchDate, setBetAmountTotal) => {
  postApi(apiList.betAmountTotal, { searchDate }, (data) => {
    setBetAmountTotal(data);
  });
};

const getGoalResult = (setGoalResultList) => {
  getApi(`${apiList.getGoalResult}`, (data) => {
    setGoalResultList(data);
  });
};

const getUpdateStatus = (type,setResponse) => {
  getApi(`${apiList.getUpdateStatus}${type}`, (data) => {
    setResponse(data);
  });
};

const searchGoalResult = (startDate, endDate, setGoalResultList) => {
  postApi(apiList.getGoalResult, { startDate, endDate }, (data) => {
    setGoalResultList(data);
  });
};

const searchSelectedEvent = (date, setSelectedEvent) => {
  postApi(`${apiList.searchSelectedEvent}`, { selectDate: date }, (data) => {
    setSelectedEvent(data);
  });
};

const updateGoalResult = (dataList, setResponse) => {
  putApi(`${apiList.updateGoalResult}`, dataList, (data) => {
    setResponse(data);
  });
};

const getCollectionData = (dataList, setResponse) => {
  postApi(`${apiList.getCollectionData}`, dataList, (data) => {
    setResponse(data);
  });
};

const getCollectionEvent = (gamblingId, setResponse) => {
  postApi(
    `${apiList.getCollectionEvent}`,
    { gamblingWinId: gamblingId },
    (data) => {
      setResponse(data);
    }
  );
};

const getEventWithVoucher = (id, setResponse) => {
  postApi(`${apiList.getVoucher}`, { RapidEventId: parseFloat(id) }, (data) => {
    setResponse(data);
  });
};

const getPreupcommingEvent = (selectedDate, setResponse) => {
  postApi(`${apiList.getPreupcommingEvent}`, { selectDate: selectedDate }, (data) => {
    setResponse(data);
  });
}

const getEventOddSummary = (rapidEventId, setResponse) => {
  postApi(`${apiList.getEventOddSummary}`, { rapidEventId: rapidEventId }, (data) => {
    setResponse(data);
  });
}

const getMixVoucherList = (teamCount,date, setResponse) => {
  getApi(`${apiList.mixVoucherLists}/${parseInt(teamCount)}/${date}`,
    (data) => {
      setResponse(data);
    });
};

const getSingleVoucherList = (rapidEventId,isbody,setResponse) => {
  postApi(`${apiList.singleVoucherLists}`,
    { 
      rapidEventId: parseInt(rapidEventId) ,
      isBody : isbody
    },
    (data) => {
      setResponse(data);
    });
};

const getVoucherViewDetails = (gamblingId,setResponse) => {
  getApi(`${apiList.voucherDetailsView}/${parseInt(gamblingId)}`,
  (data) => {
    setResponse(data);
  }
  )
};

export const reportController = {
  getLiveDataReport,
  getBetAmountTotal,
  getGoalResult,
  searchGoalResult,
  searchSelectedEvent,
  updateGoalResult,
  getCollectionData,
  getCollectionEvent,
  getMixLiveDataReport, //add kyn 27-4-2021
  getEventWithVoucher,
  getBufferData,//add kyn 4-8-2022 buffer
  updateBufferEvent,
  saveBufferData,
  saveManualEvent,
  saveEventsPreupcomming,
  removeEventsFromPre,
  getPreupcommingEvent,
  getEventOddSummary,
  getUpdateStatus,
  getMixVoucherList,
  getSingleVoucherList,
  getVoucherViewDetails
};
