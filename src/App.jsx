import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import CarsPage from "@/pages/CarsPage";
import CarDetailsPage from "@/pages/CarDetailsPage";
import ContactPage from "@/pages/ContactPage";
import AboutPage from "@/pages/AboutPage";
import NotFoundPage from "@/pages/NotFoundPage";
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ProfilePage from "@/pages/auth/ProfilePage";
import { Toaster } from "@/components/ui/toaster";
function App() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return <ThemeProvider defaultTheme="light" storageKey="autovista-theme"><AuthProvider><Router><Routes>{
    /* Auth routes */
  }<Route path="/auth/signin" element={<SignInPage />} /><Route path="/auth/signup" element={<SignUpPage />} /><Route path="/auth/forgot-password" element={<ForgotPasswordPage />} /><Route path="/auth/profile" element={<ProfilePage />} />{
    /* Main layout routes */
  }<Route element={<Layout />}><Route path="/" element={<HomePage />} /><Route path="/cars" element={<CarsPage />} /><Route path="/cars/:id" element={<CarDetailsPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="/about" element={<AboutPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes><Toaster /></Router></AuthProvider></ThemeProvider>;
}
var App_default = App;
export {
  App_default as default
};
