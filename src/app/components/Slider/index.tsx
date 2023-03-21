import classNames from "classnames/bind";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import gocover1 from "assets/images/gocover1.jpg";
import gocover2 from "assets/images/gocover2.jpg";
import gocover3 from "assets/images/gocover3.png";
import gocover4 from "assets/images/gocover4.png";
import styles from "./SlickTrackSlider.module.scss";

const cx = classNames.bind(styles);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const SlickTrackSlider = () => {
  return (
    <div className={cx("container")}>
      <Slider
        {...settings}
        className={cx("slider")}
        arrows={false}
        infinite
        autoplay
        dots={true}
        dotsClass={cx("dots")}
      >
        <div className={cx("sliderItem")}>
          <img src={gocover1} alt="go cover" />
        </div>
        <div className={cx("sliderItem")}>
          <img src={gocover2} alt="go cover" />
        </div>
        <div className={cx("sliderItem")}>
          <img src={gocover3} alt="go cover" />
        </div>
        <div className={cx("sliderItem")}>
          <img src={gocover4} alt="go cover" />
        </div>
      </Slider>
    </div>
  );
};
