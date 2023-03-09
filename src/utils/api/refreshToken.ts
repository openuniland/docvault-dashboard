/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosRequestConfig } from "axios";

import configs from "configs";
import { getTokens, removeItemFromStorage, setTokens } from "utils/storage";
import http from "./http";

const { refreshToken } = getTokens();

async function handleRefreshToken({
  method,
  data,
  url,
  baseURL,
}: AxiosRequestConfig) {
  const response = await axios.post(
    `${configs.apiEndpoint}/auth/refresh-token`,
    {
      refreshToken,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (response?.data?.errors) {
    removeItemFromStorage("tokens");
    window.location.replace("/");

    return;
  } else if (response.data) {
    const tokens = response.data?.data;
    setTokens(tokens);
    const { accessToken } = getTokens();

    return http.request({
      url: url,
      baseURL: baseURL,
      method: method,
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return null;
}

export default handleRefreshToken;
