import { useMutation } from "react-query";

import { updateTheSubject, addTheSubject } from "services/subject";
import { NewSubjectPayload, UpdateTheSubjectPayload } from "types/Subject";

export const useUpdateTheSubject = () =>
  useMutation((payload: UpdateTheSubjectPayload) => updateTheSubject(payload));

export const useAddTheSubject = () =>
  useMutation((payload: NewSubjectPayload) => addTheSubject(payload));
