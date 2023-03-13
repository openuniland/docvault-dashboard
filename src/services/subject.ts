import { AxiosResponse } from "axios";
import { Subject } from "types/Subject";

import http from "utils/api/http";

export const getAllSubjects = async (): Promise<Subject[]> => {
  const response: AxiosResponse = await http.get("/subjects");

  return response?.data?.data;
};
