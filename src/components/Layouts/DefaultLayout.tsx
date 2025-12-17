// import { useEffect, useState } from 'react';
import type { PropsWithChildren } from "react";
import App from "../../App";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ScrollToHash from "../ScrollToHash";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <App>
      <ScrollToHash /> {/* <- place here */}
      {/* main container */}
      <Navbar />
      <div className="relative">{children}</div>
      <Footer />
    </App>
  );
};

export default DefaultLayout;
