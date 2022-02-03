import React from "react";
import { Link } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import SignupForm from "../forms/SignupForm";

const Signup = () => {
  // let msg = useSelector((state) => state.users.message);
  let msg = "abc";

  const getMsg = (val) => {
    console.log(val);
  };
  return (
    <React.Fragment>
      <div className="mx-auto mt-8 border border-gray-200 largecard">
        {/* {msg !== "" ? (
          <div className="w-full mt-2 mb-2 text-white bg-blue-500">{msg}</div>
        ) : (
          ""
        )} */}
        <h1 className="pt-6 text-5xl text-center font-grand-hotel">
          Wallpapery
        </h1>
        <h2 className="w-3/4 mx-auto mt-4 font-bold text-center text-gray-500 text-md">
          Sign up to like, comment and share photos.
        </h2>
        <div className="flex items-center justify-center w-3/4 py-1 mx-auto mt-5 font-medium text-white rounded-sm bg-instablue-default text-md">
          <AiFillFacebook className="text-xl" />
          <Link to="/facebook" className="text-center">
            Log in with Facebook
          </Link>
        </div>
        <div className="mt-4 text-center text-gray-500">OR</div>
        <SignupForm />
      </div>
      <div className="flex items-center justify-center mx-auto mt-3 text-sm border border-gray-200 smallcard">
        <span>Have an account?</span>
        <Link to="/login" className="ml-2 text-blue-900">
          Login
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Signup;
