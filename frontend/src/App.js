import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PasswordReset from "./components/PasswordReset";
import Profile from "./components/Profile";
import ProfileUpdate from "./components/ProfileUpdate";
import About from "./components/About";
import PrivateRoute from "./components/PrivateRoute";

import { UserContext } from "./UserContext";
import { CheckUser } from "./CheckUser";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    CheckUser(setUser);
  }, []);

  return (
    <div>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <TaskList />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/password/reset">
              <PasswordReset />
            </Route>
            {/* <Route exact path="/profile">
              <Profile />
            </Route> */}
            <PrivateRoute component={Profile} path="/profile" exact />
            <Route exact path="/profile/edit">
              <ProfileUpdate />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
