import React, {useContext} from 'react';
import AppContext from "../../../../context/AppContext";
import ByCollections from "../../reports/ByCollections";

export const CollectionsSeniorMaster = () => {
    const {userData} = useContext(AppContext);
    let userInfo = JSON.parse(userData);
    return (
        <ByCollections userInformation={userInfo} />
    )
}