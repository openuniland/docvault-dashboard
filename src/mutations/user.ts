import { useMutation } from "react-query";

import { createNewUser } from "services/user";
import { NewUserPayload } from "types/User";

export const useCreateNewUser = () =>
  useMutation((payload: NewUserPayload) => createNewUser(payload));
