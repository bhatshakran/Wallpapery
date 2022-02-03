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
  const isAuthenticated = "";

  const logout = () => {
    console.log("logging out man");
  };

  return (
    <nav className="w-full flex items-center justify-between py-3 px-3.5 border-b border-gray-200">
      <div className="text-3xl nav-brand  ">
        <Link to="/">Wallpapery</Link>
      </div>
      <ul className="flex items-center gap-4 nav-items ">
        <li className="text-xl cursor-pointer nav-item">
          <Link to="/">
            {" "}
            <AiFillHome />
          </Link>
        </li>
        {isAuthenticated !== "" ? (
          <React.Fragment>
            <li
              className="mt-1 text-xl cursor-pointer nav-item"
              onClick={logout}
            >
              <GoSignOut />
            </li>
            <li className="text-xl cursor-pointer nav-item">
              <Link to="/profile">
                {" "}
                <FaUserCircle />
              </Link>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li className="text-xl cursor-pointer nav-item">
              <Link to="/login">
                <RiLoginCircleFill />
              </Link>
            </li>

            <li className="text-xl cursor-pointer nav-item">
              <Link to="/signup">
                <FaUserPlus />
              </Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
