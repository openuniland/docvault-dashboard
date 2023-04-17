import classNames from "classnames/bind";

import styles from "./DocumentContent.module.scss";
import { DocumentModel } from "types/DocumentModel";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

interface Props {
  document?: DocumentModel;
}

export const DocumentContent = (props: Props) => {
  const { document } = props;

  return (
    <div className={cx("container")}>
      <div>
        <div className={cx("descWrapper")}>
          <Typography className={cx("titleName")} component="p">
            Người đăng:
          </Typography>
          <Typography className={cx("highlight")} component="strong">
            {document?.author?.fullname || document?.author?.nickname}
          </Typography>
        </div>
        <div className={cx("descWrapper")}>
          <Typography className={cx("titleName")} component="p">
            Môn học:
          </Typography>
          <Link to={`/documents`} className={cx("highlight")}>
            {document?.subject?.subject_name}
          </Link>
        </div>
        <div className={cx("descWrapper")}>
          <Typography className={cx("schoolYear")} component="strong">
            {`Học kỳ ${document?.semester} năm học ${document?.school_year}`}
          </Typography>
        </div>
      </div>

      <div className={cx("contentWrapper")}>
        {document?.content?.map((item, index) => (
          <div className={cx("content")} key={index}>
            <Typography className={cx("title")} component="h3">
              {item?.name}
            </Typography>
            <Typography className={cx("desc")} component="p">
              {item?.description}
            </Typography>
            {item?.image && (
              <div className={cx("imageWrapper")}>
                <img
                  src={item?.image}
                  alt={item?.name}
                  className={cx("image")}
                />
              </div>
            )}

            <a className={cx("file")} href={item?.file} target="_blank">
              {item?.file}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
