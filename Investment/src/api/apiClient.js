/*This file:
auto-attaches access token
auto-refreshes on 401
retries the request */

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true
});

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 401) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        );

        accessToken = res.data.accessToken;
        error.config.headers.Authorization = `Bearer ${accessToken}`;

        return api(error.config);
      } catch {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
