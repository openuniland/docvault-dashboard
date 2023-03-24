/* eslint-disable no-unused-vars */
import { useCallback, useState } from "react";
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
import { CreateExamModelForm } from "types/Exam";
import { QuestionModelForm } from "types/Question";
import { Answer } from "types/Answer";

const cx = classNames.bind(styles);

const newExamSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required field"),
  school_year: Yup.string().trim().required("School year is required field"),
  semester: Yup.number().required("Semester is required field"),
  subject: Yup.object().required("Subject is required field"),
});

const questionSchema = Yup.object().shape({
  content: Yup.string().trim().required("Content is required field"),
  image: Yup.string().trim().required("Image is required field"),
  accuracy: Yup.string().trim().required("Accuracy is required field"),
});

interface Props {}

export const ExamForm = (props: Props) => {
  // const [question, setQuestion] = useState<QuestionModelForm[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [currentAnswerContent, setCurrentAnswerContent] = useState("");

  const { data: subjects = [], isLoading: isLoadingSubject } =
    useGetAllSubjectsApproved();

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
  } = useForm<QuestionModelForm>({
    resolver: yupResolver(questionSchema),
  });

  const handleChangeData = useCallback(
    (data: CreateExamModelForm) => {
      resetExam();
    },
    [resetExam],
  );

  const handleChangeQuestion = useCallback((data: QuestionModelForm) => {
    console.log(data, "data");
  }, []);

  const handleAddAnswer = useCallback(() => {
    const a = {
      content: currentAnswerContent,
      status: false,
      id: uuidv4(),
    };

    setAnswers(prev => [...prev, a]);
    setCurrentAnswerContent("");
    setValueQuestion("answers", [...answers, a]);
  }, [answers, currentAnswerContent]);

  const handleChangeCurrentAnswerContent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentAnswerContent(event.target.value);
    },
    [currentAnswerContent],
  );

  const handleChooseCorrectAnswer = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCorrectAnswer(event.target.value);
      const ca = answers.find((item: any) => item.id === event.target.value);
      console.log("ca", ca);

      setValueQuestion("correct_answer", ca);
    },
    [correctAnswer],
  );

  return (
    <div className={cx("container")}>
      <Box className={cx("formWrapper")}>
        <Paper elevation={3} className={cx("paperWrapepr")}>
          <form
            onSubmit={handleSubmit(handleChangeData)}
            className={cx("form")}
          >
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
                    margin="dense"
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
                    margin="dense"
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
                    margin="dense"
                  />
                )}
              />
            </FormControl>

            <FormControl className={cx("formItem")}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </FormControl>
          </form>
        </Paper>

        {/* render */}
      </Box>
      <Box className={cx("subForm")}>
        <Paper elevation={3} className={cx("subPaper")}>
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
        </Paper>
        {/* question */}
        <Paper elevation={3} className={cx("subPaper")}>
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
                    margin="dense"
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
                    margin="dense"
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

            <FormControl className={cx("subFormItem")}>
              <TextField
                label="Answer A"
                variant="outlined"
                fullWidth
                margin="dense"
                value={currentAnswerContent}
                onChange={handleChangeCurrentAnswerContent}
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
    </div>
  );
};
