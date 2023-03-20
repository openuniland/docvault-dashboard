import classNames from "classnames/bind";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    <Slider
      {...settings}
      className={cx("container")}
      arrows={false}
      autoplay
      infinite
      dots={false}
    >
      <div className={cx("sliderItem")}>
        <img
          src="https://ewr1.vultrobjects.com/lmsbzzbx/blog/en0jcj4482737.png"
          alt=""
        />
      </div>
      <div className={cx("sliderItem")}>
        <img
          src="https://i.pinimg.com/originals/2a/8d/e7/2a8de758a5297cec8e119b04c5b3dcd8.jpg"
          alt=""
        />
      </div>
    </Slider>
  );
};
