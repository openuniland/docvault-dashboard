import { Link, useNavigate } from "react-router-dom";
import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { useCallback } from "react";

import { useGetAllUsers } from "queries/user";
import { UsersTable } from "app/components/UserTable";
import styles from "./UserWrapper.module.scss";

const cx = classNames.bind(styles);

export const UserWrapper = () => {
  const navigate = useNavigate();
  const { data: users } = useGetAllUsers();

  const handleToAddUserPage = useCallback(() => {
    navigate("/users/new");
  }, [navigate]);
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
          <Typography className={cx("current")}>List</Typography>
        </Breadcrumbs>
        <Button
          className={cx("addUserBtn")}
          variant="contained"
          sx={{ mr: 1 }}
          onClick={handleToAddUserPage}
        >
          Thêm mới người dùng
        </Button>
      </Box>
      <UsersTable rows={users} />
    </div>
  );
};
