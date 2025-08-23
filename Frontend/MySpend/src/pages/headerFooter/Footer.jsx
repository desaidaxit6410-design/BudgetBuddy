import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from '../../assets/images/card_1.svg';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo/Image */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10"
          />
          <span className="text-lg font-semibold"> <a href="#" className="hover:text-gray-400">MySpend</a></span>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 text-2xl">
          <a
            href="https://github.com/shivam15102005"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/shivam-kumar-gupta-4294832b6"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://x.com/Shivam__Gupta15?t=MCjVNxm_IrDP3QobaRg8KQ&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/shi._.vamo_o"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} MySpend. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
