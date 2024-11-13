import React, { useState } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-primary text-white font-montserrat">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between py-4 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <FaFacebookF size={20} className="cursor-pointer hover:opacity-80" />
          <GrInstagram size={20} className="cursor-pointer hover:opacity-80" />
          <FaLinkedinIn size={20} className="cursor-pointer hover:opacity-80" />
        </div>
        <div className="flex items-center gap-4 lg:gap-8">
          <Link href="/about" className="hover:opacity-80">
            About Us
          </Link>
          <Link to="/Allblogs" className="hover:opacity-80">
            Blogs
          </Link>
          <Link href="/contact" className="hover:opacity-80">
            Contact Us
          </Link>
          <Link href="/auth" className="hover:opacity-80">
            Register/Login
          </Link>
          <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
            <img src="/eng.png" alt="Language" className="w-5 h-5" />
            <span>ENG</span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <FaFacebookF size={20} className="cursor-pointer" />
            <GrInstagram size={20} className="cursor-pointer" />
            <FaLinkedinIn size={20} className="cursor-pointer" />
          </div>
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${isOpen ? "block" : "hidden"} px-4 pb-4`}>
          <div className="flex flex-col space-y-4">
            <Link href="/about" className="hover:opacity-80">
              About Us
            </Link>
            <Link to="/Allblogs" className="hover:opacity-80">
              Blogs
            </Link>
            <Link href="/contact" className="hover:opacity-80">
              Contact Us
            </Link>
            <Link href="/auth" className="hover:opacity-80">
              Register/Login
            </Link>
            <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
              <img src="/eng.png" alt="Language" className="w-5 h-5" />
              <span>ENG</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
