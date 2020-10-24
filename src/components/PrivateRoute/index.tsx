import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from "hooks/useAuth";

interface PropTypes {
    [key: string]: any
}

function PrivateRoute(props: PropTypes) {
    const { isAuthenticated } = useAuth();
    const { component: Component, ...rest} = props;

    return (
        <Route {...rest} render={props => (
            isAuthenticated ?
                <Component {...props} />
            : <Redirect to="/auth/signin" />
        )} />
    )
}

export default PrivateRoute;
