import React from "react";

function OddSummaryModel({oddSummaryDetails}) {
  return (
    <div>
      <div class="modal fade bd-example-modal-lg" id="oddSummaryModal" tabindex="-1" role="dialog" aria-labelledby="oddSummaryModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Event Odd Summary</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div className="modal-body">
              <table class="table">
                <thead class="thead-dark">
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
                        <td><span style={{color:v.homeHandicap.length > 7 ? "red":"black"}}>{v.homeOdds}</span>
                        <br/>
                        <span style={{color:v.awayHandicap.length > 7 ? "red":"black"}}>{v.awayOdds}</span>
                        </td>
                        <td>{v.homeHandicap}</td>
                        <td>{v.overOdds}
                        <br/>
                        {v.underOdds}
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
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default OddSummaryModel;
