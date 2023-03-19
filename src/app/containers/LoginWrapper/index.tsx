import { useCallback, useState } from "react";
import classNames from "classnames/bind";
import { useGoogleLogin } from "@react-oauth/google";

import styles from "./LoginWrapper.module.scss";
import logo from "assets/images/logo.png";
import teamwork from "assets/images/teamwork.png";
import { ButtonCustomization } from "app/components/ButtonCustomization";
import { ModalCustomization } from "app/components/ModalCustomization";
import { ReactComponent as GoogleIcon } from "assets/images/googleIcon.svg";
import { setTokens } from "utils/storage";
import { useLogin } from "mutations/auth";

const cx = classNames.bind(styles);

export const LoginWrapper = () => {
  const { mutateAsync } = useLogin();
  const [openPropup, setOpenPropup] = useState(false);

  const handleOpenPropup = useCallback(() => {
    setOpenPropup(true);
  }, [setOpenPropup]);

  const handleClosePropup = useCallback(() => {
    setOpenPropup(false);
  }, [setOpenPropup]);

  const handleCallGoogleApi = useGoogleLogin({
    onSuccess: tokenResponse => {
      (async () => {
        try {
          const data = await mutateAsync({
            googleToken: tokenResponse.access_token,
          });
          setTokens(data);

          window.location.reload();
        } catch (error: any) {
          if (
            error?.errors?.errorCode === "NOT_BELONG_TO_ORGANIZATION" ||
            error?.errors?.errorCode === "NOT_ADMIN"
          ) {
            handleOpenPropup();
          }
        }
      })();
    },
    onError: (error: any) => {
      console.log("error", error);
    },
  });
  return (
    <main className={cx("container")}>
      <div className={cx("logoWrapper")}>
        <img src={logo} alt="logo" className={cx("logo")} />
      </div>
      <div className={cx("leftSide")}>
        <h1 className={cx("titleLeftSide")}>Hi, Welcome back</h1>
        <img className={cx("teamwork")} src={teamwork} alt="teamwork" />
      </div>
      <div className={cx("rightSide")}>
        <h1 className={cx("titleRightSide")}>Sign in to Manage</h1>
        <ButtonCustomization
          className={cx("button")}
          onClick={handleCallGoogleApi}
        >
          <GoogleIcon />
        </ButtonCustomization>
        <div className={cx("desc")}>
          <p>Go to</p>
          <a href="https://github.com/openuniland" target="_blank">
            Revise
          </a>
        </div>
      </div>

      <ModalCustomization
        open={openPropup}
        handleAgree={handleClosePropup}
        handleCancel={handleClosePropup}
        actionDefault
        title="Notification"
      >
        Permission denied
      </ModalCustomization>
    </main>
  );
};
