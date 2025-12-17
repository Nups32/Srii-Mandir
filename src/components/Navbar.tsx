/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { ChevronRight } from "lucide-react";
// import { getNavProductServices } from "@/utils/API";
import { message } from "antd";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("/");
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const baseUrl = window.location.origin;
  const [productServices, setProductServices] = useState<any[]>();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about", isExpandable: true },
    {
      name: "Services & Products",
      href: "/#products",
      isExpandable: true,
    },
    { name: "Get In Touch", href: "#contact" },
  ];

  const aboutItems = [
    { name: "Team", href: "/our-team" },
    { name: "Company", href: baseUrl + "#about" },
  ];

  const scrollToSection = (sectionId: string) => {
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    } else if (sectionId == "/") {
      if (window.location.pathname !== "/") { // check is it in root page if not then redirect to root page
        window.location.href = "/";
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

    }
    const section = document.getElementById(sectionId);
    const navbar = document.querySelector("nav");
    if (section && navbar) {
      const yOffset = -navbar.offsetHeight;
      const y = section.getBoundingClientRect().top + window.pageYOffset - yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (location.hash) {
      setActive(location.hash);
      const id = location.hash.replace("#", "");
      setTimeout(() => scrollToSection(id), 100);
    } else if (location.pathname) {
      if (location.pathname == "/our-team") {
        setActive("#about");
      } else {
        setActive(location.pathname);
      }
    } else {
      setActive(location.pathname);
    }
  }, [location]);

  const handleNavigation = (
    href: string,
    linkName: string,
    isMobile: boolean = false
  ) => {
    if (href.startsWith("#")) {
      const currentPath = window.location.pathname;
      if (currentPath !== "/" && currentPath !== "") {
        window.location.href = baseUrl + "/" + href;
      } else {
        const sectionId = href.replace("#", "");
        scrollToSection(sectionId);
      }
    } else {
      window.location.href = baseUrl + href;
    }

    setActive(linkName);
    if (isMobile) {
      setIsOpen(false);
      setOpenSubmenu(null);
    }
  };

  const closeMobileNavMenus = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  // mobile dropdown for services
  const mobileServices = () => (
    <div className="!p-2 flex flex-col gap-3 bg-[#c7d4f7] border-l-4 border-green-500 rounded-md max-h-[60vh] overflow-y-auto">
      {productServices?.map((service, index) => (
        <div key={index} className="flex flex-col gap-2 !mt-2">
          <span className="text-green-400 font-semibold !pl-1">
            {service.category}
          </span>
          {service.items.map((item: any, itemIndex: any) => (
            <a
              key={itemIndex}
              href={baseUrl + item.href}
              className="text-sm text-gray-800 !pl-3 hover:text-blue-400 whitespace-normal flex items-center justify-between"
              onClick={() => closeMobileNavMenus}
            >
              {item.name}
            </a>
          ))}
        </div>
      ))}
    </div>
  );

  // mobile dropdown for about
  const mobileAboutDropdown = () => (
    <div className="!pl-4 flex flex-col !gap-1 !mt-1 bg-[#e9effc] border-l-4 border-green-500 rounded-md !p-2">
      {aboutItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="text-sm text-gray-700 hover:text-blue-400 whitespace-normal flex items-center justify-between"
          onClick={() => {
            setActive("About");
            closeMobileNavMenus();
          }}
        >
          {item.name}
        </a>
      ))}
    </div>
  );

  return (
    <nav className="shadow-md fixed w-full z-50 bg-gradient-to-r from-[#b7e1c4] to-[#e2f2e5]">
      <div className="relative !px-4">
        <div className="flex justify-between items-center h-20">
          {/* logo */}
          <div className="!mx-5">
            <a href={baseUrl}>
              <img src={logo} alt="Intellect Logo" className="h-16 w-auto" />
            </a>
          </div>

          {/* desktop view */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) =>
              link.name === "Services & Products" ? (
                <div key={link.name} className="group">
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        scrollToSection(link.href.replace("#", ""));
                        setActive(link.href);
                      } else {
                        setActive(link.href);
                      }
                    }}
                    className={`text-sm transition-all duration-200 flex items-center gap-1 ${active === link.href
                      ? "text-green-500 border-b-2 border-green-500 pb-1"
                      : "text-[#3D8D7A] !font-bold hover:text-green-400"
                      }`}
                  >
                    {link.name}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </a>
                  <div className="!text-white drop-down absolute -translate-x-1/2 mt-4 !w-[87vw] xl:!w-[68vw] max-h-[80vh] bg-[#181f32] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50 flex flex-wrap gap-6 overflow-y-auto">
                    {productServices?.map((service, index) => (
                      <div key={index} className="flex flex-col gap-2 font-sans">
                        <h4 className="text-green-400 font-semibold mb-1">
                          {service.category}
                        </h4>
                        {service.items.map((item: any, itemIndex: any) => (
                          <a
                            key={itemIndex}
                            href={item.href}
                            className="hover:text-blue-400"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : link.name === "About" ? (
                <div key={link.name} className="group">
                  <a
                    href={baseUrl + link.href}
                    onClick={(e) => {
                      // if (link.href.startsWith("#")) {
                      //   e.preventDefault();
                      //   scrollToSection(link.href.replace("#", ""));
                      //   setActive(link.href);
                      // } else {
                      setActive(link.href);
                      // }
                    }}
                    className={`text-sm font-bold transition-all duration-200 flex items-center gap-1 ${active === link.href
                      ? "text-green-500 border-b-2 border-green-500 pb-1"
                      : "text-[#3D8D7A] hover:text-green-400"
                      }`}
                  >
                    {link.name}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </a>
                  <div className="!p-2 !mt-2 absolute -translate-x-1/2 w-auto min-h-auto bg-[#181f32] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50">
                    <div className="flex flex-col gap-2 min-w-[120px] font-sans">
                      {aboutItems.map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          onClick={(e) => {
                            setActive(link.href);
                          }}
                          className="text-white !m-1"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : link.name === "Get In Touch" ? (
                <a
                  key={link.name}
                  href={baseUrl + link.href}
                  onClick={(e) => {
                    // if (link.href.startsWith("#")) {
                    //   e.preventDefault();
                    //   scrollToSection(link.href.replace("#", ""));
                      // setActive(link.href);
                    // } else {
                      setActive(link.href);
                    // }
                  }}
                  className={
                    `ml-2 px-5 py-2 font-bold text-[#555843] bg-gradient-to-l border-2 border-white !p-2 transition-all duration-200 shadow-md hover:bg-[#ccf8f7] hover:scale-105 ` +
                    (active === link.href ? "text-green-500 ring-2 ring-green-300" : "")
                  }
                >
                  {link.name}
                </a>
              ) : (
                <a
                  key={link.name}
                  // href={baseUrl + link.href}
                  // onClick={() => setActive(link.href)}
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      e.preventDefault();
                      scrollToSection(link.href.replace("#", ""));
                      setActive(link.href);
                    } else {
                      scrollToSection(link.href);
                      setActive(link.href);
                    }
                  }}
                  className={`text-sm font-bold transition-all duration-200 cursor-pointer ${active === link.href
                    ? "text-green-500 border-b-2 border-green-500"
                    : "text-[#3D8D7A] hover:text-green-400"
                    }`}
                >
                  {link.name}
                </a>
              )
            )}
          </div>

          {/* mobile view */}
          <div className="lg:hidden flex items-center !mr-5">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setOpenSubmenu(null);
              }}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {isOpen ? (
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile dropdown */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden bg-gradient-to-bl from-[#b7e1c4] to-[#e2f2e5] transform transition-all duration-300 ease-in-out "
        // ${
        // className=`md:hidden bg-[#0B1221] border-gray-700 px-4 transform transition-all duration-300 ease-in-out ${
        // isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        // }`}
        >
          <div className="flex flex-col gap-2 !text-[#674747] overflow-y-auto max-h-[80vh] pr-2 !mx-2 !py-2">
            {navLinks.map((link) => {
              if (link.name === "About") {
                return (
                  <div key={link.name} className="flex flex-col">
                    <button
                      onClick={() => {
                        setOpenSubmenu(
                          openSubmenu === link.name ? null : link.name
                        );
                      }}
                      className={`text-base font-bold rounded transition-colors flex items-center justify-between ${active === link.href
                        ? "!text-[#674747]"
                        : "!text-[#3D8D7A]"
                        }`}
                    >
                      {link.name}
                      <ChevronRight
                        className={`!ml-2 h-4 w-4 transition-transform ${openSubmenu === link.name ? "rotate-90" : ""
                          }`}
                      />
                    </button>
                    {openSubmenu === link.name && mobileAboutDropdown()}
                  </div>
                );
                // } else if (link.name === "Services & Products") {
                return (
                  <div key={link.name} className="flex flex-col">
                    <button
                      onClick={() => {
                        setOpenSubmenu(
                          openSubmenu === link.name ? null : link.name
                        );
                      }}
                      className={`text-base font-bold rounded px-3 py-2 transition-colors flex items-center justify-between ${active === link.href
                        ? "!text-[#674747]"
                        : "!text-[#3D8D7A]"
                        }`}
                    >
                      {link.name}
                      {/* <ChevronRight
                        className={`ml-2 h-4 w-4 transition-transform ${openSubmenu === link.name ? "rotate-90" : ""
                          }`}
                      /> */}
                    </button>
                    {/* {openSubmenu === link.name && mobileServices()} */}
                  </div>
                );

              } else {
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavigation(link.href, link.name, true)}
                    className={`text-base font-bold rounded px-3 py-2 transition-colors text-left ${active === link.href
                      ? "!text-[#674747] underline"
                      : "!text-[#3D8D7A]"
                      }`}
                  >
                    {link.name}
                  </button>
                );
              }
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
