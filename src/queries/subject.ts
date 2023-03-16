import { useQuery } from "react-query";
import { getAllSubjects, getAllSubjectsApproved } from "services/subject";
import { URLparams } from "types";

import { STALE_TIME } from "utils/constants";

export const useGetAllSubjects = (urlParams: URLparams) =>
  useQuery(
    ["get-all-subjects", urlParams?.currentPage, urlParams?.pageSize],
    () => getAllSubjects(urlParams),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );

export const useGetAllSubjectsApproved = () =>
  useQuery(["get-all-subjects-approved"], () => getAllSubjectsApproved(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
