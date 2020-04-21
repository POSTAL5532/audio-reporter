import React, {Component} from 'react';
import {Layout} from "antd";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router";
import SignIn from "container/signin/SignIn";
import SignUp from "container/signup/SignUp";
import {ApplicationState} from "configureStore";
import AuthorizedRoute from "component/customrouter/AuthorizedRoute";
import Dashboard from "container/dashboard/Dashboard";
import Profile from "container/profile/Profile";
import AppHeader from "component/appheader/AppHeader";
import SideMenu from "component/side/SideMenu";
import ErrorPage from "container/ErrorPage";
import HeadUserCard from "component/appheader/HeadUserCard";
import "./App.css";

const {Content} = Layout;

type StateProps = {
    auth: boolean
}

class App extends Component<StateProps> {

    render(): React.ReactNode {
        const {auth} = this.props;

        return (
            <>
                <AppHeader/>

                {auth
                    ? <HeadUserCard/>
                    : null}

                <Route path="/" exact>
                    <Redirect to={auth ? "/dashboard" : "/signin"}/>
                </Route>
                <Route path="/signin" exact>
                    {auth ? <Redirect to="/"/> : <SignIn/>}
                </Route>
                <Route path="/signup" exact>
                    {auth ? <Redirect to="/"/> : <SignUp/>}
                </Route>
                <Route path="/error" exact component={ErrorPage}/>

                <Layout>
                    {auth
                        ? <SideMenu/>
                        : null}
                    <Content style={{background: "white", padding: "0 20px"}}>
                        <AuthorizedRoute exact={true} path="/dashboard" component={<Dashboard/>}/>
                        <AuthorizedRoute exact={true} path="/profile" component={<Profile/>}/>
                    </Content>
                </Layout>
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
    auth: state.authState.authStatus
});

export default connect<StateProps, {}, {}, ApplicationState>(mapStateToProps)(App);
