import { Route, Routes } from "react-router-dom";

import { Guards } from "app/pages/Guards";
import { UserPage } from "app/pages/UserPage";
import { withAppHeader, withSidebar } from "../hocs";

const Pages = {
  Guards: Guards,
  UserPage: withSidebar(withAppHeader(UserPage)),
};

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.Guards />} />
      <Route path="/users" element={<Pages.UserPage />} />
    </Routes>
  );
};

export default Layout;
