import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MyColor from "../../../config/color";
import MyFont from "../../../config/color";
import Modal from "@material-ui/core/Modal";
import { reportController } from "../../../controllers/reportController";
import moment from "moment";
import { useMediaPredicate } from "react-media-hook";

const rand = () => {
  return Math.round(Math.random() * 20) - 6;
};
const getModalStyle = (isPhone) => {
  const top = 50;
  const left = 50;

  return {
    width: isPhone ? "80%" : null,
    height: 1000,
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    backgroundColor: MyColor.softHighlight,
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 800,
    backgroundColor: MyColor.background,
    //   border: '2px solid #000',
    boxShadow: theme.shadows[10],
    padding: theme.spacing(1, 3, 2),
    height: "auto",
  },
  box: {
    backgroundColor: MyColor.modalBg,
  },
}));

const RoundedBox = (props) => {
  const { data } = props;
  return (
    <div
      className="container border col mx-lg-6 col-md-6 py-2 px-3"
      style={{
        borderRadius: "5px",
        /*backgroundColor:MyColor.modalFirstBg,*/ color: MyColor.bodyText,
      }}
    >
      <div className="col-lg-12 col-md-12">
        <div className="row pb-1">
          {moment(data.eventDate).format("YYYY-MM-DD hh:mm:ss a")}
        </div>
        <div className="row">
          <div
            className="col-lg-6 col-md-6 text-center border p-2"
            style={{ borderRadius: "3px", backgroundColor: MyColor.offBg }}
          >
            <span className="pr-4">
              {data.home ? data.bettedTeamMyan : data.oppositeTeamNameMyan}
            </span>
            <span>{data.isHomeBodyOdd && data.bodyOdd}</span>
          </div>
          <div
            className="col-lg-6 col-md-6 text-center border p-2"
            style={{
              borderRadius: "3px",
              backgroundColor: data.away ? MyColor.onBg : MyColor.offBg,
            }}
          >
            <span className="pr-4">
              {data.away ? data.bettedTeamMyan : data.oppositeTeamNameMyan}
            </span>
            <span>{!data.isHomeBodyOdd && data.bodyOdd}</span>
          </div>
        </div>
        <div className="row">
          <div
            className="col-lg-4 col-md-4 text-center border p-2"
            style={{
              borderRadius: "3px",
              backgroundColor: data.overs ? MyColor.onBg : MyColor.offBg,
            }}
          >
            Over
          </div>
          <div
            className="col-lg-4 col-md-4 text-center p-2"
            style={{ borderRadius: "3px", color: MyColor.modalText }}
          >
            {data.goalOdd}
          </div>
          <div
            className="col-lg-4 col-md-4 text-center border p-2"
            style={{
              borderRadius: "3px",
              backgroundColor: data.under ? MyColor.onBg : MyColor.offBg,
            }}
          >
            Under
          </div>
        </div>
        <div className="row pt-1">
          Result{" "}
          <span>
            {" "}
            ({data.homeResult} : {data.awayResult})
          </span>
        </div>
      </div>
    </div>
  );
};

