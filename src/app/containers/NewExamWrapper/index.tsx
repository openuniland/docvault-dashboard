import { Link } from "react-router-dom";
import { useCallback, useLayoutEffect, useState } from "react";
import { Box, Breadcrumbs, Skeleton, Typography } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./NewExamWrapper.module.scss";
import { enqueueSnackbar } from "notistack";
import { useCreateNewExam, useUpdateExamByAdmin } from "mutations/exam";
import { useGetDraftExam } from "queries/exam";
import { ExamForm } from "app/components/ExamForm";
import { Exam, RequestUpdateExamPayload } from "types/Exam";

const cx = classNames.bind(styles);

export const NewExamWrapper = () => {
  const [exam, setExam] = useState<Exam>();

  const { data: draftExam, isLoading } = useGetDraftExam();
  const { mutateAsync } = useCreateNewExam();
  const { mutateAsync: mutateAsyncUpdateExam } = useUpdateExamByAdmin();

  const handleGenerateDraftExam = useCallback(async () => {
    const data = await mutateAsync();

    setExam(data);
    enqueueSnackbar(`New exam id (${data._id}) successfully created!`, {
      variant: "success",
    });
  }, [setExam]);

  const handleSubmitExam = useCallback(
    async (data: RequestUpdateExamPayload) => {
      try {
        await mutateAsyncUpdateExam({
          requestUpdateExamPayload: {
            ...data.requestUpdateExamPayload,
            subject: data.requestUpdateExamPayload?.subject._id,
            is_draft: false,
          },
          examId: data.examId,
        });

        enqueueSnackbar(`New exam successfully updated!`, {
          variant: "success",
        });

        setExam(undefined);
      } catch (error) {
        enqueueSnackbar(`Update exam failed!`, {
          variant: "error",
        });
      }
    },
    [],
  );

  useLayoutEffect(() => {
    if (draftExam) {
      setExam(draftExam);
    }
  }, [draftExam?._id]);

  return (
    <div>
      <Box className={cx("boxHeader")}>
        <Breadcrumbs aria-label="breadcrumb" separator="◦">
          <Link className={cx("link")} to="/">
            Dashboard
          </Link>
          <Link className={cx("link")} to="/exams">
            Exams
          </Link>
          <Typography className={cx("current")}>New Exam</Typography>
        </Breadcrumbs>
      </Box>

      {isLoading ? (
        <Box className={cx("draftExamWrapper")}>
          <Skeleton className={cx("skeleton")} />
        </Box>
      ) : (
        <Box className={cx("draftExamWrapper")}>
          <div className={cx("draftExam")}>
            <p>Draft exam ID hiện tại của bạn: </p>
            <strong>{exam?._id ? exam?._id : "null"}</strong>
            {!exam?._id && (
              <span
                className={cx("generate")}
                onClick={handleGenerateDraftExam}
              >
                Generate
              </span>
            )}
          </div>
          {!exam?._id && (
            <p className={cx("note")}>
              Bạn vui lòng tạo exam id trước khi tạo bài kiểm tra(Bấm generate)
            </p>
          )}
        </Box>
      )}

      <ExamForm exam={exam} onSubmit={handleSubmitExam} />
    </div>
  );
};
