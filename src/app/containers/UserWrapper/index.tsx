import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Button,
  Pagination,
  Typography,
} from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useMemo, useState } from "react";

import { useGetAllUsers } from "queries/user";
import { UsersTable } from "app/components/UserTable";
import styles from "./UserWrapper.module.scss";
import { DEFAULT_PAGINATION } from "utils/constants";

const cx = classNames.bind(styles);

export const UserWrapper = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: users,
    isLoading,
    isRefetching,
    refetch: refetchUsers,
  } = useGetAllUsers({ currentPage: currentPage - 1 });

  const handleToAddUserPage = useCallback(() => {
    navigate("/users/new");
  }, [navigate]);

  const handleRefreshUsers = useCallback(() => {
    refetchUsers();
  }, [refetchUsers]);

  const handlePagination = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    },
    [currentPage],
  );

  const pageCount = useMemo(() => {
    const total = users?.meta?.total || 0;
    const pageSize = DEFAULT_PAGINATION.pageSize;

    return Math.ceil(total / pageSize);
  }, [users?.meta?.total]);
  return (
    <div className={cx("container")}>
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

        <Box>
          <Button
            className={cx("addUserBtn")}
            variant="contained"
            sx={{ mr: 1 }}
            onClick={handleRefreshUsers}
          >
            Làm mới
          </Button>
          <Button
            className={cx("addUserBtn")}
            variant="contained"
            sx={{ mr: 1 }}
            onClick={handleToAddUserPage}
          >
            Thêm mới người dùng
          </Button>
        </Box>
      </Box>
      <UsersTable
        rows={users?.data}
        isLoading={isLoading}
        isRefetching={isRefetching}
        currentPage={currentPage}
      />

      <Pagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        page={currentPage}
        onChange={handlePagination}
      />
    </div>
  );
};
