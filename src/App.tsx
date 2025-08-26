import { Route, Routes } from "react-router-dom";
import AOS from "aos";

import AuthLayout from "./components/layouts/auth";
import LoginPage from "./pages/auth/Login";
import DefaultLayout from "./components/layouts/landing";
import HomePage from "./pages/home";
import HistoryPage from "./pages/about/history";
import BlogsPage from "./pages/blogs";
import BlogsDetail from "./pages/blogs/detail";
import ContactPage from "./pages/contact";
import RegisterPage from "./pages/auth/Register";
import ErrorNotFoundPage from "./pages/errors/not-found";
import ComingSoon from "./pages/errors/cooming-soon";
import VisiMisiPage from "./pages/about/visi-misi";
import "aos/dist/aos.css";
import FormPage from "./pages/form";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import ResetPasswordPage from "./pages/auth/reset-password";
import MemberDashboardPage from "./pages/members/dashboard";
import AdminLayout from "./components/layouts/admin";
import BlogPage from "./pages/members/blogs";
import BlogCreate from "./pages/members/blogs/create";
import BlogCategoryPage from "./pages/members/blog-category";
import FormCreatePage from "./pages/members/form/create";
import FormViewDetail from "./pages/members/form/detail";
import FormPageMember from "./pages/members/form";
AOS.init({
  duration: 1000,
});
function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />} path="/">
        <Route element={<HomePage />} path="/" />
        <Route element={<HistoryPage />} path="/history" />

        <Route element={<FormPage />} path="/form/:slug" />
        <Route path="/blogs">
          <Route element={<BlogsPage />} path="" />
          <Route element={<BlogsDetail />} path=":slug" />
        </Route>

        <Route element={<ContactPage />} path="/contact" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<VisiMisiPage />} path="/visi-misi" />

        <Route element={<ComingSoon />} path="/partner" />
        {/* Comming soon */}
        <Route element={<ComingSoon />} path="/organization" />
        <Route element={<ComingSoon />} path="/lpk-pppi" />
        <Route element={<ComingSoon />} path="/gallery" />
        <Route element={<ComingSoon />} path="/event/:slug" />
      </Route>

      <Route element={<AdminLayout />} path="/member">
        <Route element={<MemberDashboardPage />} path="" />

        <Route path="form">
          <Route element={<FormPageMember />} path="" />
          <Route element={<FormCreatePage />} path="create" />
          <Route element={<FormCreatePage />} path=":id" />
          <Route element={<FormViewDetail />} path=":id/view" />
        </Route>

        <Route path="blogs">
          <Route element={<BlogPage />} path="" />
          <Route element={<BlogCreate />} path="create" />
          <Route element={<BlogCreate />} path=":slug/edit" />
          <Route element={<BlogCategoryPage />} path="category" />
        </Route>
      </Route>

      <Route element={<AuthLayout />} path="/">
        <Route element={<LoginPage />} path="/login" />
        <Route element={<ForgotPasswordPage />} path="/forgot-password" />
        <Route element={<ResetPasswordPage />} path="/reset-password/:token" />
      </Route>

      <Route
        element={
          <DefaultLayout>
            <ErrorNotFoundPage />
          </DefaultLayout>
        }
        path="*"
      />
    </Routes>
  );
}

export default App;
