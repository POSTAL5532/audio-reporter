import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router";
import {AuthState} from "logic/auth/authTypes";
import {ApplicationState} from "storeConfig";

type ComponentProps = {
    component: JSX.Element;
    path: string;
    exact: boolean;
};

type StateProps = {
    authState: AuthState;
}

const AuthorizedRoute = ({component, path, exact}: ComponentProps) => {
    const {authState} = useSelector<ApplicationState, StateProps>(state => ({authState: state.authState}));

    return (
        <Route exact={exact} path={path}>
            {authState.authStatus ? component : <Redirect to="/"/>}
        </Route>
    );
};

export default AuthorizedRoute;