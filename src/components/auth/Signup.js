import React from "react";
import signupavatar from "../../images/signupavatar.svg";
import signupsvg from "../../images/signup.svg";
import SignupForm from "../forms/SignupForm";
import { FirebaseContext } from "../../firebase";

const Signup = () => {
  return (
    <div className="h-auto gap-16 py-2 pb-10 mt-8 md:flex centerafterlg">
      <div className="flex items-center md:w-1/2 pane-l">
        <img src={signupsvg} alt="" className="mx-auto md:m-0 w-80 md:w-full" />
      </div>
      <div className="mt-28 md:w-1/2 pane-r md:m-0">
        <div>
          <h1 className="text-center">Sign Up</h1>
          <img src={signupavatar} alt="" className="w-24 h-24 mx-auto mt-12" />
        </div>
        <FirebaseContext.Consumer>
          {(firebase) => <SignupForm firebase={firebase} />}
        </FirebaseContext.Consumer>
      </div>
      {/* <div className="flex items-center justify-center mx-auto mt-3 text-sm border border-gray-200 smallcard">
        <span>Have an account?</span>
        <Link to="/login" className="ml-2 text-blue-900">
          Login
        </Link>
      </div> */}
    </div>
  );
};

export default Signup;
