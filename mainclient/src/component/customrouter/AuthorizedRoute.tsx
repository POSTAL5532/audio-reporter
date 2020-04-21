import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router";
import {AuthState} from "store/auth/types";
import {ApplicationState} from "configureStore";

type ComponentProps = {
    component: Component;
    path: string;
    exact: boolean;
};

type StateProps = {
    authState: AuthState;
}

type AuthorizedRouteProps = ComponentProps & StateProps;

class AuthorizedRoute extends Component<AuthorizedRouteProps> {

    render(): React.ReactNode {
        return (
            <Route exact={this.props.exact} path={this.props.path}>
                {
                    this.props.authState.authStatus
                        ? this.props.component
                        : <Redirect to="/"/>
                }
            </Route>
        );
    }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
    authState: state.authState
});

export default connect(mapStateToProps, {})(AuthorizedRoute);