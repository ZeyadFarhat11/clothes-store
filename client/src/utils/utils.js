import axios from "axios";

export const cls = (...classes) => classes.join(" ").trim();

export const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

api.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem("accessToken");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
