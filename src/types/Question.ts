import { Answer } from "./Answer";
import { Subject } from "./Subject";

export interface Question {
  _id: string;
  content: string;
  subject: Subject;
  correct_answer: Answer;
  answers: Answer[];
  accuracy: "high" | "medium" | "low";
  is_essay: boolean;
  is_approved: boolean;
}

export interface NewQuestionPayload {
  content: string;
  exam_id?: string;
  correct_answer?: Answer;
  image?: string;
  answers: Answer[];
  accuracy: string;
  is_essay: boolean;
  is_approved: boolean;
}
