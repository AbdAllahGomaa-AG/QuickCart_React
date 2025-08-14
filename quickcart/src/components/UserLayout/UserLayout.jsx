import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../shared/NavBar/NavBar";
import Home from "./Home/Home";
import Footer from "../shared/Footer/Footer";
import { UserData } from "../../context/UserContext";

export default function UserLayout() {
  const { Token, setToken } = useContext(UserData);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      // User is logged in
    } else {
      // User is not logged in
      setToken(null);
    }
  }, [])
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
