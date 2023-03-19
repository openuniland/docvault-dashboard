import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Button,
  Pagination,
  Typography,
} from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useMemo, useState } from "react";

import styles from "./DocumentWrapper.module.scss";
import { DocumentTable } from "app/components/DocumentTable";
import { useGetAllDocument } from "queries/document";
import { useApproveTheDocument } from "mutations/document";
import { DEFAULT_PAGINATION } from "utils/constants";
import { enqueueSnackbar } from "notistack";

const cx = classNames.bind(styles);

export const DocumentWrapper = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: documents,
    isLoading,
    refetch: refetchDocuments,
  } = useGetAllDocument({ currentPage: currentPage - 1 });

  const { mutateAsync } = useApproveTheDocument();

  const handleApproveTheSubject = useCallback(
    (id: string, is_approved: boolean) => {
      (async () => {
        try {
          await mutateAsync({
            id,
            is_approved,
          });

          enqueueSnackbar("Approval processing successful!", {
            variant: "success",
          });

          refetchDocuments();
        } catch (error: any) {
          console.log(error);
        }
      })();
    },
    [],
  );

  const handleRefreshDocument = useCallback(() => {
    refetchDocuments();
  }, [refetchDocuments]);

  const handleRedirectToCreateDocument = useCallback(() => {
    navigate(`/documents/new`);
  }, [navigate]);

  const handlePagination = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    },
    [currentPage],
  );

  const pageCount = useMemo(() => {
    const total = documents?.meta?.total || 0;
    const pageSize = DEFAULT_PAGINATION.pageSize;

    return Math.ceil(total / pageSize);
  }, [documents?.meta?.total]);

  return (
    <div className={cx("container")}>
      <Box className={cx("boxHeader")}>
        <Breadcrumbs aria-label="breadcrumb" separator="◦">
          <Link className={cx("link")} to="/">
            Dashboard
          </Link>
          <Link className={cx("link")} to="/documents">
            Document
          </Link>
          <Typography className={cx("current")}>List</Typography>
        </Breadcrumbs>
        <Box>
          <Button
            className={cx("addUserBtn")}
            variant="contained"
            sx={{ mr: 1 }}
            onClick={handleRefreshDocument}
          >
            Làm mới
          </Button>
          <Button
            className={cx("addUserBtn")}
            variant="contained"
            onClick={handleRedirectToCreateDocument}
          >
            Thêm tài liệu
          </Button>
        </Box>
      </Box>

      <DocumentTable
        rows={documents?.data}
        isLoading={isLoading}
        onApprove={handleApproveTheSubject}
      />

      <Pagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        page={currentPage}
        onChange={handlePagination}
      />
    </div>
  );
};
