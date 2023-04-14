import classNames from "classnames/bind";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import HomeIcon from "@mui/icons-material/Home";
import TimerIcon from "@mui/icons-material/Timer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Link, useLocation } from "react-router-dom";

import styles from "./Sidebar.module.scss";
import logo from "assets/images/logo.png";
import { getTokens } from "utils/storage";
import { ButtonCustomization } from "../ButtonCustomization";

const cx = classNames.bind(styles);

const tokens = getTokens();

const menuList = [
  {
    path: "/",
    name: "Trang chủ",
    icon: <HomeIcon />,
    role: ["ADMIN", "APPROVER"],
  },
  {
    path: "/users",
    name: "Người dùng",
    icon: <PeopleIcon />,
    role: ["ADMIN"],
  },
  {
    path: "/subjects",
    name: "Môn học",
    icon: <MenuBookIcon />,
    role: ["ADMIN", "APPROVER"],
  },
  {
    path: "/exams",
    name: "Kiểm tra",
    icon: <TimerIcon />,
    role: ["ADMIN", "APPROVER"],
  },
  {
    path: "/documents",
    name: "Tài liệu",
    icon: <AssignmentIcon />,
    role: ["ADMIN", "APPROVER"],
  },
  {
    path: "/favorites",
    name: "Yêu thích",
    icon: <FavoriteIcon />,
    role: [""],
  },
];

export const Sidebar = () => {
  const location = useLocation();
  return (
    <div className={cx("container")}>
      <div className={cx("sidebarHeader")}>
        <ButtonCustomization className={cx("arrow")}>
          <ArrowCircleLeftIcon className={cx("icon")} />
        </ButtonCustomization>

        <div className={cx("logoWrapper")}>
          <img src={logo} alt="logo" className={cx("logo")} />
        </div>

        <div className={cx("card")}>
          <div className={cx("avatarWrapper")}>
            <img
              className={cx("avatar")}
              src={tokens?.userInfo?.avatar}
              alt="avatar"
            />
          </div>
          <div className={cx("infoWrapper")}>
            <h6 className={cx("fullname")}>{tokens?.userInfo?.name}</h6>
            <p className={cx("email")}>{tokens?.userInfo?.email}</p>
          </div>
        </div>
      </div>

      <div className={cx("menuList")}>
        {menuList.map(menu => {
          if (!menu.role.includes(tokens?.userInfo?.role)) return null;
          return (
            <Link
              className={cx("menu", {
                active: location.pathname === menu.path,
              })}
              to={menu.path}
              key={menu.name}
            >
              <span>{menu.icon}</span>
              <strong>{menu.name}</strong>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
