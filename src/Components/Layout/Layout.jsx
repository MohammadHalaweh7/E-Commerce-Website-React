import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate, Outlet } from "react-router-dom";

const navigate = useNavigate;

export default function Layout({ user, setUser }) {
  function logout() {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("./login");
  }
  return (
    <>
      <Navbar user={user} logout={logout} />
      <div className="container">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
