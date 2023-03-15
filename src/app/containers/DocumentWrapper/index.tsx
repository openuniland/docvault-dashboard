import { Link, useNavigate } from "react-router-dom";
import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { useCallback } from "react";

import styles from "./DocumentWrapper.module.scss";
import { DocumentTable } from "app/components/DocumentTable";
import { useGetAllDocument } from "queries/document";
import { useApproveTheDocument } from "mutations/document";

const cx = classNames.bind(styles);

export const DocumentWrapper = () => {
  const navigate = useNavigate();

  const {
    data: documents,
    isLoading,
    refetch: refetchDocuments,
  } = useGetAllDocument();

  const { mutateAsync } = useApproveTheDocument();

  const handleApproveTheSubject = useCallback(
    (id: string, is_approved: boolean) => {
      (async () => {
        try {
          await mutateAsync({
            id,
            is_approved,
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
        rows={documents}
        isLoading={isLoading}
        onApprove={handleApproveTheSubject}
      />
    </div>
  );
};
