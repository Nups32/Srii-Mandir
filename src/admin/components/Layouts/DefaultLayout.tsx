import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import App from "../../../App";
import Sidebar from "./Sidebar";
import "antd/dist/reset.css"; // for antd v5+
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Navbar from "./Header";
import { useSelector } from "react-redux";
import type { IRootState } from "@/store";
import Footer from "./Footer";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  // const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  // const dispatch = useDispatch();
  // const [collapsed, setCollapsed] = useState(false);
  // const [hover, setHover] = useState(false);

  const [, setShowLoader] = useState(true);
  const [, setShowTopButton] = useState(false);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  // const isMobile = window.innerWidth < 1024;

  // const goToTop = () => {
  //   document.body.scrollTop = 0;
  //   document.documentElement.scrollTop = 0;
  // };

  const onScrollHandler = () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);

    const screenLoader = document.getElementsByClassName("screen_loader");
    if (screenLoader?.length) {
      screenLoader[0].classList.add("animate__fadeOut");
      setTimeout(() => {
        setShowLoader(false);
      }, 200);
    }

    return () => {
      window.removeEventListener("onscroll", onScrollHandler);
    };
  }, []);

  // const disableHoverEffect = () => {
  //     setHover(!hover);
  // };
  // const toggleSidebar = () => {
  //     setCollapsed(!collapsed);
  // };

  return (
    <App>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout style={{ display: "flex", height: "100vh" }}>
          <div className="fixed top-0 left-0 right-0 z-41">
            <Navbar />
          </div>

          <Sidebar />

          {/* <Content style={{ margin: '16px 90px' }} > */}
          {/* <div
            className={`flex-1 transition-all duration-300 ease-in-out ${
              themeConfig.sidebar ? "w-[80%] " : "w-[95%]"
              // themeConfig.sidebar ? "ml-[20%]" : "ml-[5%]"
            }`}
          > */}
          <Content>
            <div
              className={`flex-1 transition-all duration-300 ease-in-out m-5! mb-0! sm:m-10! md:m-15! lg:ml-25! lg:my-4! pt-20! ${
                themeConfig.sidebar ? " md:w-80vw pl-[16%]!" : "w-95vw"
                // themeConfig.sidebar ? "ml-[20%]" : "ml-[5%]"
              }`}
            >
              {children}
            </div>
          </Content>
          {/* </div> */}
          {/* <main
            className={`
          ${
            !isMobile
              ? themeConfig.sidebar
                ? "!ml-[15%] w-[85%]"
                : "!ml-16 w-[calc(100%-4rem)]"
              : "!ml-0 w-full"
          } 
        `}
            style={{
              minHeight: "calc(100vh - 4rem)",
            }}
          ></main> */}
          <div className="fixed">
            <Footer />
          </div>
        </Layout>
      </Layout>
    </App>
  );
};

export default DefaultLayout;
