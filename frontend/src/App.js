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

import { UserProvider } from "./UserContext";

function App() {
  return (
    <div>
      <Router>
        <UserProvider>
          <Navbar />
          <Switch>
            <PrivateRoute component={TaskList} path="/" exact />
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/password/reset">
              <PasswordReset />
            </Route>
            <PrivateRoute component={Profile} path="/profile" exact />
            <Route exact path="/profile/edit">
              <ProfileUpdate />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
