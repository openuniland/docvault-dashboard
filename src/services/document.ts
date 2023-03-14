import { AxiosResponse } from "axios";

import { ApproveTheDocumentPayload, DocumentModel } from "types/DocumentModel";
import {} from "types/Subject";

import http from "utils/api/http";

export const getAllDocument = async (): Promise<DocumentModel[]> => {
  const response: AxiosResponse = await http.get("/administrator/documents");

  return response?.data?.data;
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
