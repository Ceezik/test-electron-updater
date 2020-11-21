import React from "react";
import { useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Signin from "./containers/Signin";
import SplashScreen from "./components/SplashScreen";
import UpdateManager from "./containers/UpdateManager";
import { getUpdateManagerState } from "./containers/UpdateManager/selectors";
import UserManager from "./containers/UserManager";
import { getUserManagerState } from "./containers/UserManager/selectors";
import history from "../utils/history";

function Home() {
  return <p>home</p>;
}

export default function App() {
  const { status, loading: checkingVersion } = useSelector(
    getUpdateManagerState
  );
  const { loading: fetchingUser } = useSelector(getUserManagerState);

  return (
    <>
      <UpdateManager />
      <UserManager />

      {checkingVersion || fetchingUser ? (
        <SplashScreen status={status} />
      ) : (
        <Router history={history}>
          <Link to="/">Home</Link>
          <Link to="/signin">Signin</Link>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/signin" component={Signin} />
          </Switch>
        </Router>
      )}
    </>
  );
}
