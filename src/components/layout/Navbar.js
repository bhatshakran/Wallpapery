import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiLoginCircleFill } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { FaUserPlus, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/features/auth/auth";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="w-full flex items-center justify-between py-3 px-3.5 border-b border-gray-200">
      <div className="text-3xl nav-brand font-grand-hotel ">
        <Link to="/">Wallpapery</Link>
      </div>
    </nav>
  );
};

export default Navbar;
