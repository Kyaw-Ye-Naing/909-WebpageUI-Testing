import React, {useContext} from 'react';
import AppContext from "../../../context/AppContext";
import ByCollections from "../../pages/reports/ByCollections";

export const ExpandedCollections = () => {
    const {userData} = useContext(AppContext);
    let userInfo = JSON.parse(userData);
    return (
        <ByCollections userInformation={userInfo} />
    )
}