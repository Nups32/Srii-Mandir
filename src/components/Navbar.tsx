import { Link, NavLink } from "react-router-dom";

const menu = [
  { name: "Home", path: "/" },
  { name: "Pooja", path: "/pooja" },
  { name: "Chadhava", path: "/chadhava" },
  { name: "Instant Solutions", path: "/instant-solutions" },
  { name: "Mandir", path: "/mandir" },
  { name: "Media", path: "/media" },
  { name: "Vedic Science", path: "/vedic-science" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-10" />
            <span className="font-semibold text-orange-600">
              Shri Mandir
            </span>
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-orange-600"
                      : "text-gray-700 hover:text-orange-500"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <Link
            to="/vedic-science"
            className="hidden md:inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600"
          >
            Get Guidance
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;