import React from "react";
import logo from "@/assets/logo.png";
import { Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import { BsPinMap } from "react-icons/bs";

const Footer: React.FC = () => {
  const baseUrl = window.location.origin;
  const setingDataConfig = {
    email: "wd",
    headOffice: "wd",
    branchOffice: "wd",
  }

  return (
    <footer className="text-white bg-footer-custom !px-10 !pt-10 !pb-4 font-sans">
      <div className="footer-content grid grid-cols-1 lg:grid-cols-4">
        <div className=" flex flex-col items-center ">
          <div className="flex justify-center items-center !mb-2">
            <a href="#">
              <img
                src={logo}
                alt="Intellect Logo"
                className="h-18 w-auto footer-logo-img"
              />
            </a>
          </div>
          <div className="text-justify hyphens-auto flex justify-center items-center w-full md:w-1/2 lg:w-full !mb-4">
            <p className="text-sm text-gray-400 flex justify-center items-center text-justify hyphens-auto leading-6">
              Protecting your digital assets with cutting-edge cybersecurity
              solutions. We provide comprehensive security assessments,
              cybersecurity consulting services , and penetration testing to
              protect your business from evolving digital threats.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="!mt-2 lg:!mt-0">
          <h4 className="text-[#8ADF37] flex justify-center items-center text-2xl !mb-5">
            Quick Links
          </h4>
          <div className="flex justify-center items-center flex-col gap-3  ">
            <a href={baseUrl + "#"} className="hover:underline">
              Home
            </a>
            <a href={baseUrl + "#about"} className="hover:underline">
              About Us
            </a>
            <a href={baseUrl + "#products"} className="hover:underline">
              Services & Products
            </a>
            <a href={baseUrl + "#contact"} className="hover:underline">
              Contact Us
            </a>
          </div>
        </div>

        {/* contact info */}
        <div className="flex justify-center items-center flex-col !mt-8 lg:!mt-0">
          <h4 className="text-[#8ADF37] text-2xl !mb-5">Contact Info</h4>
          <ul className="flex flex-col gap-5 justify-center items-center lg:justify-start lg:items-start">
            {/* email */}
            <li className="flex flex-col text-sm">
              <a href={`mailto:${setingDataConfig.email}`}>
                <div className="flex flex-row ">
                  <div><Mail className="text-white !mr-3" /></div>
                  <div>
                    <span className="hover:text-green-300">
                      {setingDataConfig.email}
                    </span>
                  </div>
                </div>
              </a>
            </li>

            {/* head office */}
            <li className="lg:w-full md:w-1/2 ">
              <div className="flex flex-row ">
                <div><MapPin className="text-white !mr-3" /></div>
                <p className=" text-sm">
                  {setingDataConfig.headOffice}
                  {/* Intellect Application, <br /> 305-306 - 3rd floor, Tower A,{" "}
                  <br /> Spazedge - Sector 46, <br /> Sohna Road, <br />{" "}
                  Gurgaon, Haryana 122018 */}
                </p>
              </div>

              {/* branch office */}
              <div className="flex flex-row">
                <div><MapPin className="text-white !mr-3" /></div>
                <p className=" text-sm">
                  {setingDataConfig.branchOffice}
                  {/* Intellect Application,
                  <br /> "Shubham Complex", <br /> Oppo. Kalyan School,
                  <br /> Near Nagrik Bank, <br /> Hanuman Madhi chowk,
                  <br /> Rajkot - 360001 */}
                </p>
              </div>
            </li>
            {/* <li>Phone: +91 70960 70980</li> */}
          </ul>
        </div>

        {/* socials */}
        <div className="!mt-2 lg:!mt-0">
          <h4 className="text-[#8ADF37] flex justify-center items-center text-2xl !mb-5">
            Follow Us
          </h4>
          <div className="flex justify-center items-center gap-5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="social-icon" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="social-icon" />
            </a>
            <a
              href="https://github.com/theintellect218"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm !mt-6 !pt-6 border-t border-[#d1bebe5e]">
        <p>&copy; {new Date().getFullYear()} Intellect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
