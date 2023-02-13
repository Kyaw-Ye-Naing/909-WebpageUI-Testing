import React, { useEffect } from "react";
import { useMediaPredicate } from "react-media-hook";
import MyColor from "../../../../config/color";
import { reportController } from "../../../../controllers/reportController";

export const VoucherViewModal = (props) => {
  const { gamblingId, setLoading } = props;
  const [eventData, setEventData] = React.useState([]);
  const isPhone = useMediaPredicate("(max-width: 800px)");

  useEffect(() => {
    //console.log("gamblingId from child",gamblingId)
    setLoading(true);
    if (gamblingId != 0) {
      reportController.getVoucherViewDetails(gamblingId, (data) => {
        setEventData(data.voucherDetails);
        //console.log("data",data.voucherDetails)
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [gamblingId]);

  return (
    <div
      id="voucherviewmodal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="voucherviewmodal"
      aria-hidden="true"
      className="modal fade bd-example-modal-lg"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
        <div class="modal-header">
        <h5 class="modal-title">Voucher View Details</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
          <div className="modal-body">
            <div className="table table-bordered table-sm">
              <table className="table mb-0">
                <thead style={{ backgroundColor: MyColor.secondaryBackground }}>
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
                      <tr style={{ fontSize: isPhone ? 12 : null }} key={index}>
                        <th style={{ textAlign: "right" }} scope="row">
                          {index + 1}
                        </th>
                        <td style={{ textAlign: "right" }} scope="row">
                          <div style={{display:"flex",flexDirection:"column"}}>
                          <span style={{ color: "#4169e1" }}>
                            {data.leagueName}
                          </span>
                          <span>
                            {data.homeTeam} vs {data.awayTeam}
                          </span>
                          </div> 
                        </td>
                        <td style={{ textAlign: "right" }}>{data.odds}</td>
                        <td style={{ color: data.bettedColor, textAlign: "right" }}>
                          {data.bettedTeam}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherViewModal;
