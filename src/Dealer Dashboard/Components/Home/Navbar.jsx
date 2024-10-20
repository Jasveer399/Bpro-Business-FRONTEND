import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="flex items-center justify-between bg-primary py-4 px-8 text-white font-montserrat">
        <div className="flex items-center gap-4">
          <FaFacebookF size={20} className="cursor-pointer" />
          <GrInstagram size={20} className="cursor-pointer" />
          <FaLinkedinIn size={20} className="cursor-pointer" />
        </div>
        <div className="flex items-center gap-8">
            <Link>About Us</Link>
            <Link>Blogs</Link>
            <Link>Contact Us</Link>
            <Link>Register/Login</Link>
            <Link>Register/Login</Link>
            <div className="flex items-center gap-1">
                <img src="/eng.png" className="w-5 h-5" />
                <Link>ENG</Link>
            </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
