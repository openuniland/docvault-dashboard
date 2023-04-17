import { Link, useParams } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import classNames from "classnames/bind";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import styles from "./DocumentDetail.module.scss";
import { DocumentContent } from "app/components/DocumentContent";
import { useGetDocumentDetail } from "queries/document";
import { useCallback, useState } from "react";
import { useApproveTheDocument } from "mutations/document";
import { enqueueSnackbar } from "notistack";
import { ModalCustomization } from "app/components/ModalCustomization";

const cx = classNames.bind(styles);

export const DocumentDetail = () => {
  const [openPropup, setOpenPropup] = useState(false);

  const { documentId = "" } = useParams();
  const { data: documentDetail, refetch } = useGetDocumentDetail({
    id: documentId,
  });
  const { mutateAsync } = useApproveTheDocument();

  const handleRefetchGetDocumentDetail = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleApproveTheSubject = useCallback(async () => {
    try {
      await mutateAsync({
        id: documentId,
        is_approved: true,
      });

      enqueueSnackbar("Approval processing successful!", {
        variant: "success",
      });

      handleRefetchGetDocumentDetail();
      setOpenPropup(false);
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar("Something wrong!", {
        variant: "error",
      });
    }
  }, []);

  const handleOpenPropup = useCallback(() => {
    if (documentDetail?.is_approved) {
      enqueueSnackbar("This document has been approved!", {
        variant: "warning",
      });
      return;
    }

    setOpenPropup(true);
  }, [setOpenPropup, documentDetail?.is_approved]);

  const handleClosePropup = useCallback(() => {
    setOpenPropup(false);
  }, [setOpenPropup]);

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
          <Typography className={cx("current")}>Item</Typography>
        </Breadcrumbs>

        <Box>
          <Button
            className={cx("addUserBtn")}
            variant="contained"
            sx={{ mr: 1 }}
            onClick={handleRefetchGetDocumentDetail}
          >
            Làm mới
          </Button>
          <Button className={cx("addUserBtn")} variant="contained">
            Thêm tài liệu
          </Button>
        </Box>
      </Box>

      <Box className={cx("boxContent")}>
        <Box className={cx("approveWrapper")}>
          {documentDetail && documentDetail?.is_approved ? (
            <Typography className={cx("approveNoti", "approved")}>
              Bài viết đã được phê duyệt
            </Typography>
          ) : (
            <Typography className={cx("approveNoti")}>
              Bài viết đang chờ phê duyệt
            </Typography>
          )}

          <Box className={cx("approveAction")}>
            <Tooltip title="Approve">
              <IconButton onClick={handleOpenPropup}>
                <CheckCircleOutlineIcon className={cx("approve")} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Disapprove">
              <IconButton>
                <RemoveCircleIcon className={cx("disapprove")} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <DocumentContent document={documentDetail} />
      </Box>

      <ModalCustomization
        open={openPropup}
        handleAgree={handleApproveTheSubject}
        handleCancel={handleClosePropup}
        actionDefault
        title="Bạn có chắc chắn muốn phê duyệt bài viết này?"
        okBtnText="Approve"
      />
    </div>
  );
};
