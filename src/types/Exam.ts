import { Question } from "./Question";
import { Subject } from "./Subject";
import { User } from "./User";

export interface Exam {
  _id: string;
  author: User;
  question: Question;
  subject: Subject;
  title: string;
  semester: number;
  school_year: string;
  is_deleted: boolean;
  is_approved: boolean;
  created_at: string;
}

export interface ApproveTheExamPayload {
  id: string;
  is_approved: boolean;
}
