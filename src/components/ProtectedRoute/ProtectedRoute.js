import React from "react";
import { Navigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const ProtectedRoute = ({ element: Component, ...props }) => {
  // if (props.isAppIsReady) {
  //   return <Preloader />;
  // } else if (!props.loggedIn) {
  //   return <Navigate to="/" replace />;
  // } else {
  //   return <Component {...props} />;
  // }

  // if (props.isAppIsReady) return <Preloader />;
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" replace />
  );

  //   if (props.isAppIsReady) {
  //   return <Preloader />;
  // } else {
  //     return props.loggedIn ? (
  //   <Component {...props} />
  // ) : (
  //   <Navigate to="/" replace />
  // );
  // }


};

export default ProtectedRoute;
