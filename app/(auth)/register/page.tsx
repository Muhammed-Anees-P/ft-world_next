import Signup from "@/components/auth/UserSignup";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const RegisterPage = () => {
  return (
    <main>
      <Navbar />
      <Signup />
      <Footer />
    </main>
  );
};

export default RegisterPage;
