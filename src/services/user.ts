import { AxiosResponse } from "axios";
import { DataWithMeta, URLparams } from "types";
import { NewUserPayload, User } from "types/User";

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
