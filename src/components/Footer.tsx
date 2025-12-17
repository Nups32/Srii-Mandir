import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h3 className="font-semibold text-orange-600 mb-2">
            Dev Puja
          </h3>
          <p className="text-sm text-gray-600">
            Dev Puja has brought religious services to the masses in India by connecting devotees, pandits and temples. Partnering with over 100 renowned temples, we provide exclusive pujas and offerings performed by expert pandits and share videos of the completed puja rituals.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Puja Services</li>
            <li>Chadhava</li>
            <li>Instant Solutions</li>
            <li>Vedic Science</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Mandir</li>
            <li>Media</li>
            <li>Live Katha</li>
            <li>About Guru</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-gray-600">
            Email: support@devpuja.com
          </p>

           <div className="flex flex-row gap-3 mt-5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 hover:text-blue-500" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="mr-2 hover:text-blue-500" />
              </a>
              <a
                href="https://github.com/theintellect218"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 hover:text-blue-500" />
              </a>
            </div>
        </div>
      </div>

      <div className="border-t text-center text-sm py-4 text-gray-500">
        © {new Date().getFullYear()} Dev Puja. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;