import { AxiosResponse } from "axios";

import { NewQuestionPayload, Question } from "types/Question";
import http from "utils/api/http";

export const createNewQuestion = async (
  payload: NewQuestionPayload,
): Promise<Question> => {
  const response: AxiosResponse = await http.post(`/questions`, payload);

  return response?.data?.data;
};
