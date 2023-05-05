import { useMutation } from "react-query";
import {
  approveTheExam,
  createNewExam,
  deleteExam,
  updateExamByAdmin,
} from "services/exam";
import {
  ApproveTheExamPayload,
  DeleteExamParams,
  UpdateExamByAdminPayload,
} from "types/Exam";

export const useApproveTheExam = () =>
  useMutation((payload: ApproveTheExamPayload) => approveTheExam(payload));

export const useUpdateExamByAdmin = () =>
  useMutation((payload: UpdateExamByAdminPayload) => {
    const { examId, requestUpdateExamPayload } = payload;
    return updateExamByAdmin(requestUpdateExamPayload, examId);
  });

export const useCreateNewExam = () => useMutation(() => createNewExam());

export const useDeleteExam = () =>
  useMutation((payload: DeleteExamParams) => {
    return deleteExam(payload);
  });
