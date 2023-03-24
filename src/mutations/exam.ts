import { useMutation } from "react-query";
import { approveTheExam, createNewExam } from "services/exam";
import { ApproveTheExamPayload } from "types/Exam";

export const useApproveTheExam = () =>
  useMutation((payload: ApproveTheExamPayload) => approveTheExam(payload));

export const useCreateNewExam = () => useMutation(() => createNewExam());
