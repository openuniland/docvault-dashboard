import { useMutation } from "react-query";

import { login } from "services/auth";
import { LoginPayload } from "types/Authentication";

export const useLogin = () =>
  useMutation((payload: LoginPayload) => login(payload.googleToken));
