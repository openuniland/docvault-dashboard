import { Route, Routes } from "react-router-dom";

import { Guards } from "app/pages/Guards";
import { UserPage } from "app/pages/UserPage";
import { withAppHeader, withSidebar } from "../hocs";
import { AddUserPage } from "app/pages/AddUserPage";
import { EditUserPage } from "app/pages/EditUserPage";
import { SubjectPage } from "app/pages/SubjectPage";
import { DocumentPage } from "app/pages/DocumentPage";
import { NewDocumentPage } from "app/pages/NewDocumentPage";
import { ExamPage } from "app/pages/ExamPage";

const Pages = {
  Guards: Guards,
  UserPage: withSidebar(withAppHeader(UserPage)),
  AddUserPage: withSidebar(withAppHeader(AddUserPage)),
  EditUserPage: withSidebar(withAppHeader(EditUserPage)),
  SubjectPage: withSidebar(withAppHeader(SubjectPage)),
  DocumentPage: withSidebar(withAppHeader(DocumentPage)),
  NewDocumentPage: withSidebar(withAppHeader(NewDocumentPage)),
  ExamPage: withSidebar(withAppHeader(ExamPage)),
};

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.Guards />} />
      <Route path="/users" element={<Pages.UserPage />} />
      <Route path="/users/new" element={<Pages.AddUserPage />} />
      <Route path="/users/edit/:userId" element={<Pages.EditUserPage />} />
      <Route path="/subjects" element={<Pages.SubjectPage />} />
      <Route path="/documents" element={<Pages.DocumentPage />} />
      <Route path="/documents/new" element={<Pages.NewDocumentPage />} />
      <Route path="/exams" element={<Pages.ExamPage />} />
    </Routes>
  );
};

export default Layout;
