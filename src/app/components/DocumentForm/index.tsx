/* eslint-disable no-unused-vars */
import { useCallback, useState } from "react";
import * as Yup from "yup";
import {
  Paper,
  TextField,
  FormControl,
  Autocomplete,
  Button,
  Box,
  Switch,
} from "@mui/material";
import classNames from "classnames/bind";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./DocumentForm.module.scss";
import {
  CreateDocumentModelForm,
  DocumentModelContent,
} from "types/DocumentModel";
import { RenderContent } from "../RenderContent";
import { useGetAllSubjectsApproved } from "queries/subject";

const cx = classNames.bind(styles);

const newDocumentSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required field"),
  school_year: Yup.string().trim().required("School year is required field"),
  semester: Yup.number().required("Semester is required field"),
  subject: Yup.object().required("Subject is required field"),
});

const contentSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required field"),
});

interface Props {
  onCreateNewDocument?: (document: CreateDocumentModelForm) => void;
}

export const DocumentForm = (props: Props) => {
  const { onCreateNewDocument = () => {} } = props;

  const [content, setContent] = useState<DocumentModelContent[]>([]);

  const { data: subjects = [], isLoading: isLoadingSubject } =
    useGetAllSubjectsApproved();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateDocumentModelForm>({
    resolver: yupResolver(newDocumentSchema),
    defaultValues: {
      semester: undefined,
      subject: undefined,
      is_approved: false,
    },
  });

  const {
    handleSubmit: handleSubmitContent,
    control: controlContent,
    formState: { errors: errorsContent },
    reset: resetContent,
  } = useForm<DocumentModelContent>({
    resolver: yupResolver(contentSchema),
  });

  const handleChangeData = useCallback(
    (data: CreateDocumentModelForm) => {
      onCreateNewDocument({
        ...data,
        content: content,
      });

      setContent([]);
      reset();
    },
    [reset, content],
  );

  const handleChangeContent = useCallback(
    (data: DocumentModelContent) => {
      setContent([...content, data]);
      resetContent();
    },
    [content, resetContent],
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
                control={control}
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
                control={control}
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
                control={control}
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
                control={control}
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
                control={control}
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

        <RenderContent content={content} />
      </Box>
      <Box className={cx("subForm")}>
        <Paper elevation={3} className={cx("subPaper")}>
          <FormControl className={cx("subFormItem")}>
            <p className={cx("label")}>Publish</p>
            <Controller
              name="is_approved"
              control={control}
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
        <Paper elevation={3} className={cx("subPaper")}>
          <form
            onSubmit={handleSubmitContent(handleChangeContent)}
            className={cx("form")}
          >
            <FormControl className={cx("subFormItem")}>
              <Controller
                name="name"
                control={controlContent}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="name"
                    variant="outlined"
                    error={!!errorsContent.name}
                    helperText={
                      errorsContent.name ? errorsContent.name?.message : ""
                    }
                    fullWidth
                    margin="dense"
                  />
                )}
              />
            </FormControl>

            <FormControl className={cx("subFormItem")}>
              <Controller
                name="description"
                control={controlContent}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="description"
                    variant="outlined"
                    error={!!errorsContent.description}
                    helperText={
                      errorsContent.description
                        ? errorsContent.description?.message
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
                control={controlContent}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="image"
                    variant="outlined"
                    error={!!errorsContent.image}
                    helperText={
                      errorsContent.image ? errorsContent.image?.message : ""
                    }
                    fullWidth
                    margin="dense"
                  />
                )}
              />
            </FormControl>

            <FormControl className={cx("subFormItem")}>
              <Controller
                name="file"
                control={controlContent}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="file"
                    variant="outlined"
                    error={!!errorsContent.file}
                    helperText={
                      errorsContent.file ? errorsContent.file?.message : ""
                    }
                    fullWidth
                    margin="dense"
                  />
                )}
              />
            </FormControl>

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
