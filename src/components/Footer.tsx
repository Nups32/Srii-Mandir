// import { Github, Linkedin, Twitter } from "lucide-react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerServices = [
    { label: "Puja Services", href: "/puja" },
    { label: "Chadhava", href: "/chadhava" },
    // { label: "Instant Solutions", href: "/solutions" },
    { label: "Vedic Science", href: "/vedic-science" },
    { label: "Contact Us", href: "/contact" },
  ];

  const footerExplore = [
    // { label: "Mandir", href: "/mandir" },
    { label: "Media", href: "/media" },
    { label: "Live Katha", href: "/media/katha" },
    { label: "About Guru", href: "/shakti-sanyas" },
  ];

  return (
    <footer className="bg-linear-to-br from-orange-400 to-yellow-600">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div>
          {/* logo */}
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Logo" className="h-20" />
            {/* <span className="font-semibold text-orange-600">Srii Mandir</span> */}
          </Link>

          <p className="text-sm text-gray-50 text-justify hyphens-auto">
            Srii Mandir has brought religious services to the masses in India by
            connecting devotees, pandits and temples. Partnering with over 100
            renowned temples, we provide exclusive pujas and offerings performed
            by expert pandits and share videos of the completed puja rituals.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-white text-xl">Services</h4>
          <ul className="space-y-2 text-sm text-gray-50">
            {footerServices.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="hover:underline transition font-semibold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-white text-xl">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-50">
            {footerExplore.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="hover:underline transition text-gray-50 font-semibold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-white text-xl">Contact</h4>
          <a
            href="mailto: support@devpuja.com"
            className="hover:underline transition text-gray-50 font-semibold"
          >
            Email: support@sriimandir.com
          </a>

          {/* socials */}
          {/* <div className="flex flex-row gap-3 mt-5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="text-white mr-2 hover:text-gray-200" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="text-white mr-2 hover:text-gray-200" />
            </a>
          </div> */}
        </div>
      </div>

      <div className="border-t text-center text-sm py-4 text-gray-300">
        © {new Date().getFullYear()} Srii Mandir. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
