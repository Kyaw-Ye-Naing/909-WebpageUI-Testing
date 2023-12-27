import { authHeader, baseUrl, handleResponse } from "../_constants";
export const putApi = async (url, obj, setData) => {
  const requestOptions = {
    method: "PUT",
    //async: true,
    //crossDomain: true,
    //processData: false,
    headers: authHeader(),
    body: JSON.stringify(obj),
  };
  fetch(`${baseUrl}${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => setData(data))
    .catch((error) => {
      setData(error)
      console.log("put_error>>>", error);
    });
};
