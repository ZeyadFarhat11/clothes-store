import axios from "axios";

export const cls = (...classes) => classes.join(" ").trim();

export const api = axios.create({
  baseURL: "http://localhost:3004",
  withCredentials: true,
});
window.api = api;

api.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem("accessToken");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
