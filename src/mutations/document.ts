import { useMutation } from "react-query";

import {
  approveTheDocument,
  createTheDocument,
  deleteDocument,
} from "services/document";
import {
  ApproveTheDocumentPayload,
  CreateTheDocumentPayload,
  GetTheDocumentParams,
} from "types/DocumentModel";

export const useApproveTheDocument = () =>
  useMutation((payload: ApproveTheDocumentPayload) =>
    approveTheDocument(payload),
  );

export const useCreateTheDocument = () =>
  useMutation((payload: CreateTheDocumentPayload) =>
    createTheDocument(payload),
  );

export const useDeleteDocument = () =>
  useMutation((payload: GetTheDocumentParams) => deleteDocument(payload));
