import React from "react";
import Header from "../Navbar/Header";
import Footer from "../Footer/Footer";

export default function Layout({ children }) {
    return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    )
  }