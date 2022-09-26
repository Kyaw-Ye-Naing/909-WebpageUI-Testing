export function authHeader() {
  let loginData = JSON.parse(localStorage.getItem("aaaLoginData"));
  if (loginData && loginData.token) {
    return {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
      Authorization: `Bearer ${loginData.token}`,
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    };
  } else {
    return {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    };
  }
}
