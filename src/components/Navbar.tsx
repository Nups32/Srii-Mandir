import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.jpg"

const menu = [
  { name: "Home", path: "/" },
  { name: "Puja", path: "/puja" },
  { name: "Chadhava", path: "/chadhava" },
  // { name: "Instant Solutions", path: "/instant-solutions" },
  // { name: "Mandir", path: "/mandir" },
  { name: "Library", path: "/media" },
  { name: "Vedic Science", path: "/vedic-science" },
  { name: "Shakti Sanyans", path: "/shakti-sanyans" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  // useEffect(() => setIsOpen(false), [location.pathname]);
  // useEffect(() => (document.body.style.overflow = isOpen ? "hidden" : "auto"), [isOpen]);

  /* Close menu on route change */
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  /* Close on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setIsOpen(false);
    };
    if (isOpen) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const navLinkClasses = (isActive: boolean) =>
    `text-md font-medium transition ${
      isActive ? "text-orange-600" : "text-gray-700 hover:text-orange-500"
    }`;

  return (
    <>
      {/* header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-20" />
              {/* <span className="font-semibold text-orange-600">Srii Mandir</span> */}
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-6">
              {menu.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => navLinkClasses(isActive)}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Login */}
            <Link
              to="/login"
              className="hidden lg:inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600"
            >
              Login
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity" />
      )}

      {/* mobile menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 z-50 h-full w-[80%] max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <span className="font-semibold text-orange-600">Srii Mandir</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close Menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-6 space-y-5">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
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
          <Link
            to="/login"
            className="mt-6 bg-orange-400 text-white py-3 rounded-full text-center font-semibold hover:bg-orange-600"
          >
            Login
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
