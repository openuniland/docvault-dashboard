import { AxiosResponse } from "axios";
import { DataWithMeta, URLparams } from "types";
import { ApproveTheDocumentPayload } from "types/DocumentModel";
import {
  DeleteSubjectParams,
  NewSubjectPayload,
  Subject,
  UpdateTheSubjectPayload,
} from "types/Subject";

import http from "utils/api/http";
import { DEFAULT_PAGINATION } from "utils/constants";

export const getAllSubjects = async (
  urlParams: URLparams,
): Promise<DataWithMeta<Subject[]>> => {
  const response: AxiosResponse = await http.get(
    "/subjects?PageSize=100&order=ASC&sort=subject_name",
    {
      params: {
        currentPage: urlParams?.currentPage || DEFAULT_PAGINATION.currentPage,
        pageSize: urlParams?.pageSize || DEFAULT_PAGINATION.pageSize,
      },
    },
  );

  return response?.data;
};

export const getAllSubjectsApproved = async (): Promise<Subject[]> => {
  const response: AxiosResponse = await http.get(
    "/subjects?is_approved=true&pageSize=100",
  );

  return response?.data?.data;
};

export const updateTheSubject = async (
  payload: UpdateTheSubjectPayload,
): Promise<Subject[]> => {
  const response: AxiosResponse = await http.put(
    `/subjects/${payload.id}`,
    payload.subject,
  );

  return response?.data?.data;
};

export const addTheSubject = async (
  payload: NewSubjectPayload,
): Promise<Subject[]> => {
  const response: AxiosResponse = await http.post(`/subjects`, payload);

  return response?.data?.data;
};

export const approveTheSubject = async (
  payload: ApproveTheDocumentPayload,
): Promise<Subject[]> => {
  const response: AxiosResponse = await http.put(`/subjects/${payload.id}`, {
    is_approved: payload.is_approved,
  });

  return response?.data?.data;
};

export const deleteSubject = async (
  params: DeleteSubjectParams,
): Promise<Subject> => {
  const response: AxiosResponse = await http.delete(`/subjects/${params.id}`);

  return response?.data?.data;
};
