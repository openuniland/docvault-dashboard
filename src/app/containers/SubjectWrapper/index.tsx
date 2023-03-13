import { Link, useNavigate } from "react-router-dom";
import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { useCallback } from "react";

import { SubjectTable } from "app/components/SubjectTable";
import styles from "./SubjectWrapper.module.scss";
import { useGetAllSubjects } from "queries/subject";

const cx = classNames.bind(styles);

export const SubjectWrapper = () => {
  const navigate = useNavigate();
  const { data: subjects, isLoading } = useGetAllSubjects();

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
          <Link className={cx("link")} to="/subjects">
            Subject
          </Link>
          <Typography className={cx("current")}>List</Typography>
        </Breadcrumbs>
        <Button
          className={cx("addUserBtn")}
          variant="contained"
          sx={{ mr: 1 }}
          onClick={handleToAddUserPage}
        >
          Thêm môn học
        </Button>
      </Box>
      <SubjectTable rows={subjects} isLoading={isLoading} />
    </div>
  );
};
