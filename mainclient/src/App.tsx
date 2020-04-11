import React, {Component} from 'react';
import {PageHeader} from "antd";
import SignIn from "./container/signin/SignIn";
import {Redirect, Route} from "react-router";
import SignUp from "./container/signup/SignUp";
import {ApplicationState} from "./configureStore";
import {connect} from "react-redux";

type StateProps = {
    auth: boolean
}

class App extends Component<StateProps> {

    render(): React.ReactNode {
        const {auth} = this.props;

        return (
            <>
                <Route path="/" exact>
                    <Redirect to={auth ? "/dashboard" : "/signin"}/>
                </Route>

                <PageHeader title="Main client" subTitle="This is a subtitle"/>

                <Route path="/signin" exact>
                    {auth ? <Redirect to="/"/> : <SignIn/>}
                </Route>
                <Route path="/signup" exact>
                    {auth ? <Redirect to="/"/> : <SignUp/>}
                </Route>
                <Route path="/dashboard" exact render={() => <h1>Hello AUTH</h1>}/>
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
    auth: state.authState.auth
});

export default connect<StateProps, {}, {}, ApplicationState>(mapStateToProps)(App);
