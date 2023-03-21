import { Link } from "react-router-dom";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./AddUserWrapper.module.scss";
import { UserForm } from "app/components/UserForm";
import { useCallback } from "react";
import { useCreateNewUser } from "mutations/user";
import { enqueueSnackbar } from "notistack";

const cx = classNames.bind(styles);

export const AddUserWrapper = () => {
  const { mutateAsync } = useCreateNewUser();

  const handleCreateNewUser = useCallback((user: any) => {
    (async () => {
      try {
        await mutateAsync(user);

        enqueueSnackbar("Create new user successfully!", {
          variant: "success",
        });
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Something wrong!", {
          variant: "error",
        });
      }
    })();
  }, []);

  return (
    <div>
      <Box className={cx("boxHeader")}>
        <Breadcrumbs aria-label="breadcrumb" separator="◦">
          <Link className={cx("link")} to="/">
            Dashboard
          </Link>
          <Link className={cx("link")} to="/users">
            User
          </Link>
          <Typography className={cx("current")}>New User</Typography>
        </Breadcrumbs>
      </Box>

      <UserForm onAddUser={handleCreateNewUser} />
    </div>
  );
};
