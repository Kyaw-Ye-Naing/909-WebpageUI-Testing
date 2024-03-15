export const logout = () => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  window.location.pathname = "/";
};
