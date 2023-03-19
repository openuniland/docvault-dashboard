import { Link } from "react-router-dom";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./EditUserWrapper.module.scss";
import { UserForm } from "app/components/UserForm";
import { useCallback } from "react";

const cx = classNames.bind(styles);

export const EditUserWrapper = () => {
  const handleCreateNewUser = useCallback((user: any) => {
    console.log(user);
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
