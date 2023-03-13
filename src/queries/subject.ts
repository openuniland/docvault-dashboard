import { useQuery } from "react-query";
import { getAllSubjects } from "services/subject";

import { STALE_TIME } from "utils/constants";

export const useGetAllSubjects = () =>
  useQuery(["get-all-subjects"], () => getAllSubjects(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
