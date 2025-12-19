/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import type { IRootState } from "@/store";
import { toggleSidebar } from "@/store/themeConfigSlice";
import IconCaretsDown from "@/admin/components/Icon/IconCaretsDown";
import {
  Boxes,
  Contact,
  Menu,
  PackageOpen,
  Settings,
} from "lucide-react";
import { LogoutOutlined } from "@ant-design/icons";
// import { AuthContext } from "@/store/AuthContext";
import { useNavigate } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { setUserClearConfig } from "@/store/userConfigSlice";

// import logo from "@/assets/logo.png";

const Sidebar = () => {
  const [currentMenu, setCurrentMenu] = useState<string>("");
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  // const semidark = useSelector(
  //   (state: IRootState) => state.themeConfig.semidark
  // );
  const location = useLocation();
  const path = location.pathname.split("/");
  path.shift();
  // const currentPath = "/" + path.join("/");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  const navigate = useNavigate();
  // const { setAuthData } = useContext(AuthContext);

  // const sidebar = () => {
  //   setIsSidebarOpen(!sidebar);
  // };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any =
          ul.closest("li.menu").querySelectorAll(".nav-link") || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  type NavItem = {
    section: {
      name: string;
      label: string;
    };
    items: {
      name: string;
      label: string;
      link: string;
      icon: ReactNode;
      subsections?: {
        name: string;
        label: string;
        link: string;
      }[];
    }[];
  };

  const navItems: NavItem[] = [
    {
      section: {
        name: "",
        label: "",
      },

      items: [
        {
          icon: <Menu />,
          name: "Dashboard",
          label: t("Dashboard"),
          link: "/admin/dashboard",
        },
        {
          icon: <Boxes />,
          name: "Users",
          label: t("Manage Users"),
          link: "/admin/manage-users",
        },
        {
          icon: <PackageOpen />,
          name: "Product",
          label: t("Manage Pooja"),
          link: "/admin/pooja",
        },
        {
          icon: <PackageOpen />,
          name: "Product",
          label: t("Manage Media"),
          link: "/admin/media",
        },
        {
          icon: <PackageOpen />,
          name: "Chadhava",
          label: t("Manage Chadhava"),
          link: "/admin/chadhava",
        },
        {
          icon: <PackageOpen />,
          name: "Product",
          label: t("Manage Product"),
          link: "/admin/product",
        },
        // {
        //   icon: <FileBadge2 />,
        //   name: "Certificates",
        //   label: t("Manage Certificates"),
        //   link: "/admin/achievements",
        // },
        {
          icon: <Contact />,
          name: "ContactUs",
          label: t("Contact Us"),
          link: "/admin/contact-us",
        },
      ],
    },
  ];

  const bottomSideMenu: NavItem[] = [
    {
      section: {
        name: "",
        label: "",
      },

      items: [
        {
          icon: <Settings />,
          name: "Settings",
          label: t("Settings"),
          link: "/",
        },
        {
          icon: <LogoutOutlined />,
          name: "Logout",
          label: t("Logout"),
          link: "/",
        },
      ],
    },
  ];

  const handleLogout = async () => {
    dispatch(setUserClearConfig());

    navigate("/");
  };

  const handleSettings = () => {
    navigate("/admin/settings")
  }

  return (
    // <div className={semidark ? "!pl-30" : ""}>
    <div className="">
      {/* <nav
          className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[300px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
        > */}
      <nav
        // className={`sidebar !overflow-x-visible fixed h-full z-40 transition-all duration-300 bg-gradient-to-l from-green-200 to-blue-200  shadow-sm ${themeConfig.sidebar ? "sm:w-2/5 md:w-1/5" : "w-0 lg:w-1/20 "} min-w-0`}
        className={`sidebar overflow-x-visible! fixed h-full z-40 transition-all duration-300 bg-orange-400  shadow-sm ${themeConfig.sidebar ? "w-[240px] sm:w-1/5! md:w-1/5" : "w-0 lg:w-1/20 "} min-w-0`}
      >
        {/* logo */}
        {/* <div>
          <NavLink to="/" className="main-logo flex items-center ">
            <img
              className="h-15 w-auto flex-none !px-1"
              src={logo}
              alt="logo"
            />
          </NavLink>
        </div> */}

        <div className=" flex flex-col justify-between h-full  mt-16! pb-4! z-20">
          {/* toggle button  */}
          <div className="flex justify-end items-center px-4! py-3!">
            <button
              type="button"
              className=" w-8 h-8 rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 transition duration-300 rtl:rotate-180 cursor-pointer"
              onClick={() => dispatch(toggleSidebar())}
            // onClick={sidebar}
            >
              <IconCaretsDown
                // className={`m-auto flex justify-end right-0 -rotate-90 ${
                className={`transition-transform duration-200 ${themeConfig.sidebar ? "rotate-90" : "-rotate-90"
                  }`}
              />
            </button>
          </div>

          {/* navmenus */}
          <div className="flex flex-col justify-between h-screen  overflow-x-visible">
            <ul className="flex-1 font-medium pl-4! space-y-2! overflow-y-auto text-white!">
              {navItems.map((navItem, sectionIndex) => (
                <Fragment key={sectionIndex}>
                  {/* <h2 className="flex items-center text-black dark:text-black text-4xl !px-2 !py-1 !mx-2 ">
                    {navItem.section.label}
                  </h2> */}
                  {navItem.items.map((item, itemIndex) => {
                    const tooltipId = `tooltip-${sectionIndex}-${itemIndex}`;

                    // const isActive = currentPath === item.link;
                    const hasSub =
                      item.subsections && item.subsections.length > 0;

                    return (
                      <li key={itemIndex}>
                        <NavLink
                          title={item.label}
                          to={item.link}
                          className={({ isActive }) =>
                            `flex items-center px-4! my-4! rounded-md transition-all duration-200 cursor-pointer ${isActive
                              ? " border-l-4  border-white/50 text-white! py-2! px-3! rounded-3xl pl-1!"
                              : "text-black! hover:text-gray-300!"
                            }`
                          }
                          onClick={() => toggleMenu(item.name)}
                          {...(!themeConfig.sidebar
                            ? {
                              "data-tooltip-id": tooltipId,
                              "data-tooltip-content": item.label,
                            }
                            : {})}
                        >
                          {/* <div className="relative flex items-center"> */}
                          <span className="mr-3!">{item.icon}</span>

                          {/* {!themeConfig.sidebar && (
                              <div className="absolute top-1/2 left-full z-50">
                                <span className=" bg-gray-800 -translate-y-1/2 !px-2 !py-1 text-sm text-white whitespace-nowrap rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  {item.name}
                                </span>
                              </div>
                            )}
                          </div> */}

                          {/* {themeConfig.sidebar && ( */}
                          <span className="flex-1 text-sm xl:text-lg">
                            {themeConfig.sidebar ? item.label : ""}
                          </span>
                          {/* )} */}

                          {hasSub && (
                            <IconCaretsDown
                              className={`transition-transform ${currentMenu === item.name ? "rotate-180" : ""
                                }`}
                            />
                          )}
                          {!themeConfig.sidebar && (
                            <Tooltip id={tooltipId} place="right" className="z-50!" />
                          )}
                        </NavLink>
                      </li>
                    );
                  })}
                </Fragment>
              ))}
            </ul>
          </div>

          {/* bottom navmenus */}
          <div className="mt-auto border-t border-gray-600 pt-3! pb-12! bottom-10 flex flex-col">
            <ul className="flex-1 font-medium pl-4! space-y-2! overflow-y-auto">
              {bottomSideMenu.map((navItem, sectionIndex) => (
                <Fragment key={sectionIndex}>
                  {navItem.items.map((item, itemIndex) => {
                    const tooltipId = `tooltip-${sectionIndex}-${itemIndex}`;
                    // const hasSub =
                    //   item.subsections && item.subsections.length > 0;

                    return (
                      <li
                        key={itemIndex}>
                        <NavLink
                          to={item.link}
                          className={({ isActive }) =>
                            `flex items-center px-4! my-4! rounded-md transition-all duration-200 cursor-pointer ${isActive
                              ? " border-l-4  border-white/50 text-white! py-2! px-3! rounded-3xl pl-1!"
                              : "text-black! hover:text-gray-300!"
                            }`
                          }
                          onClick={(e) => {
                            if (item.name === "Logout") {
                              e.preventDefault();
                              handleLogout();
                            } else if (item.name === "Settings") {
                              e.preventDefault();
                              handleSettings();
                            } else {
                              toggleMenu(item.name);
                            }

                          }}

                          {...(!themeConfig.sidebar
                            ? {
                              "data-tooltip-id": tooltipId,
                              "data-tooltip-content": item.label,
                            }
                            : {})}
                        >
                          <span className="mr-5! w-4 h-auto text-lg shrink-0">
                            {item.icon}
                          </span>
                          <span className="flex-1 text-sm xl:text-lg">
                            {themeConfig.sidebar ? item.label : ""}
                          </span>
                          {/* {hasSub && (
                            <IconCaretsDown
                              className={`transition-transform ${
                                currentMenu === item.name ? "rotate-180" : ""
                              }`}
                            />
                          )} */}
                        </NavLink>
                        {!themeConfig.sidebar && (
                          <Tooltip id={tooltipId} place="right" className="z-50!" />
                        )}
                      </li>
                    );
                  })}
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;