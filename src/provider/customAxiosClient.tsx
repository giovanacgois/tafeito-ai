import axios from "axios";

import { BASE_API } from "../utils/api";

const hasToken = () => {
  return typeof localStorage.getItem("token") === "string";
};
const apiClient = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (hasToken() === true) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { apiClient as apiClient };
