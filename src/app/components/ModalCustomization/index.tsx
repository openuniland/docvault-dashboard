import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import classNames from "classnames/bind";

import styles from "./ModalCustomization.module.scss";

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
  open: boolean;
  handleAgree?: () => void;
  handleCancel?: () => void;
  timeout?: number;
  title?: string;
  actionDefault?: boolean;
  contentText?: string;
  loading?: boolean;
  className?: string;
}

export const ModalCustomization = (props: Props) => {
  const {
    children,
    open,
    handleAgree,
    handleCancel,
    timeout = 500,
    title,
    actionDefault,
    contentText,
    loading,
    className,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      BackdropProps={{
        timeout,
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: cx("container", className) }}
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}

      <DialogContent>
        {contentText && <DialogContentText>{contentText}</DialogContentText>}

        {children}
      </DialogContent>

      {actionDefault && (
        <DialogActions>
          <Button size="medium" onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <LoadingButton
            size="medium"
            onClick={handleAgree}
            loading={loading}
            variant="contained"
          >
            Agree
          </LoadingButton>
        </DialogActions>
      )}
    </Dialog>
  );
};
