import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" replace={true} />
        )
      }
    />
  );
}

export default ProtectedRoute;
