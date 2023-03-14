import { useQuery } from "react-query";

import { getAllDocument } from "services/document";

import { STALE_TIME } from "utils/constants";

export const useGetAllDocument = () =>
  useQuery(["get-all-document"], () => getAllDocument(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
