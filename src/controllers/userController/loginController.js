import { apiList, postApi } from "../_apiHelper";
import { logout } from "../_constants";

export const loginController = (
  props,
  username,
  password,
  setuserData,
  setMessage
) => {
  localStorage.clear();
  if (localStorage.length == 0) {
    postApi(apiList.loginApi, { username, password }, (data) => {
      if (data.token) {
        localStorage.setItem("aaaLoginData", JSON.stringify(data));
        localStorage.setItem("password", password);
        localStorage.setItem("isShare",data.share);
        setuserData(JSON.stringify(data.userDetails));
        setMessage("Login Success");
        if(data.share){
          props.history.push("/subdashboard");
        }
        else{
          props.history.push("/dashboard");
        }
        
      } else {
        setMessage(data.message);
      }
    });
  }
};

export const tokenIncrease = (username, setuserData) => {
  const password = localStorage.getItem("password");
  postApi(`${apiList.tokenIncrease}`, { username, password }, (data) => {
    if (data.token) {
      setuserData(JSON.stringify(data.userDetails));
    }
  });
};