const ShowViewDetailsNew = (props) => {
  const { data, indextt } = props;
  return (
    <div>
      <div className="table table-bordered table-sm">
        <table class="table mb-0">
          <thead style={{ backgroundColor: MyColor.secondaryBackground }}>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Home</th>
              <th scope="col">Away</th>
              <th scope="col">Bet</th>
              <th scope="col">Odds</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{indextt}</th>
              <td>{data.home ? data.bettedTeam : data.oppositeTeamName}</td>
              <td>{data.away ? data.bettedTeam : data.oppositeTeamName}</td>

              {data.home == false && data.away == false ? (
                data.overs == true ? (
                  <td style={{ color: "red" }}>Over</td>
                ) : (
                  <td style={{ color: "#yellow" }}>Under</td>
                )
              ) : (data.isHomeBodyOdd == true && data.home == true) ||
                (data.isHomeBodyOdd == false && data.away == true) ? (
                <td style={{ color: "red" }}>{data.bettedTeam}</td>
              ) : (
                <td style={{ color: "#yellow" }}>{data.bettedTeam}</td>
              )}

              {data.home == false && data.away == false ? (
                <td>{data.goalOdd}</td>
              ) : (
                <td>{data.bodyOdd}</td>
              )}
              <td>
                {data.homeResult}-{data.awayResult}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const MyEventModal = (props) => {
  const { gamblingWinId, setLoading } = props;
  const classes = useStyles();
  const [eventData, setEventData] = React.useState([]);
  const [loseAmount, setloseAmount] = React.useState([]);
  const [winAmount, setwinAmount] = React.useState([]);
  const [betAmount, setbetAmount] = React.useState([]);
  const [voucher, setvoucher] = React.useState([]);
  const [status,setStatus] = React.useState([]);
  const [eventDataDetail, setEventDataDetail] = React.useState([]);
  const isPhone = useMediaPredicate("(max-width: 800px)");
  const [modalStyle] = React.useState(getModalStyle(isPhone));

  useEffect(() => {
    setLoading(true);
    if (gamblingWinId != 0) {
      reportController.getCollectionEvent(gamblingWinId, (data) => {
        setEventDataDetail(data);
        setEventData(data.viewDetails);
        setwinAmount(data.winAmount);
        setloseAmount(data.loseAmount);
        setvoucher(data.voucherNo);
        setbetAmount(data.betAmount);
        setStatus(data.voucherStatus);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [gamblingWinId]);

  return (
    <div
      id="exampleModalLong"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
      class="modal fade bd-example-modal-lg"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div
              className="row justify-content-end"
              style={{ marginRight: isPhone ? 0 : 2.5 }}
            >
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="row p-2">
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "50%",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  <p style={{ fontSize: isPhone ? 12 : 18 }}>
                    Voucher No - {voucher}
                  </p>
                  <p style={{ fontSize: isPhone ? 10 : 16 }}>
                    Bet Amount - {betAmount}
                  </p>
                </div>
                <div
                  style={{
                    width: "50%",
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: isPhone ? 10 : 16,
                  }}
                >
                  <p>
                    {winAmount == 0
                      ? `Lose Amount - ${loseAmount}`
                      : `Win Amount - ${winAmount}`}
                  </p>
                  {/* <p>Status - {winAmount == 0 ? "Lose" : "Win"}</p> */}
                  <p>Status - <span style={{color:status == 'Win'?'green':'red'}}>{status}</span></p>
                </div>
              </div>
              {/* eventData.length > 0 && eventData.map((data, index) => (
                    // <RoundedBox data={team} />
                   // <ShowViewDetailsNew data={team} indextt={index} /> */}
              <div className="table table-bordered table-sm">
                <table class="table mb-0">
                  <thead
                    style={{ backgroundColor: MyColor.secondaryBackground }}
                  >
                    <tr>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: isPhone ? 10 : null,
                        }}
                        scope="col"
                      >
                        No
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: isPhone ? 10 : null,
                        }}
                        scope="col"
                      >
                        Choice
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: isPhone ? 10 : null,
                        }}
                        scope="col"
                      >
                        Odds
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: isPhone ? 10 : null,
                        }}
                        scope="col"
                      >
                        Bet
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventData.length > 0 &&
                      eventData.map((data, index) => (
                        <tr style={{ fontSize: isPhone ? 12 : null }}>
                          <th style={{ textAlign: "right" }} scope="row">
                            {index + 1}
                          </th>
                          <td style={{ textAlign: "right" }} scope="row">
                            <p style={{ color: "#4169e1" }}>
                              {data.leagueName}
                            </p>
                            <p>
                              {data.home || data.isHome
                                ? data.bettedTeam
                                : data.oppositeTeamName}{" "}
                              VS{" "}
                              {data.away
                                ? data.bettedTeam
                                : data.oppositeTeamName}
                            </p>
                            <p>
                              Result ({data.homeResult}-{data.awayResult})
                            </p>
                          </td>
                          {data.home == false && data.away == false ? (
                            <td style={{ textAlign: "right" }}>
                              {data.goalOdd}
                            </td>
                          ) : (
                            <td style={{ textAlign: "right" }}>
                              {data.bodyOdd}
                            </td>
                          )}
                          {data.home == false && data.away == false ? (
                            data.overs == true ? (
                              <td style={{ color: "red", textAlign: "right" }}>
                                Over
                              </td>
                            ) : (
                              <td
                                style={{ color: "green", textAlign: "right" }}
                              >
                                Under
                              </td>
                            )
                          ) : (data.isHomeBodyOdd == true &&
                              data.home == true) ||
                            (data.isHomeBodyOdd == false &&
                              data.away == true) ? (
                            <td style={{ color: "red", textAlign: "right" }}>
                              {data.bettedTeam}
                            </td>
                          ) : (
                            <td style={{ color: "green", textAlign: "right" }}>
                              {data.bettedTeam}
                            </td>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <Modal
    //   open={open}
    //   //onClose={handleClose}
    //   aria-labelledby="simple-modal-title"
    //   aria-describedby="simple-modal-description"
    // >
    //   <div>
    //     <div style={modalStyle} className={classes.paper}>
    //       <div className="row justify-content-end">
    //         <div onClick={() => setModalOpen(false)}>
    //           <i className="fa fa-window-close" aria-hidden="true"></i>
    //         </div>
    //       </div>
    //       {
    //         // eventData.length > 0 && eventData.map((v, k) =>
    //         // <div className="container-md border py-3" key={v.leagueId}>
    //         // <fieldset className="border container-fluid" key={v.leagueId} style={{
    //         //   borderRadius: "5px", backgroundRepeat: "no-repeat", color: MyColor.modalText,
    //         //   backgroundPosition: "center", backgroundSize: "cover"
    //         // }} key={v.leagueId}>
    //         //   <legend style={{ width: "auto", padding: "5px 10px 0px 10px", marginLeft: "8px", fontSize: "17px", color: MyColor.modalText }}>
    //         //      {v.leagueName}</legend>

    //         // </fieldset>
    //         //)
    //       }
    //     </div>
    //   </div>
    // </Modal>
  );
};
