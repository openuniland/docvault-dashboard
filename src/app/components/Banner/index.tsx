import classNames from "classnames/bind";

import styles from "./Banner.module.scss";
import schedule from "assets/images/schedule.png";
import { Grid } from "@mui/material";

const cx = classNames.bind(styles);

export const Banner = () => {
  return (
    <div className={cx("container")}>
      <Grid container spacing={1} className={cx("row")}>
        <Grid className={cx("content")} item xs={7}>
          <h1 className={cx("title")}>Welcome to the Revise Dashboard</h1>
          <p className={cx("description")}>
            Perfect your programming skills with our workout management page
            designed for developers!
          </p>
        </Grid>
        <Grid className={cx("image")} item xs={5}>
          <img src={schedule} alt="Schedule" />
        </Grid>
      </Grid>
    </div>
  );
};
