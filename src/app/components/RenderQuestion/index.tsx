import {
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import classNames from "classnames/bind";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { memo, useCallback } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import styles from "./RenderQuestion.module.scss";
import { NewQuestionPayload } from "types/Question";

const cx = classNames.bind(styles);

interface Props {
  questions?: NewQuestionPayload[];
  onDelete?: (index: number) => void;
}
const RenderQuestion = (props: Props) => {
  const { questions = [], onDelete = () => {} } = props;

  const handleDelete = useCallback(
    (index: number) => () => {
      onDelete(index);
    },
    [onDelete],
  );
  return (
    <Box className={cx("container")}>
      {questions.map((item, index) => (
        <Paper elevation={3} key={index} className={cx("question")}>
          <div className={cx("itemHeader")}>
            <IconButton className={cx("index")}>{index + 1}</IconButton>
            <div className={cx("itemHeaderAction")}>
              <div className={cx("accuracyWrapper")}>
                <p className={cx("accuracyText")}>Độ chính xác</p>
                <CheckCircleIcon
                  className={cx({
                    high: item.accuracy === "high",
                    medium: item.accuracy === "medium",
                    low: item.accuracy === "low",
                  })}
                />
              </div>
              <IconButton
                className={cx("iconDeleteWrapper")}
                onClick={handleDelete(index)}
              >
                <HighlightOffIcon className={cx("deleteIcon")} />
              </IconButton>
            </div>
          </div>

          <h3 className={cx("title")}>{item.content}</h3>
          {item.image && (
            <div className={cx("imgWrapper")}>
              <img src={item.image} alt="" />
            </div>
          )}

          <RadioGroup value={item.correct_answer?.id}>
            {item.answers?.map(answer => (
              <FormControlLabel
                key={answer?.id}
                value={answer.id}
                control={<Radio />}
                label={answer?.content}
              />
            ))}
          </RadioGroup>
        </Paper>
      ))}
    </Box>
  );
};

export default memo(RenderQuestion);
