import React from "react";

function OddSummaryModel() {
  return (
    <div>
     <div class="modal fade" id="oddSummaryModal" tabindex="-1" aria-labelledby="oddSummaryModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Home Odds</th>
                    <th scope="col">Home Handicap</th>
                    <th scope="col">Away Odds</th>
                    <th scope="col">Away Handicap</th>
                    <th scope="col">Over Odds</th>
                    <th scope="col">Under Odds</th>
                    <th scope="col">Goal Handicap</th>
                    <th scope="col">Body</th>
                    <th scope="col">Goal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OddSummaryModel;
