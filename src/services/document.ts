import { AxiosResponse } from "axios";
import { DataWithMeta, URLparams } from "types";

import {
  ApproveTheDocumentPayload,
  CreateTheDocumentPayload,
  DocumentModel,
  GetTheDocumentParams,
} from "types/DocumentModel";
import {} from "types/Subject";

import http from "utils/api/http";
import { DEFAULT_PAGINATION } from "utils/constants";

export const getAllDocument = async (
  urlParams: URLparams,
): Promise<DataWithMeta<DocumentModel[]>> => {
  const response: AxiosResponse = await http.get("/administrator/documents", {
    params: {
      currentPage: urlParams?.currentPage || DEFAULT_PAGINATION.currentPage,
      pageSize: urlParams?.pageSize || DEFAULT_PAGINATION.pageSize,
    },
  });

  return response?.data;
};

export const approveTheDocument = async (
  payload: ApproveTheDocumentPayload,
): Promise<DocumentModel[]> => {
  const response: AxiosResponse = await http.patch(
    `/administrator/documents/${payload.id}`,
    {
      is_approved: payload.is_approved,
    },
  );

  return response?.data?.data;
};

export const createTheDocument = async (
  payload: CreateTheDocumentPayload,
): Promise<DocumentModel> => {
  const response: AxiosResponse = await http.post(
    `/administrator/documents`,
    payload,
  );

  return response?.data?.data;
};

export const getDocumentDetail = async (
  params: GetTheDocumentParams,
): Promise<DocumentModel> => {
  const response: AxiosResponse = await http.get(`/documents/${params.id}`);

  return response?.data?.data;
};

export const deleteDocument = async (
  params: GetTheDocumentParams,
): Promise<DocumentModel> => {
  const response: AxiosResponse = await http.delete(`/documents/${params.id}`);

  return response?.data?.data;
};
