import React, { ReactElement } from "react";
import { Switch, Route, Redirect, match } from "react-router-dom";
import useAuth from "hooks/useAuth";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

type MatchParams = {
    path: string;
  };
  
  type Props = {
    match: match<MatchParams>;
  };

 function Auth(props: Props): ReactElement {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
      return (
        <Redirect to="/" />
      );
    }

    return (
        <Switch>
            <Route exact path={`${props.match.path}/signin`} component={SignIn} />
            <Route exact path={`${props.match.path}/signup`} component={SignUp} />
            <Redirect to="/auth/signin" />
        </Switch>
    );
}

export default Auth;