import { AxiosResponse } from "axios";

import { DataWithMeta, URLparams } from "types";
import {
  ApproveTheExamPayload,
  DeleteExamParams,
  Exam,
  RequestUpdateExam,
} from "types/Exam";
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

export const createNewExam = async (): Promise<Exam> => {
  const response: AxiosResponse = await http.post(`/exams`);

  return response?.data?.data;
};

export const updateExamByAdmin = async (
  payload: RequestUpdateExam,
  examId: string,
): Promise<Exam> => {
  const response: AxiosResponse = await http.patch(
    `/administrator/exams/${examId}`,
    payload,
  );

  return response?.data?.data;
};

export const getDraftExam = async (): Promise<Exam> => {
  const response: AxiosResponse = await http.get(`/exams/draft-exam`);

  return response?.data?.data;
};

export const deleteExam = async (params: DeleteExamParams): Promise<Exam> => {
  const response: AxiosResponse = await http.delete(`/exams/${params.id}`);

  return response?.data?.data;
};
