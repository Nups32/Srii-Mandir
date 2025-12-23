import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import logo from "../assets/logo.jpg";
import type { IRootState } from "../store";

type AccountMenuItem = {
  name: string;
  href: string;
};

const NavMenus = [
  { name: "Home", path: "/" },
  { name: "Puja", path: "/puja" },
  { name: "Chadhava", path: "/chadhava" },
  { name: "Library", path: "/media" },
  { name: "Vedic Science", path: "/vedic-science" },
  { name: "Instant Solution", path: "/instant-solution" },
  { name: "Shakti Sanyansi", path: "/shakti-sanyans" },
  { name: "Srii Mandir Mela", path: "/products" },
  { name: "Yog Maya Mandir", path: "/yog-maya-mandir" },
  { name: "Dhan Basra Potli", path: "/Dhan-basra-potli" },
];

const AccountMenus: AccountMenuItem[] = [
  { name: "Profile", href: "/profile" },
  { name: "My Puja Booking", href: "/puja/history" },
  { name: "My Chadhava Booking", href: "/chadhava/history" },
  { name: "Logout", href: "/logout" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const { token, email } = useSelector((state: IRootState) => state.userConfig);

  const isLoggedIn = Boolean(token);

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setShowAccountMenu(false);
  };

  /* Lock body scroll for mobile menu */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  /* Outside click handling */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        accountMenuRef.current &&
        !accountMenuRef.current.contains(e.target as Node)
      ) {
        closeAllMenus();
      }
    };

    if (isMenuOpen || showAccountMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, showAccountMenu]);

  const navLinkClass = (isActive: boolean) =>
    `text-md font-medium transition ${
      isActive ? "text-orange-600" : "text-gray-700 hover:text-orange-500"
    }`;

  const renderAccountMenu = (isMobile = false) => (
    <div className="bg-[#0B1221] border border-gray-700 rounded-lg shadow-lg min-w-62">
      {AccountMenus.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          onClick={closeAllMenus}
          className={`block px-4 py-2 text-white hover:bg-gray-800 ${
            isMobile ? "" : "px-6"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      {/* header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className=" mx-auto px-3">
          <div className="flex items-center justify-between h-20">
            {/* logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-16" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {NavMenus.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeAllMenus}
                  className={({ isActive }) => navLinkClass(isActive)}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Account */}
            <div className="hidden lg:block">
              {isLoggedIn ? (
                <div className="relative group">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold cursor-pointer">
                    {email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="absolute right-0 hidden group-hover:block z-50">
                    {renderAccountMenu()}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    closeAllMenus();
                    navigate("/login");
                  }}
                  className="bg-orange-500 text-white! px-4 py-2 rounded-full text-sm hover:bg-orange-600 cursor-pointer"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-3 lg:hidden">
              {isLoggedIn && (
                <div className="relative" ref={accountMenuRef}>
                  <div
                    onClick={() => setShowAccountMenu((v) => !v)}
                    className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white! font-bold cursor-pointer"
                  >
                    {email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  {showAccountMenu && (
                    <div className="absolute right-0 mt-3 z-50">
                      {renderAccountMenu(true)}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Open Menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* BACKDROP */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
      )}

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 z-50 h-full w-[80%] max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-5 border-b">
          <button
            onClick={closeAllMenus}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-6 space-y-5">
          {NavMenus.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeAllMenus}
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive
                    ? "text-orange-600"
                    : "text-gray-700 hover:text-orange-500"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {!isLoggedIn && (
            <button
              onClick={() => {
                closeAllMenus();
                navigate("/login");
              }}
              className="mt-8 w-full py-3 rounded-full bg-orange-500 text-white! font-semibold hover:bg-orange-600"
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </>
  );
}
