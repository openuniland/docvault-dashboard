import { useQuery } from "react-query";
import { getAUserInfo, getAllUsers } from "services/user";
import { URLparams } from "types";
import { GetUserInfoPayload } from "types/User";

import { STALE_TIME } from "utils/constants";

export const useGetAllUsers = (urlParams: URLparams) =>
  useQuery(
    ["get-all-users", urlParams?.currentPage, urlParams?.pageSize],
    () => getAllUsers(urlParams),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );

export const useGetAUserInfo = (payload: GetUserInfoPayload) =>
  useQuery(["get-a-userinfo", payload.id], () => getAUserInfo(payload), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
