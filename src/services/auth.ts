import { AxiosResponse } from "axios";

import http from "utils/api/http";

export const login = async (googleToken: string) => {
  const response: AxiosResponse = await http.post(
    "/administrator/login",
    {},
    {
      headers: {
        ["google-token"]: `${googleToken}`,
      },
    },
  );

  return response?.data?.data;
};
