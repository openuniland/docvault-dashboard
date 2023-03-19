export interface CredentialType {
  clientId: string;
  credential: string;
  select_by: string;
}

export interface LoginPayload {
  googleToken: string;
}
