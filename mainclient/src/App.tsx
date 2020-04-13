import React, {Component} from 'react';
import SignIn from "./container/signin/SignIn";
import {Redirect, Route} from "react-router";
import SignUp from "./container/signup/SignUp";
import {ApplicationState} from "./configureStore";
import {connect} from "react-redux";
import Header from "./component/header/Header";
import "./App.css"
import AuthorizedRoute from "./component/customrouter/AuthorizedRoute";

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

                <Header/>

                <div className="mainContainer">
                    <Route path="/signin" exact>
                        {auth ? <Redirect to="/"/> : <SignIn/>}
                    </Route>
                    <Route path="/signup" exact>
                        {auth ? <Redirect to="/"/> : <SignUp/>}
                    </Route>

                    <AuthorizedRoute exact={true} path="/dashboard" component={<h1>DASHBOARD</h1>}/>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
    auth: state.authState.authStatus
});

export default connect<StateProps, {}, {}, ApplicationState>(mapStateToProps)(App);
