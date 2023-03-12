import { useQuery } from "react-query";
import { getAllUsers } from "services/user";

import { STALE_TIME } from "utils/constants";

export const useGetAllUsers = () =>
  useQuery(["get-all-users"], () => getAllUsers(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
