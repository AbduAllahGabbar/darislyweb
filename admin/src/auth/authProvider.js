import { API_URL } from "../constants";

const getLoginStatus = () => localStorage.getItem("isLoggedIn") === "true";
const setLoginStatus = (status) => localStorage.setItem("isLoggedIn", status);

export default {
  login: async ({ username, password }) => {
    const request = new Request(`${API_URL}/auth/signinadmin`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "include",
    });

    const response = await fetch(request);
    if (response.status < 200 || response.status >= 300) {
      return Promise.reject();
    } else {
      setLoginStatus(true);
    }
    return Promise.resolve();
  },
  logout: async () => {
    const isLoggedIn = getLoginStatus();
    if (isLoggedIn) {
      const request = new Request(`${API_URL}/admin/logout`, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "include",
      });

      const response = await fetch(request);
      if (response.status < 200 || response.status >= 300) {
        return Promise.reject();
      }
    }
    setLoginStatus(false);
    return Promise.resolve();
  },
  checkAuth: () => {
    const isLoggedIn = getLoginStatus();
    return isLoggedIn ? Promise.resolve() : Promise.reject();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 400 || status === 401 || status === 403) {
      setLoginStatus(false);
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: (params) => Promise.resolve(),
};
