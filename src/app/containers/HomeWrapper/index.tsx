import classNames from "classnames/bind";
import { Box, Grid } from "@mui/material";

import { Banner } from "app/components/Banner";
import styles from "./HomeWrapper.module.scss";
import { SlickTrackSlider } from "app/components/Slider";

const cx = classNames.bind(styles);
export const HomeWrapper = () => {
  return (
    <div className={cx("container")}>
      <Box className={cx("box")}>
        <Grid className={cx("gridContainer")} container spacing={2}>
          <Grid item xs={8}>
            <Banner />
          </Grid>
          <Grid item xs={4}>
            <SlickTrackSlider />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
