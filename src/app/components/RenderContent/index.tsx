import { Box, Paper } from "@mui/material";
import classNames from "classnames/bind";
import { DocumentModelContent } from "types/DocumentModel";

import styles from "./RenderContent.module.scss";

const cx = classNames.bind(styles);

interface Props {
  content?: DocumentModelContent[];
}
export const RenderContent = (props: Props) => {
  const { content = [] } = props;
  return (
    <Box className={cx("container")}>
      {content.map((item, index) => (
        <Paper elevation={3} key={index} className={cx("contentItem")}>
          <h4 className={cx("name")}>{item.name}</h4>
          {item.description && <p className={cx("desc")}>{item.description}</p>}
          {item.image && (
            <div className={cx("imgWrapper")}>
              <img src={item.image} alt={item.name} className={cx("img")} />
            </div>
          )}
          {item.file && (
            <a href={item.file} target="_blank" className={cx("file")}>
              {item.file}
            </a>
          )}
        </Paper>
      ))}
    </Box>
  );
};
