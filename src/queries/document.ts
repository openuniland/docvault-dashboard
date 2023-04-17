import { useQuery } from "react-query";

import { getDocumentDetail, getAllDocument } from "services/document";
import { URLparams } from "types";
import { GetTheDocumentParams } from "types/DocumentModel";

import { STALE_TIME } from "utils/constants";

export const useGetAllDocument = (urlParams: URLparams) =>
  useQuery(
    ["get-all-document", urlParams?.currentPage, urlParams?.pageSize],
    () => getAllDocument(urlParams),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );

export const useGetDocumentDetail = (params: GetTheDocumentParams) =>
  useQuery(["get-a-document", params.id], () => getDocumentDetail(params), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
