import classNames from "classnames/bind";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, IconButton } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

import styles from "./AppHeader.module.scss";
import vietnamFlag from "assets/images/vietnam.png";
import { getTokens } from "utils/storage";

const cx = classNames.bind(styles);

const tokens = getTokens();

export const AppHeader = () => {
  return (
    <div className={cx("container")}>
      <IconButton className={cx("searchWrapper")}>
        <SearchIcon />
      </IconButton>

      <div className={cx("action")}>
        <IconButton className={cx("actionItem")}>
          <img src={vietnamFlag} alt="vietnam" className={cx("flag")} />
        </IconButton>
        <IconButton className={cx("actionItem")}>
          <Badge color="success" badgeContent={9}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton className={cx("actionItem")}>
          <PeopleIcon />
        </IconButton>
        <div className={cx("avatar")}>
          <img src={tokens?.userInfo?.avatar} alt="vietnam" />
        </div>
      </div>
    </div>
  );
};
