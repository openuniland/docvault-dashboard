import { Box, IconButton, Paper } from "@mui/material";
import classNames from "classnames/bind";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { DocumentModelContent } from "types/DocumentModel";
import styles from "./RenderContent.module.scss";
import { useCallback } from "react";

const cx = classNames.bind(styles);

interface Props {
  content?: DocumentModelContent[];
  onDelete?: (index: number) => void;
}
export const RenderContent = (props: Props) => {
  const { content = [], onDelete = () => {} } = props;

  const handleDelete = useCallback(
    (index: number) => () => {
      onDelete(index);
    },
    [onDelete],
  );
  return (
    <Box className={cx("container")}>
      {content.map((item, index) => (
        <Paper elevation={3} key={index} className={cx("contentItem")}>
          <IconButton
            className={cx("iconWrapper")}
            onClick={handleDelete(index)}
          >
            <DeleteForeverIcon className={cx("deleteIcon")} />
          </IconButton>
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
