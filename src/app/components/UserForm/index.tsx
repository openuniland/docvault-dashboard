import { useCallback, useState } from "react";
import * as Yup from "yup";
import {
  Box,
  Paper,
  Switch,
  TextField,
  //   FormGroup,
  FormControl,
  Autocomplete,
  Button,
} from "@mui/material";
import classNames from "classnames/bind";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./UserForm.module.scss";
import userIcon from "assets/images/user.png";
import { User } from "types/User";

const cx = classNames.bind(styles);

const AddUserSchema = Yup.object().shape({
  email: Yup.string()
    .lowercase()
    .trim()
    .email("Invalid email")
    .required("Email is required field"),
});

interface IFormProps {
  email: string;
  fullname: string;
  roles: string;
  is_deleted: boolean;
}

interface Props {
  onAddUser?: (user: any) => void;
  onUpdateUser?: (user: any) => void;
  userInfo?: User;
}

export const UserForm = (props: Props) => {
  const { onAddUser = () => {} } = props;
  const [activated, setActivated] = useState(true);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset: resetUserForm,
  } = useForm<IFormProps>({
    resolver: yupResolver(AddUserSchema),
    defaultValues: {
      roles: undefined,
    },
  });

  const handleChangeUserStatus = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setActivated(event.target.checked);
    },
    [activated],
  );

  const handleChangeData = useCallback(
    (data: IFormProps) => {
      onAddUser({
        email: data.email,
        roles: data.roles,
        is_deleted: !activated,
      });

      resetUserForm();
    },
    [activated],
  );

  return (
    <div className={cx("container")}>
      <Paper elevation={3} className={cx("paper")}>
        <Box className={cx("card")}>
          <div className={cx("imgWrapper")}>
            <img src={userIcon} alt="avatar" className={cx("img")} />
          </div>
          <p className={cx("cardDesc")}>
            Ảnh sẽ tự động cập nhật theo tài khoản google của người dùng!
          </p>
        </Box>
        <Box className={cx("status")}>
          <p className={cx("statusTitle")}>Account Activated</p>
          <Switch checked={activated} onChange={handleChangeUserStatus} />
        </Box>
      </Paper>
      <Paper elevation={3} className={cx("formWrapper")}>
        <form onSubmit={handleSubmit(handleChangeData)} className={cx("form")}>
          <Box className={cx("box")}>
            <FormControl className={cx("formItem")}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email?.message : ""}
                    fullWidth
                    margin="dense"
                  />
                )}
              />
            </FormControl>
            <FormControl className={cx("formItem")}>
              <Controller
                control={control}
                name="roles"
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    placeholder="Roles"
                    onChange={(event, item) => {
                      onChange(item);
                    }}
                    value={value || null}
                    options={["ADMIN", "USER"]}
                    sx={{ width: 300 }}
                    disablePortal
                    renderInput={params => (
                      <TextField {...params} label="Roles" />
                    )}
                  />
                )}
              />
            </FormControl>
          </Box>

          <FormControl className={cx("formItem")}>
            <Button
              className={cx("btnSubmit")}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </Paper>
    </div>
  );
};
