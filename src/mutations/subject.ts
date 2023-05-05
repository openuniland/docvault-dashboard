import { useMutation } from "react-query";

import {
  updateTheSubject,
  addTheSubject,
  deleteSubject,
} from "services/subject";
import {
  DeleteSubjectParams,
  NewSubjectPayload,
  UpdateTheSubjectPayload,
} from "types/Subject";

export const useUpdateTheSubject = () =>
  useMutation((payload: UpdateTheSubjectPayload) => updateTheSubject(payload));

export const useAddTheSubject = () =>
  useMutation((payload: NewSubjectPayload) => addTheSubject(payload));

export const useDeleteSubject = () =>
  useMutation((payload: DeleteSubjectParams) => deleteSubject(payload));
