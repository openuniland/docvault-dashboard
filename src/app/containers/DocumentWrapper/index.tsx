import { Link } from "react-router-dom";
import { Box, Breadcrumbs, Button, TextField, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useState } from "react";

import styles from "./DocumentWrapper.module.scss";
import { useAddTheSubject } from "mutations/subject";
import { ModalCustomization } from "app/components/ModalCustomization";
import { DocumentTable } from "app/components/DocumentTable";
import { useGetAllDocument } from "queries/document";
import { useApproveTheDocument } from "mutations/document";

const cx = classNames.bind(styles);

export const DocumentWrapper = () => {
  const [openPropup, setOpenPropup] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [responseError, setResponseError] = useState("");

  const {
    data: documents,
    isLoading,
    refetch: refetchDocuments,
  } = useGetAllDocument();

  const { mutateAsync } = useApproveTheDocument();
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

          refetchDocuments();
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
        refetchDocuments();
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

  const handleRefreshDocument = useCallback(() => {
    refetchDocuments();
  }, [refetchDocuments]);

  return (
    <div className={cx("container")}>
      <Box className={cx("boxHeader")}>
        <Breadcrumbs aria-label="breadcrumb" separator="◦">
          <Link className={cx("link")} to="/">
            Dashboard
          </Link>
          <Link className={cx("link")} to="/subjects">
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
            sx={{ mr: 1 }}
            onClick={handleOpenPropup}
          >
            Thêm môn học
          </Button>
        </Box>
      </Box>
      <DocumentTable
        rows={documents}
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
