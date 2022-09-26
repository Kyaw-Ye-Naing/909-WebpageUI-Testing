import { logout } from ".";

export const handleResponse = (response) => {
  
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 400) {
        return data;
      }
      if (response.status === 404) {
        return data;
      }
      if (response.status === 401) {
        logout();
        window.location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};
