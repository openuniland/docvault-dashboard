import { AxiosResponse } from "axios";
import { User } from "types/User";

import http from "utils/api/http";

export const getAllUsers = async (): Promise<User[]> => {
  const response: AxiosResponse = await http.get("/users");

  return response?.data?.data;
};
