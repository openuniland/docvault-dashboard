import { useQuery } from "react-query";
import { getAllUsers } from "services/user";
import { URLparams } from "types";

import { STALE_TIME } from "utils/constants";

export const useGetAllUsers = (urlParams: URLparams) =>
  useQuery(
    ["get-all-users", urlParams?.currentPage, urlParams?.pageSize],
    () => getAllUsers(urlParams),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );
