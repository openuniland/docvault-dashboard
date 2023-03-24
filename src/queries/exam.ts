import { useQuery } from "react-query";

import { getAllExams, getDraftExam } from "services/exam";
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

export const useGetDraftExam = () =>
  useQuery(["get-draft-exam"], () => getDraftExam(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
