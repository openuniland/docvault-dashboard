import classNames from "classnames/bind";
import { Box } from "@mui/material";

import { Banner } from "app/components/Banner";
import styles from "./HomeWrapper.module.scss";
import { SlickTrackSlider } from "app/components/Slider";

const cx = classNames.bind(styles);
export const HomeWrapper = () => {
  return (
    <div className={cx("container")}>
      <Box className={cx("boxBaner")}>
        <Banner />
        <SlickTrackSlider />
      </Box>
    </div>
  );
};
