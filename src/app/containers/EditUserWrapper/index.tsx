import { Link, useParams } from "react-router-dom";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./EditUserWrapper.module.scss";
import { UserForm } from "app/components/UserForm";
import { useCallback } from "react";
import { useGetAUserInfo } from "queries/user";
import { useUpdateUser } from "mutations/user";
import { NewUserPayload } from "types/User";
import { enqueueSnackbar } from "notistack";

const cx = classNames.bind(styles);

export const EditUserWrapper = () => {
  const { userId = "" } = useParams();

  const { mutateAsync } = useUpdateUser();

  const handleCreateNewUser = useCallback(async (user: NewUserPayload) => {
    try {
      await mutateAsync({ id: userId, userInfo: user });

      enqueueSnackbar("User has successfully updated!", {
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something wrong!", {
        variant: "error",
      });
    }
  }, []);

  const { data: userInfo } = useGetAUserInfo({ id: userId || "" });
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
          <Typography className={cx("current")}>Edit User</Typography>
        </Breadcrumbs>
      </Box>

      <UserForm
        onAddUser={handleCreateNewUser}
        isUpdateMode
        userInfo={userInfo}
      />
    </div>
  );
};
