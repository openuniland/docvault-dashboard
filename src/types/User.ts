export interface User {
  _id: string;
  email: string;
  fullname: string;
  avatar: string;
  is_blocked: boolean;
  roles: string;
  is_show_info: boolean;
  nickname: string;
  created_at: string;
  updated_at: string;
}

export interface NewUserPayload {
  email: string;
  role?: string;
  is_deleted?: boolean;
}
