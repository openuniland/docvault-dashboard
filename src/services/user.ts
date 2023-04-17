import { AxiosResponse } from "axios";
import { DataWithMeta, URLparams } from "types";
import {
  GetUserInfoPayload,
  NewUserPayload,
  UpdateUserPayload,
  User,
} from "types/User";

import http from "utils/api/http";
import { DEFAULT_PAGINATION } from "utils/constants";

export const getAllUsers = async (
  urlParams: URLparams,
): Promise<DataWithMeta<User[]>> => {
  const response: AxiosResponse = await http.get("/users", {
    params: {
      currentPage: urlParams?.currentPage || DEFAULT_PAGINATION.currentPage,
      pageSize: urlParams?.pageSize || DEFAULT_PAGINATION.pageSize,
    },
  });

  return response?.data;
};

export const createNewUser = async (payload: NewUserPayload): Promise<User> => {
  const response: AxiosResponse = await http.post("/users", payload);

  return response?.data?.data;
};

export const getAUserInfo = async (
  payload: GetUserInfoPayload,
): Promise<User> => {
  const response: AxiosResponse = await http.get(
    `/administrator/users/${payload.id}`,
  );

  return response?.data?.data;
};

export const updateUser = async (payload: UpdateUserPayload): Promise<User> => {
  const response: AxiosResponse = await http.patch(
    `/users/${payload.id}`,
    payload.userInfo,
  );

  return response?.data;
};
