import { useMutation } from "react-query";

import { createNewUser, updateUser } from "services/user";
import { NewUserPayload, UpdateUserPayload } from "types/User";

export const useCreateNewUser = () =>
  useMutation((payload: NewUserPayload) => createNewUser(payload));

export const useUpdateUser = () =>
  useMutation((payload: UpdateUserPayload) => updateUser(payload));
