import { useEffect } from "react";
import AOS from "aos";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolios";
import Services from "./pages/Services";
import Errors from "./pages/Errors";
import Reviews from "./pages/Reviews";
import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact";
import { AuthProvider } from "./admin/AuthContext";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminResource from "./admin/AdminResource";
import RequireAdmin from "./admin/RequireAdmin";

export default function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Home />}></Route>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/about" element={<About />}></Route>
        <Route path="/portfolio" element={<Portfolio />}></Route>
        <Route path="/services" element={<Services />}></Route>
        <Route path="/404" element={<Errors />}></Route>
        <Route path="/reviews" element={<Reviews />}></Route>
        <Route path="/blog-list" element={<BlogList />}></Route>
        <Route path="/blog-details" element={<BlogDetails />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminDashboard />}></Route>
          <Route path=":resourceKey" element={<AdminResource />}></Route>
        </Route>
        <Route path="*" element={<Errors />}></Route>
      </Routes>
    </AuthProvider>
  );
}
