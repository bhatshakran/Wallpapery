import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiLoginCircleFill } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { FaUserPlus, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { logOutUser } from "../../redux/features/auth/auth";
import { useDispatch } from "react-redux";
import { popToast } from "../../redux/features/toast/toast";
import wallpapery from "../../images/wallpapery.png";

const Navbar = ({ firebase }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isAuthenticated = auth.isAuthenticated;

  const logout = () => {
    dispatch(logOutUser(firebase));
    dispatch(popToast("User Logged Out"));
  };

  return (
    <nav className="h-60 w-full flex items-center justify-between py-3 px-3.5 border-b border-gray-200">
      <div className="text-6xl italic nav-brand">
        <Link to="/">
          <img src={wallpapery} alt="" className="h-64 w-80" />
        </Link>
      </div>
      <ul className="flex items-center gap-4 nav-items ">
        <li className="text-xl cursor-pointer nav-item">
          <Link to="/">
            {" "}
            <AiFillHome />
          </Link>
        </li>
        {isAuthenticated !== false ? (
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
