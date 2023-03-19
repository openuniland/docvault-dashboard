import classNames from "classnames/bind";

import styles from "./Banner.module.scss";
import schedule from "assets/images/schedule.png";

const cx = classNames.bind(styles);

export const Banner = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <h1 className={cx("title")}>Welcome to the Revise Dashboard</h1>
        <p className={cx("description")}>
          Perfect your programming skills with our workout management page
          designed for developers!
        </p>
      </div>

      <div className={cx("image")}>
        <img src={schedule} alt="Schedule" />
      </div>
    </div>
  );
};
