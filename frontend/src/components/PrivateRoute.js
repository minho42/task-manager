import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Route, Redirect, useLocation } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, isLoading } = useContext(UserContext);
  const { state } = useLocation();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          return <div className="text-center">Loading...</div>;
        }
        if (!user) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
        if (user) {
          return <Component {...props} />;
        }
        // return isLoading && user ? (
        //   <Component {...props} />
        // ) : (
        //   <Redirect
        //     to={{
        //       pathname: "/login",
        //       state: { from: props.location },
        //     }}
        //   />
        // );
      }}
    />
  );
};

export default PrivateRoute;
