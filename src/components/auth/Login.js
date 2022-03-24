import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import { FirebaseContext } from "../../firebase";
import loginsvg from "../../images/login.svg";
import avatarmale from "../../images/avatarmale.svg";

const Login = () => {
  return (
    <div className="h-auto py-2 pb-10 mt-8 md:flex centerafterlg">
      <div className="flex items-center md:w-1/2 pane-l">
        <img src={loginsvg} alt="" className="mx-auto md:m-0 h-52 md:h-96" />
      </div>
      <div className="mt-28 md:w-1/2 pane-r md:m-0">
        <div>
          <h1 className="text-center">Sign In</h1>
          <img src={avatarmale} alt="" className="w-24 h-24 mx-auto mt-12" />
        </div>
        <FirebaseContext.Consumer>
          {(firebase) => <LoginForm firebase={firebase} />}
        </FirebaseContext.Consumer>
      </div>
    </div>
  );
};

export default Login;
