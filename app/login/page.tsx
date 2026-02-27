import Login from "@/components/auth/Login";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const LoginPage = () => {
  return (
    <main>
      <Navbar />
      <Login />
      <Footer />
    </main>
  );
};

export default LoginPage;
