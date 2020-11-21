import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getUserManagerState } from "../../containers/UserManager/selectors";

interface Props {
  component: () => JSX.Element;
  [key: string]: any;
}

export default function PrivateRoute({ component: Component, ...rest }: Props) {
  const { user } = useSelector(getUserManagerState);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}
