import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import { FirebaseContext } from "../../firebase";

const Login = () => {
  return (
    <React.Fragment>
      <div className="mx-auto mt-8 border border-gray-200 card">
        <h1 className="pt-6 text-5xl text-center font-grand-hotel">
          Wallpapery
        </h1>
        <FirebaseContext.Consumer>
          {(firebase) => <LoginForm firebase={firebase} />}
        </FirebaseContext.Consumer>
      </div>
      <div className="flex items-center justify-center mx-auto mt-3 text-sm border border-gray-200 smallcard">
        <span className="font-light ">Don't have an account?</span>
        <Link to="/signup" className="ml-2 text-blue-900">
          Signup
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Login;
