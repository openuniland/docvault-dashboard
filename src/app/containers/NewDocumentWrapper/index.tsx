import { Link } from "react-router-dom";
import { useCallback } from "react";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./NewDocumentWrapper.module.scss";
import { DocumentForm } from "app/components/DocumentForm";
import { CreateDocumentModelForm } from "types/DocumentModel";
import { useCreateTheDocument } from "mutations/document";
import { enqueueSnackbar } from "notistack";

const cx = classNames.bind(styles);

export const NewDocumentWrapper = () => {
  const { mutateAsync } = useCreateTheDocument();

  const handleCreateNewDocument = useCallback(
    (data: CreateDocumentModelForm) => {
      (async () => {
        await mutateAsync({
          title: data.title,
          description: data.description,
          content: data.content,
          is_approved: data.is_approved,
          school_year: data.school_year,
          semester: Number(data.semester),
          subject: data.subject._id as any,
        });

        enqueueSnackbar("New document successfully created!", {
          variant: "success",
        });
      })();
    },
    [],
  );

  return (
    <div>
      <Box className={cx("boxHeader")}>
        <Breadcrumbs aria-label="breadcrumb" separator="◦">
          <Link className={cx("link")} to="/">
            Dashboard
          </Link>
          <Link className={cx("link")} to="/documents">
            Document
          </Link>
          <Typography className={cx("current")}>New Document</Typography>
        </Breadcrumbs>
      </Box>

      <DocumentForm onCreateNewDocument={handleCreateNewDocument} />
    </div>
  );
};
