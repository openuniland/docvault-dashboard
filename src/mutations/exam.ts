import { useMutation } from "react-query";
import {
  approveTheExam,
  createNewExam,
  updateExamByAdmin,
} from "services/exam";
import { ApproveTheExamPayload, UpdateExamByAdminPayload } from "types/Exam";

export const useApproveTheExam = () =>
  useMutation((payload: ApproveTheExamPayload) => approveTheExam(payload));

export const useUpdateExamByAdmin = () =>
  useMutation((payload: UpdateExamByAdminPayload) => {
    const { examId, requestUpdateExamPayload } = payload;
    return updateExamByAdmin(requestUpdateExamPayload, examId);
  });

export const useCreateNewExam = () => useMutation(() => createNewExam());
