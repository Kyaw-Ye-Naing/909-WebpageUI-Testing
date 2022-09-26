import React from "react";
import { apiList } from "../_apiHelper/apiList";
import { getApi } from "../_apiHelper/getApi";
import { putApi } from "../_apiHelper/putApi";

const getAllRoleWithRoleId = (roleId, setRoleList) => {
  getApi(`${apiList.getAllRoleWithRoleId}${roleId}`, (data) => {
    setRoleList(data);
  });
};

const getUserRole = (setResponse) => {
  getApi(`${apiList.getUserRole}`, (data) => {
    setResponse(data);
  });
}

export const roleController = {
    getAllRoleWithRoleId,
    getUserRole
};
