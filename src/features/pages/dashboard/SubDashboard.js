import React,{useEffect,useState,useContext} from 'react'
import { withTheme } from "../../common/hoc/withTheme";
import Mycolor from "../../../config/color";
import MyFont from "../../../config/fonts";
import AppContext from "../../../context/AppContext";
import { userController } from "../../../controllers/userController/userController";

const SubDashboard = (props) => {
    const { userData } = useContext(AppContext);
    const [userCount, setUserCount] = useState(0);
    const [seniorMasterCount, setSeniorMasterCount] = useState(0);
    const [masterCount, setMasterCount] = useState(0);
    const [agentCount, setAgentCount] = useState(0);

    let userInfo = JSON.parse(userData);
    const { history } = props;

    useEffect(() => {
        getUserCount();
    }, []);

    const getUserCount = () => {
        console.log("hey  i am working from count")
        userController.getUserCount((data) => {
            setUserCount(data.userCount);
            setSeniorMasterCount(data.seniorCount);
            setMasterCount(data.masterCount);
            setAgentCount(data.agentCount);
        });
    };

    return (
        <div className="container">
            <div className="container d-flex flex-row flex-wrap justify-content-around my-2">
                <Card1
                    count={userInfo ? userInfo.memberCount : 0}
                    details={"Members"}
                    background={"#000060"}
                    icon={"fas fa-user-friends"}
                />
                <Card1
                    count={userInfo ? userInfo.balance.toLocaleString("en-US") : 0}
                    details={"Balance"}
                    background={"#007a33"}
                    icon={"fas fa-dollar-sign"}
                />
                <Card1
                    count={userInfo ? userInfo.credit.toLocaleString("en-US") : 0}
                    details={"Credits"}
                    background={"#ff6700"}
                    icon={"fas fa-dollar-sign"}
                />
                <Card1
                    count={
                        userInfo
                            ? (userInfo.balance - userInfo.credit).toLocaleString("en-US")
                            : 0
                    }
                    details={"Status"}
                    background={"#5c5b68"}
                    icon={"fas fa-dollar-sign"}
                />
            </div>

        </div>
    )
}

export default withTheme(SubDashboard);

export const Card1 = (props) => {
    const { count, details, background, icon } = props;
    return (
        <div className="d-flex justify-content-center p-2 col-lg-6 col-md-6 col-sm-12">
            <div
                className="border bg-white p-2 shadow d-flex justify-content-center"
                style={{
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    minWidth: 80,
                }}
            >
                <i
                    className={`${icon} py-3`}
                    style={{ color: background, fontSize: 40 }}
                />
            </div>
            <div
                className="border p-1 shadow"
                style={{
                    minWidth: 170,
                    background: background,
                    color: Mycolor.bodyText,
                }}
            >
                <div
                    className="px-2 pt-2"
                    style={{ fontWeight: 600, fontSize: MyFont.heading }}
                >
                    {count}
                </div>
                <div className="px-2 pt-1" style={{ fontSize: MyFont.small }}>
                    {details}
                </div>
            </div>
        </div>
    );
};