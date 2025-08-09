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

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />} path="/">
        <Route element={<HomePage />} path="/" />
        <Route element={<HistoryPage />} path="/history" />
        <Route element={<BlogsPage />} path="/blogs" />
        <Route element={<BlogsDetail />} path="/blogs/:slug" />
        <Route element={<ContactPage />} path="/contact" />
        <Route element={<RegisterPage />} path="/register" />
      </Route>

      <Route element={<AuthLayout />} path="/">
        <Route element={<LoginPage />} path="/login" />
      </Route>
    </Routes>
  );
}

export default App;
