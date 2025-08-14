import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../shared/NavBar/NavBar";
import Home from "./Home/Home";
import Footer from "../shared/Footer/Footer";

export default function UserLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
