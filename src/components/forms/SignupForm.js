import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/features/register/register";

const SignupForm = ({ firebase }) => {
  const dispatch = useDispatch();

  // Validate form input fields using formik
  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Please enter a password";
    } else if (values.password.length > 20) {
      errors.password = "Must be 20 characters or less";
    } else if (values.password.length < 6) {
      errors.password = "Must be 6 characters or more";
    }

    if (!values.email) {
      errors.email = "Please enter a email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  // Submit function
  const onSubmit = (values) => {
    const data = { values, firebase };
    dispatch(registerUser(data));
  };

  //   Formik form instantiation using useFormik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit,
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      action=""
      className="grid grid-cols-1 "
    >
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
        Sign Up
      </button>
      <span className="w-3/4 mt-4 text-xs text-gray-500 font-vistol opacity-60">
        By signing up, you agree to our{" "}
        <strong> Terms , Data Policy and Cookies Policy .</strong>
      </span>
    </form>
  );
};

export default SignupForm;
