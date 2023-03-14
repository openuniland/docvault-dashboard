import { Link } from "react-router-dom";
import { Box, Breadcrumbs, Button, TextField, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useState } from "react";

import { SubjectTable } from "app/components/SubjectTable";
import styles from "./SubjectWrapper.module.scss";
import { useGetAllSubjects } from "queries/subject";
import { useAddTheSubject, useApproveTheSubject } from "mutations/subject";
import { ModalCustomization } from "app/components/ModalCustomization";

const cx = classNames.bind(styles);

export const SubjectWrapper = () => {
  const [openPropup, setOpenPropup] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [responseError, setResponseError] = useState("");

  const {
    data: subjects,
    isLoading,
    refetch: refetchSubjects,
  } = useGetAllSubjects();

  const { mutateAsync } = useApproveTheSubject();
  const { mutateAsync: addNewSubject } = useAddTheSubject();

  const handleOpenPropup = useCallback(() => {
    setOpenPropup(true);
  }, [setOpenPropup]);

  const handleClosePropup = useCallback(() => {
    setOpenPropup(false);
  }, [setOpenPropup]);

  const handleApproveTheSubject = useCallback(
    (id: string, is_approved: boolean) => {
      (async () => {
        try {
          await mutateAsync({
            id,
            is_approved,
          });

          refetchSubjects();
        } catch (error: any) {
          console.log(error);
        }
      })();
    },
    [],
  );

  const handleAddNewSubject = useCallback(() => {
    (async () => {
      try {
        if (!subjectName) return;

        await addNewSubject({
          subject_name: subjectName,
        });

        setSubjectName("");
        handleClosePropup();
        refetchSubjects();
        setResponseError("");
      } catch (error: any) {
        setResponseError(error?.message);
        console.log(error);
      }
    })();
  }, [subjectName, responseError]);

  const handleChangeNewSubject = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSubjectName(event.target.value);
      setResponseError("");
    },
    [subjectName],
  );

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
        <Button
          className={cx("addUserBtn")}
          variant="contained"
          sx={{ mr: 1 }}
          onClick={handleOpenPropup}
        >
          Thêm môn học
        </Button>
      </Box>
      <SubjectTable
        rows={subjects}
        isLoading={isLoading}
        onApprove={handleApproveTheSubject}
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
