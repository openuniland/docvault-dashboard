import classNames from "classnames/bind";
import { ButtonBase } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import styles from "./ButtonCustomization.module.scss";

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
}

export const ButtonCustomization = (props: Props) => {
  const { children, onClick, className, isLoading } = props;

  return (
    <ButtonBase onClick={onClick} className={cx("button", className)}>
      {isLoading ? <AutorenewIcon className={cx("loadingIcon")} /> : children}
    </ButtonBase>
  );
};
