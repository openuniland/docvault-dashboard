export interface Subject {
  _id: string;
  subject_name: string;
  is_approved: boolean;
  updated_at?: Date;
}

export interface UpdateSubjectDto {
  subject_name?: string;
  is_approved?: boolean;
}
export interface UpdateTheSubjectPayload {
  id: string;
  subject?: UpdateSubjectDto;
}

export interface NewSubjectPayload {
  subject_name: string;
}
