import { AxiosResponse } from "axios";

import { DataWithMeta, URLparams } from "types";
import { ApproveTheExamPayload, Exam } from "types/Exam";
import http from "utils/api/http";
import { DEFAULT_PAGINATION } from "utils/constants";

export const getAllExams = async (
  urlParams: URLparams,
): Promise<DataWithMeta<Exam[]>> => {
  const response: AxiosResponse = await http.get("/exams", {
    params: {
      currentPage: urlParams?.currentPage || DEFAULT_PAGINATION.currentPage,
      pageSize: urlParams?.pageSize || DEFAULT_PAGINATION.pageSize,
    },
  });

  return response?.data;
};

export const approveTheExam = async (
  payload: ApproveTheExamPayload,
): Promise<Exam[]> => {
  const response: AxiosResponse = await http.patch(
    `/administrator/exams/${payload.id}`,
    {
      is_approved: payload.is_approved,
    },
  );

  return response?.data?.data;
};
