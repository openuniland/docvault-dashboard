import { Link } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Button,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useMemo, useState } from "react";

import { SubjectTable } from "app/components/SubjectTable";
import styles from "./SubjectWrapper.module.scss";
import { useGetAllSubjects } from "queries/subject";
import {
  useAddTheSubject,
  useDeleteSubject,
  useUpdateTheSubject,
} from "mutations/subject";
import { ModalCustomization } from "app/components/ModalCustomization";
import { DEFAULT_PAGINATION } from "utils/constants";
import { enqueueSnackbar } from "notistack";

const cx = classNames.bind(styles);

export const SubjectWrapper = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openPropup, setOpenPropup] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [responseError, setResponseError] = useState("");

  const {
    data: subjects,
    isLoading,
    refetch: refetchSubjects,
    isFetching,
  } = useGetAllSubjects({ currentPage: currentPage - 1 });

  const { mutateAsync } = useUpdateTheSubject();
  const { mutateAsync: addNewSubject } = useAddTheSubject();
  const { mutateAsync: deleteSubject, isLoading: isLoadingDeleteSubject } =
    useDeleteSubject();

  const handleOpenPropup = useCallback(() => {
    setOpenPropup(true);
  }, [setOpenPropup]);

  const handleClosePropup = useCallback(() => {
    setOpenPropup(false);
  }, [setOpenPropup]);

  const handleApproveTheSubject = useCallback(
    async (id: string, is_approved: boolean) => {
      try {
        await mutateAsync({
          id,
          subject: {
            is_approved: is_approved,
          },
        });

        refetchSubjects();
      } catch (error: any) {
        console.log(error);
      }
    },
    [],
  );

  const handleDeleteSubject = useCallback(async (id: string) => {
    try {
      await deleteSubject({
        id,
      });

      refetchSubjects();
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  const handleAddNewSubject = useCallback(async () => {
    try {
      if (!subjectName) return;

      await addNewSubject({
        subject_name: subjectName,
      });

      setSubjectName("");
      handleClosePropup();
      refetchSubjects();
      setResponseError("");
      enqueueSnackbar("New subject successfully created!", {
        variant: "success",
      });
    } catch (error: any) {
      setResponseError(error?.message);
      console.log(error);
    }
  }, [subjectName, responseError]);

  const handleChangeNewSubject = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSubjectName(event.target.value);
      setResponseError("");
    },
    [subjectName],
  );

  const handleRefreshSubjects = useCallback(() => {
    refetchSubjects();
  }, [refetchSubjects]);

  const handlePagination = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    },
    [currentPage],
  );

  const pageCount = useMemo(() => {
    const total = subjects?.meta?.total || 0;
    const pageSize = DEFAULT_PAGINATION.pageSize;

    return Math.ceil(total / pageSize);
  }, [subjects?.meta?.total]);

  return (
    <div className={cx("container")}>
      <Box className={cx("boxHeader")}>
        <Breadcrumbs aria-label="breadcrumb" separator="◦">
          <Link className={cx("link")} to="/">
            Dashboard
          </Link>
          <Link className={cx("link")} to="/subjects">
            Subject
          </Link>
          <Typography className={cx("current")}>List</Typography>
        </Breadcrumbs>

        <Box>
          <Button
            className={cx("addUserBtn")}
            variant="contained"
            sx={{ mr: 1 }}
            onClick={handleRefreshSubjects}
          >
            Làm mới
          </Button>
          <Button
            className={cx("addUserBtn")}
            variant="contained"
            sx={{ mr: 1 }}
            onClick={handleOpenPropup}
          >
            Thêm môn học
          </Button>
        </Box>
      </Box>

      <SubjectTable
        rows={subjects?.data}
        isLoading={isLoading}
        onApprove={handleApproveTheSubject}
        onRefetchSubjects={refetchSubjects}
        currentPage={currentPage}
        isFetching={isFetching}
        onDelete={handleDeleteSubject}
        isLoadingDeleteSubject={isLoadingDeleteSubject}
      />

      <Pagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        page={currentPage}
        onChange={handlePagination}
      />

      <ModalCustomization
        open={openPropup}
        handleAgree={handleAddNewSubject}
        handleCancel={handleClosePropup}
        actionDefault
        title="Add new subject"
      >
        <TextField
          placeholder="Subject name"
          className={cx("subjectNameInput")}
          value={subjectName}
          onChange={handleChangeNewSubject}
          error={!!responseError}
          helperText={responseError}
        />
      </ModalCustomization>
    </div>
  );
};
