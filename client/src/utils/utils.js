import axios from "axios";

export const cls = (...classes) => classes.join(" ").trim();

export const api = axios.create({
  // baseURL: "http://192.168.1.3:8000/api/v1",
  baseURL: "http://localhost:8000/api/v1",
  // withCredentials: true,
});
window.api = api;

api.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("accessToken");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
