import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";

export default function UserLayout() {
  return (
    <>
      <NavBar />
      <Home />
      <Footer />
    </>
  );
}
