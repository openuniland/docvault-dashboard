import { useCallback, useState, useMemo } from "react";
import classNames from "classnames/bind";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Badge,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

import styles from "./AppHeader.module.scss";
import vietnamFlag from "assets/images/vietnam.png";
import { getTokens } from "utils/storage";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";

const cx = classNames.bind(styles);

const tokens = getTokens();

export const AppHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = useMemo(() => {
    return Boolean(anchorEl);
  }, [anchorEl]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [anchorEl],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  const handleLogout = useCallback(() => {
    setAnchorEl(null);
    localStorage.clear();
    window.location.href = "/";
  }, [anchorEl]);

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
        <IconButton className={cx("avatar")} onClick={handleClick}>
          <img src={tokens?.userInfo?.avatar} alt="vietnam" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          classes={{ paper: cx("paper") }}
        >
          <MenuItem onClick={handleClose} className={cx("info")}>
            <h6 className={cx("fullname")}>{tokens?.userInfo?.name}</h6>
            <p className={cx("email")}>{tokens?.userInfo?.email}</p>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
