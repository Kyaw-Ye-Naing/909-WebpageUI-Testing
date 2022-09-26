import React, { useContext } from "react";
import { withRouter } from "react-router";
import MyColor from "../../../config/color";
import { logout } from "../../../controllers/_constants";
import { withTheme } from "../hoc/withTheme";
import AppContext from "../../../context/AppContext";

class Navbar extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { onClick } = this.props;
    const { setuserData } = this.context;
    // const {setuserData} = useContext(AppContext);

    return (
      <div className="shadow sticky-top" style={{ zIndex: 5 }}>
        <nav
          className="navbar navbar-light justify-content-between p-2 "
          style={{ background: MyColor.bg }}
        >
          <div className="d-flex">
            <button
              className="btn pr-3"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Close SideBar!"
              onClick={onClick}
            >
              <i
                className="fas fa-bars align-self-center"
                style={{ color: MyColor.bodyText, fontSize: 20 }}
              />
            </button>
            <div
              className="p-1 h5"
              style={{ color: MyColor.bodyText, fontWeight: 800, fontSize: 33 }}
            >
              9 0 9 {/*--Modified by KYN---*/}
            </div>
          </div>

          <form
            className="form-inline px-2"
            style={{ color: MyColor.bodyText, fontWeight: 500 }}
          >
            {/* <button className="btn px-3" data-toggle="tooltip" data-placement="bottom" title="Log out">
            <i type="button" className="fas fa-user-circle" style={{ color: MyColor.bodyText, fontSize: 28 }} />
          </button> */}
            <div className="btn-group dropdown">
              <button
                className="btn dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i
                  type="button"
                  className="fas fa-user-circle"
                  style={{ color: MyColor.bodyText, fontSize: 28 }}
                />
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <a
                  className="dropdown-item"
                  href="/"
                  onClick={() => {
                    logout();
                    setuserData(null);
                  }}
                >
                  <i className="fas fa-sign-out-alt pr-1" />
                  Log Out
                </a>
              </div>
            </div>
          </form>
        </nav>
      </div>
    );
  }
}
export default withTheme(withRouter(Navbar));
