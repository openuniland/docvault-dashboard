import axios, { AxiosResponse } from "axios";

import configs from "configs";
import { getTokens, removeItemFromStorage } from "utils/storage";
import handleRefreshToken from "./refreshToken";

const http = axios.create({
  baseURL: configs.apiEndpoint,
});

http.interceptors.request.use(
  function (config: any) {
    const { accessToken } = getTokens();
    if (accessToken && config) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  async function (response: AxiosResponse) {
    return response;
  },
  async function (error: any) {
    const { config, response } = error;
    const errorMessage = response?.data?.message;

    if (errorMessage === "jwt expired") {
      const apiResponseData = await handleRefreshToken({
        baseURL: config.baseURL,
        url: config.url,
        method: config.method,
        data: config.data,
      });
      return apiResponseData;
    }

    if (
      errorMessage === "invalid signature" ||
      errorMessage === "jwt malformed"
    ) {
      removeItemFromStorage("tokens");
      removeItemFromStorage("userData");
      window.location.replace("/");
    }

    return Promise.reject(error?.response?.data);
  },
);

export default http;
