import React from "react";

function OddSummaryModel({oddSummaryDetails}) {
  return (
    <div>
      <div className="modal fade bd-example-modal-lg" id="oddSummaryModal" tabIndex="-1" role="dialog" aria-labelledby="oddSummaryModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Event Odd Summary</h5>
        <button type="button" claclassNamess="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <div className="modal-body">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Body Odds</th>
                    <th scope="col">Body Handicap</th>
                    <th scope="col">Goal Odds</th>
                    <th scope="col">Goal Handicap</th>
                    <th scope="col">Myan</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    oddSummaryDetails && 
                    oddSummaryDetails.map((v,k) => {
                      return (
                        <tr>
                        <th scope="row">{k+1}</th>
                        <td><span style={{color:v.homeHandicap.length > 7 ? "red":"black"}}>{v.homeOdd}</span>
                        <br/>
                        <span style={{color:v.awayHandicap.length > 7 ? "red":"black"}}>{v.awayOdd}</span>
                        </td>
                        <td>{v.homeHandicap}</td>
                        <td>{v.overOdd}
                        <br/>
                        {v.underOdd}
                        </td>
                        <td>{v.goalHandicap}</td>
                        <td>{v.body}
                        <br/>
                        {v.goal}
                        </td>
                        <td>{v.createdTime}</td>
                      </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default OddSummaryModel;
