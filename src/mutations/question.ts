import { useMutation } from "react-query";
import { createNewQuestion } from "services/question";
import { NewQuestionPayload } from "types/Question";

export const useCreateNewQuestion = () =>
  useMutation((payload: NewQuestionPayload) => createNewQuestion(payload));
