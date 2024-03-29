/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosRequestConfig } from "axios";

import configs from "configs";
import { getTokens, removeItemFromStorage, setTokens } from "utils/storage";
import http from "./http";

async function handleRefreshToken({
  method,
  data,
  url,
  baseURL,
  params,
}: AxiosRequestConfig) {
  const { refreshToken } = getTokens();

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
      params: params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  return null;
}

export default handleRefreshToken;
