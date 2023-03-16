import { useQuery } from "react-query";

import { getAllDocument } from "services/document";
import { URLparams } from "types";

import { STALE_TIME } from "utils/constants";

export const useGetAllDocument = (urlParams: URLparams) =>
  useQuery(
    ["get-all-document", urlParams?.currentPage, urlParams?.pageSize],
    () => getAllDocument(urlParams),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );
