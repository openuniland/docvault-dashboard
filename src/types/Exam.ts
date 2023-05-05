import { Question } from "./Question";
import { Subject } from "./Subject";
import { User } from "./User";

export interface Exam {
  _id: string;
  author: User;
  questions: Question[];
  subject: Subject;
  title: string;
  semester: number;
  school_year: string;
  is_draft: boolean;
  is_deleted: boolean;
  is_approved: boolean;
  created_at: string;
}

export interface ApproveTheExamPayload {
  id: string;
  is_approved: boolean;
}

export interface CreateExamModelForm {
  title: string;
  description: string;
  subject: Subject;
  semester: string;
  school_year: string;
  is_approved: boolean;
  is_draft: boolean;
}

export interface RequestUpdateExam {
  title: string;
  description: string;
  subject: string;
  semester: string;
  school_year: string;
  is_approved: boolean;
  is_draft: boolean;
}

export interface UpdateExamByAdminPayload {
  examId: string;
  requestUpdateExamPayload: RequestUpdateExam;
}

export interface RequestUpdateExamPayload {
  examId: string;
  requestUpdateExamPayload: CreateExamModelForm;
}

export interface DeleteExamParams {
  id: string;
}
