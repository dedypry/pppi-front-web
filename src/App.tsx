import { Route, Routes } from "react-router-dom";

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

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />} path="/">
        <Route element={<HomePage />} path="/" />
        <Route element={<HistoryPage />} path="/history" />

        <Route path="/blogs">
          <Route element={<BlogsPage />} path="" />
          <Route element={<BlogsDetail />} path=":slug" />
        </Route>

        <Route element={<ContactPage />} path="/contact" />
        <Route element={<RegisterPage />} path="/register" />

        {/* Comming soon */}
        <Route element={<ComingSoon />} path="/visi-misi" />
        <Route element={<ComingSoon />} path="/organization" />
        <Route element={<ComingSoon />} path="/lpk-pppi" />
        <Route element={<ComingSoon />} path="/gallery" />
      </Route>

      <Route element={<AuthLayout />} path="/">
        <Route element={<LoginPage />} path="/login" />
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
