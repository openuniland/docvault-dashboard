/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import {
  Paper,
  TextField,
  FormControl,
  Autocomplete,
  Button,
  Box,
  Switch,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import classNames from "classnames/bind";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./ExamForm.module.scss";
import { useGetAllSubjectsApproved } from "queries/subject";
import {
  CreateExamModelForm,
  Exam,
  RequestUpdateExamPayload,
} from "types/Exam";
import { NewQuestionPayload } from "types/Question";
import { Answer } from "types/Answer";
import { useCreateNewQuestion } from "mutations/question";
import { enqueueSnackbar } from "notistack";
import RenderQuestion from "../RenderQuestion";

const cx = classNames.bind(styles);

const newExamSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required field"),
  school_year: Yup.string().trim().required("School year is required field"),
  semester: Yup.number().required("Semester is required field"),
  subject: Yup.object().required("Subject is required field"),
});

const questionSchema = Yup.object().shape({
  content: Yup.string().trim().required("Content is required field"),
  accuracy: Yup.string().trim().required("Accuracy is required field"),
});

interface Props {
  exam?: Exam;
  onSubmit?: (data: RequestUpdateExamPayload) => void;
}

export const ExamForm = (props: Props) => {
  const { exam, onSubmit = () => {} } = props;
  const [questions, setQuestions] = useState<NewQuestionPayload[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const { data: subjects = [], isLoading: isLoadingSubject } =
    useGetAllSubjectsApproved();

  const { mutateAsync } = useCreateNewQuestion();

  const {
    handleSubmit,
    control: controlExam,
    formState: { errors },
    reset: resetExam,
  } = useForm<CreateExamModelForm>({
    resolver: yupResolver(newExamSchema),
    defaultValues: {
      semester: undefined,
      subject: undefined,
      is_approved: false,
      is_draft: true,
    },
  });

  const {
    handleSubmit: handleSubmitQuestion,
    control: controlQuestion,
    formState: { errors: errorsQuestion },
    setValue: setValueQuestion,
    getValues: getValuesQuestion,
    reset: resetQuestion,
    trigger: triggerQuestion,
  } = useForm<NewQuestionPayload>({
    resolver: yupResolver(questionSchema),
    defaultValues: {
      accuracy: undefined,
      answers: [],
      new_answers: "",
    },
  });

  const handleChangeData = useCallback(
    (data: CreateExamModelForm) => {
      onSubmit({
        requestUpdateExamPayload: data,
        examId: exam?._id as string,
      });
      resetExam();
      setQuestions([]);
    },
    [resetExam, exam?._id],
  );

  const handleChangeQuestion = useCallback(
    async (data: NewQuestionPayload) => {
      try {
        if (!correctAnswer) {
          enqueueSnackbar("Please choose correct answer!", {
            variant: "warning",
          });
          return;
        }
        await mutateAsync({ ...data, exam_id: exam?._id });
        setQuestions(prev => [...prev, data]);
        resetQuestion();
        setAnswers([]);
        setCorrectAnswer("");

        enqueueSnackbar("Question successful created!", {
          variant: "success",
        });
      } catch (error: any) {
        enqueueSnackbar(`${error?.message}`, {
          variant: "error",
        });
        console.log(error);
      }
    },
    [exam?._id, correctAnswer, triggerQuestion, questions],
  );

  const handleAddAnswer = useCallback(() => {
    const a = {
      content: getValuesQuestion("new_answers") as string,
      status: false,
      id: uuidv4(),
    };

    setAnswers(prev => [...prev, a]);
    setValueQuestion("answers", [...answers, a]);
    setValueQuestion("new_answers", "");
  }, [answers]);

  const handleChooseCorrectAnswer = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCorrectAnswer(event.target.value);
      const ca = answers.find((item: any) => item.id === event.target.value);
      setValueQuestion("correct_answer", ca);
    },
    [correctAnswer, setValueQuestion, answers],
  );

  useEffect(() => {
    if (exam?.questions) {
      setQuestions(exam.questions);
    }
  }, [exam?.questions?.length]);

  return (
    <div className={cx("container")}>
      <Box className={cx("formWrapper")}>
        <Paper elevation={3} className={cx("paperWrapepr")}>
          <form
            onSubmit={handleSubmit(handleChangeData)}
            className={cx("form")}
          >
            <Box className={cx("subPaper", "formItem")}>
              <FormControl className={cx("subFormItem")}>
                <p className={cx("label")}>Publish</p>
                <Controller
                  name="is_approved"
                  control={controlExam}
                  render={({ field: { onChange, value } }) => (
                    <Switch
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      checked={value}
                    />
                  )}
                />
              </FormControl>
              <FormControl className={cx("subFormItem")}>
                <p className={cx("label")}>Is draft</p>
                <Controller
                  name="is_draft"
                  control={controlExam}
                  render={({ field: { onChange, value } }) => (
                    <Switch
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      checked={value}
                    />
                  )}
                />
              </FormControl>
            </Box>
            <FormControl className={cx("formItem")}>
              <Controller
                name="title"
                control={controlExam}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    variant="outlined"
                    error={!!errors.title}
                    helperText={errors.title ? errors.title?.message : ""}
                    fullWidth
                  />
                )}
              />
            </FormControl>
            <FormControl className={cx("formItem")}>
              <Controller
                name="description"
                control={controlExam}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </FormControl>
            <FormControl className={cx("formItem")}>
              <Controller
                control={controlExam}
                name="subject"
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    placeholder="Subject"
                    onChange={(event, item) => {
                      onChange(item);
                    }}
                    options={subjects}
                    loading={isLoadingSubject}
                    getOptionLabel={option => option.subject_name}
                    value={value || null}
                    sx={{ width: 300 }}
                    disablePortal
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Môn học"
                        error={!!errors.subject}
                        helperText={
                          errors.subject ? errors.subject?.message : ""
                        }
                      />
                    )}
                  />
                )}
              />
            </FormControl>
            <FormControl className={cx("formItem")}>
              <Controller
                control={controlExam}
                name="semester"
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    placeholder="Semester"
                    onChange={(event, item) => {
                      onChange(item);
                    }}
                    value={value || null}
                    options={["1", "2", "3"]}
                    sx={{ width: 300 }}
                    disablePortal
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Kỳ học"
                        error={!!errors.semester}
                        helperText={
                          errors.semester ? errors.semester?.message : ""
                        }
                      />
                    )}
                  />
                )}
              />
            </FormControl>
            <FormControl className={cx("formItem")}>
              <Controller
                name="school_year"
                control={controlExam}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="School year (for instance: 2021-2022))"
                    variant="outlined"
                    error={!!errors.school_year}
                    helperText={
                      errors.school_year ? errors.school_year?.message : ""
                    }
                    fullWidth
                  />
                )}
              />
            </FormControl>

            <FormControl className={cx("formItem")}>
              <Button
                variant="contained"
                type="submit"
                className={cx("submit")}
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </Paper>

        <Paper elevation={3} className={cx("subFormWrapper")}>
          <form
            onSubmit={handleSubmitQuestion(handleChangeQuestion)}
            className={cx("form")}
          >
            <FormControl className={cx("subFormItem")}>
              <Controller
                name="content"
                control={controlQuestion}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="content"
                    variant="outlined"
                    error={!!errorsQuestion.content}
                    helperText={
                      errorsQuestion.content
                        ? errorsQuestion.content?.message
                        : ""
                    }
                    fullWidth
                  />
                )}
              />
            </FormControl>

            <FormControl className={cx("subFormItem")}>
              <Controller
                name="image"
                control={controlQuestion}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="image"
                    variant="outlined"
                    error={!!errorsQuestion.image}
                    helperText={
                      errorsQuestion.image ? errorsQuestion.image?.message : ""
                    }
                    fullWidth
                  />
                )}
              />
            </FormControl>

            <FormControl className={cx("subFormItem")}>
              <Controller
                control={controlQuestion}
                name="accuracy"
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    placeholder="Accuracy"
                    onChange={(event, item) => {
                      onChange(item);
                    }}
                    value={value || null}
                    options={["high", "medium", "low"]}
                    sx={{ width: 300 }}
                    disablePortal
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Độ chính xác"
                        error={!!errorsQuestion.accuracy}
                        helperText={
                          errorsQuestion.accuracy
                            ? errorsQuestion.accuracy?.message
                            : ""
                        }
                      />
                    )}
                  />
                )}
              />
            </FormControl>

            <FormControl className={cx("subFormItem", "subFormItemAnswer")}>
              <Controller
                name="new_answers"
                control={controlQuestion}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="New answer..."
                    variant="outlined"
                    error={!!errorsQuestion.new_answers}
                    helperText={
                      errorsQuestion.new_answers
                        ? errorsQuestion.new_answers?.message
                        : ""
                    }
                    fullWidth
                  />
                )}
              />
              <AddCircleIcon
                onClick={handleAddAnswer}
                className={cx("addAnswerIcon")}
              />
            </FormControl>

            <RadioGroup
              value={correctAnswer}
              onChange={handleChooseCorrectAnswer}
            >
              {answers.map(answer => (
                <FormControlLabel
                  key={answer?.id}
                  value={answer.id}
                  control={<Radio />}
                  label={answer?.content}
                />
              ))}
            </RadioGroup>

            <FormControl className={cx("subFormItem")}>
              <Button
                className={cx("btnSubmitSubForm")}
                variant="contained"
                type="submit"
              >
                Render
              </Button>
            </FormControl>
          </form>
        </Paper>
      </Box>

      <Box className={cx("render")}>
        <RenderQuestion questions={questions} />
      </Box>
    </div>
  );
};
