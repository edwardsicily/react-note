import React from "react";
import { Navbar } from "../Navbar/Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
