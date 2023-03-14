import { useMutation } from "react-query";

import { approveTheDocument } from "services/document";
import { ApproveTheDocumentPayload } from "types/DocumentModel";

export const useApproveTheDocument = () =>
  useMutation((payload: ApproveTheDocumentPayload) =>
    approveTheDocument(payload),
  );
