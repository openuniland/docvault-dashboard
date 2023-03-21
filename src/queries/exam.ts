import { useQuery } from "react-query";

import { getAllExams } from "services/exam";
import { URLparams } from "types";

import { STALE_TIME } from "utils/constants";

export const useGetAllExams = (urlParams: URLparams) =>
  useQuery(
    ["get-all-exams", urlParams?.currentPage, urlParams?.pageSize],
    () => getAllExams(urlParams),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );
