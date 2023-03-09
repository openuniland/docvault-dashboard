import { Route, Routes } from "react-router-dom";

import { Guards } from "app/pages/Guards";
const Pages = {
  Guards: Guards,
};

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.Guards />} />
    </Routes>
  );
};

export default Layout;
