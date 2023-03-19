import { useMutation } from "react-query";

import { approveTheDocument, createTheDocument } from "services/document";
import {
  ApproveTheDocumentPayload,
  CreateTheDocumentPayload,
} from "types/DocumentModel";

export const useApproveTheDocument = () =>
  useMutation((payload: ApproveTheDocumentPayload) =>
    approveTheDocument(payload),
  );

export const useCreateTheDocument = () =>
  useMutation((payload: CreateTheDocumentPayload) =>
    createTheDocument(payload),
  );
