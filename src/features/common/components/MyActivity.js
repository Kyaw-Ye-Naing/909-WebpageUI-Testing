import React from 'react';
import { userController } from "../../../controllers/userController";
import {toast} from "react-toastify";

export const MyActivity = (activityList) => {
    userController.saveActivityLog(activityList, (data) => {
        // toast.success("Added user activity log.", {
        //   position: toast.POSITION.BOTTOM_RIGHT
        // });
    });
}