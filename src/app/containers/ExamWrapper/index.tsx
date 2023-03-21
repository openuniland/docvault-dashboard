import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Button,
  Pagination,
  Typography,
} from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useEffect, useMemo, useState } from "react";
import { enqueueSnackbar } from "notistack";

import styles from "./ExamWrapper.module.scss";
import { DEFAULT_PAGINATION } from "utils/constants";
import { ExamTable } from "app/components/ExamTable";
import { useGetAllExams } from "queries/exam";
import { useApproveTheExam } from "mutations/exam";

const cx = classNames.bind(styles);

export const ExamWrapper = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: exams,
    isLoading,
    refetch: refetchExams,
  } = useGetAllExams({ currentPage: currentPage - 1 });

  const { mutateAsync, isError } = useApproveTheExam();

  const handleApproveTheExam = useCallback(
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

          refetchExams();
        } catch (error: any) {
          console.log(error);
        }
      })();
    },
    [],
  );

  const handleRefreshDocument = useCallback(() => {
    refetchExams();
  }, [refetchExams]);

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
    const total = exams?.meta?.total || 0;
    const pageSize = DEFAULT_PAGINATION.pageSize;

    return Math.ceil(total / pageSize);
  }, [exams?.meta?.total]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(`Approval processing error!`, {
        variant: "error",
      });
    }
  }, [isError]);

  return (
    <div className={cx("container")}>
      <Box className={cx("boxHeader")}>
        <Breadcrumbs aria-label="breadcrumb" separator="◦">
          <Link className={cx("link")} to="/">
            Dashboard
          </Link>
          <Link className={cx("link")} to="/exams">
            Exam
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
            Thêm mới
          </Button>
        </Box>
      </Box>

      <ExamTable
        rows={exams?.data}
        isLoading={isLoading}
        onApprove={handleApproveTheExam}
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
