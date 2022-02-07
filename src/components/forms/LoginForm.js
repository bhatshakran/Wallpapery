import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { useDispatch } from "react-redux";
// import { loginUser } from "../../redux/features/auth/auth";
// import { useHistory } from "react-router";

const LoginForm = ({ firebase }) => {
  //   const history = useHistory();
  const auth = useSelector((state) => state.auth);
  console.log(firebase);

  //   useEffect(() => {
  //     if (auth.isAuthenticated) {
  //       history.push("/");
  //     }
  //   }, [auth.isAuthenticated]);

  const dispatch = useDispatch();
  // Validate form values
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Must be 6 characters or more";
    }

    return errors;
  };

  const onSubmit = (values) => {
    // dispatch(loginUser(values));
    console.log("submitted");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 mt-4">
      <input
        type="email"
        name="email"
        id="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        className="form-control"
        placeholder="Email"
      />
      {formik.errors.email ? (
        <div className="w-2/3 mx-auto text-xs text-red-600">
          {formik.errors.email}
        </div>
      ) : null}
      <input
        type="password"
        name="password"
        id="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        className="form-control"
        placeholder="Password"
      />
      {formik.errors.password ? (
        <div className="w-2/3 mx-auto text-xs text-red-600">
          {formik.errors.password}
        </div>
      ) : null}
      <button
        type="submit"
        className="w-3/4 py-1 mx-auto mt-4 text-white bg-blue-300 rounded-sm cursor-pointer hover:bg-blue-600"
      >
        Login
      </button>

      <div className="mt-4 text-center text-gray-500">OR</div>
      <div className="flex items-center justify-center mt-5 font-medium text-blue-900 text-md">
        <AiFillFacebook className="text-xl" />
        <Link to="/" className="text-center">
          Log in with Facebook
        </Link>
      </div>
      <div className="mt-3 text-sm text-center text-blue-900">
        <Link to="/">Forgot Password?</Link>
      </div>
    </form>
  );
};

export default LoginForm;
