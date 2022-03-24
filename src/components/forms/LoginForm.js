import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/features/auth/auth";
import { useNavigate } from "react-router";
import { popToast } from "../../redux/features/toast/toast";

const LoginForm = ({ firebase }) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
    }
  }, [auth.isAuthenticated]);

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
    const data = { values, firebase };
    dispatch(loginUser(data));
    dispatch(popToast("User Logged In!"));
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
    <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 ">
      <div className="form-group">
        <label htmlFor="" className="formlabel">
          email
        </label>
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
      </div>
      <div className="form-group">
        <label htmlFor="" className="formlabel">
          password
        </label>
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
      </div>
      <button
        type="submit"
        className="w-1/4 p-2 mt-10 text-lg border border-black font-vistol"
      >
        Sign In
      </button>

      {/* <div className="mt-4 text-center text-gray-500">OR</div>
      <div className="flex items-center justify-center mt-5 font-medium text-blue-900 text-md">
        <AiFillFacebook className="text-xl" />
        <Link to="/" className="text-center">
          Log in with Facebook
        </Link>
      </div>
      <div className="mt-3 text-sm text-center text-blue-900">
        <Link to="/">Forgot Password?</Link>
      </div> */}
    </form>
  );
};

export default LoginForm;
