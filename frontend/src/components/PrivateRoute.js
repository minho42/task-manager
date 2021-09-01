import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  return <Route {...rest} render={(props) => (user ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default PrivateRoute;
