import { withSidebar, withAppHeader } from "app/layouts/hocs";
import { getTokens } from "utils/storage";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";

const tokens = getTokens();

const Pages = {
  Home: withAppHeader(withSidebar(HomePage)),
  Login: LoginPage,
};

export const Guards = () => {
  if (tokens?.error === "null") return <Pages.Login />;

  return <Pages.Home />;
};
