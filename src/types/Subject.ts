export interface Subject {
  _id: string;
  subject_name: string;
  is_approved: boolean;
  updated_at?: Date;
}

export interface ApproveTheSubjectPayload {
  id: string;
  is_approved: boolean;
}

export interface NewSubjectPayload {
  subject_name: string;
}
