import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import enums from "enums";

{
  /* <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} /> */
}

export default ({ component: Component, roles, ...rest }) => {
  const currentUser = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        // if (!currentUser) {
        //   return (
        //     <Redirect
        //       to={{ pathname: "/signin", state: { from: props.location } }}
        //     />
        //   );
        // }

        if (currentUser.role === enums.UserRoles.STUDENT) {
          if (!currentUser.phone || !currentUser.email) {
            if (props.location.pathname === "/signupinfo") {
              return <Component {...props} />;
            } else {
              return <Redirect to={{ pathname: "/signupinfo" }} />;
            }
          }

          // if (!currentUser.phoneVerified) {
          //   if (props.location.pathname === "/verifyphone") {
          //     return <Component {...props} />;
          //   } else {
          //     return <Redirect to={{ pathname: "/verifyphone" }} />;
          //   }
          // }

          if (!currentUser.emailVerified) {
            if (props.location.pathname === "/emailconfirmation") {
              return <Component {...props} />;
            } else {
              return <Redirect to={{ pathname: "/emailconfirmation" }} />;
            }
          }

          if (
            props.location.pathname === "/signupinfo" ||
            // props.location.pathname === "/verifyphone" ||
            props.location.pathname === "/emailconfirmation"
          ) {
            return <Redirect to={{ pathname: "/" }} />;
          } else {
            return <Component {...props} />;
          }
        }

        if (roles && roles.indexOf(currentUser.role) === -1) {
          return <Redirect to={{ pathname: "/" }} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};
