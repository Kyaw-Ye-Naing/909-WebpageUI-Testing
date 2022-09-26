import { authHeader, baseUrl,handleResponse } from "../_constants";
export const postApi = async (url, obj, setData) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(obj),
  };
  fetch(`${baseUrl}${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => setData(data))
    .catch((error) => {
      console.log("post_error>>>", error);
      return setData(error)
    });
};

