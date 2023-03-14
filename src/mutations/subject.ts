import { useMutation } from "react-query";

import { addTheSubject, approveTheSubject } from "services/subject";
import { ApproveTheSubjectPayload, NewSubjectPayload } from "types/Subject";

export const useApproveTheSubject = () =>
  useMutation((payload: ApproveTheSubjectPayload) =>
    approveTheSubject(payload),
  );

export const useAddTheSubject = () =>
  useMutation((payload: NewSubjectPayload) => addTheSubject(payload));
