import React, {Component} from 'react';
import {Layout} from "antd";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router";
import AuthorizedRoute from "component/AuthorizedRoute";
import AppHeader from "component/AppHeader";
import ErrorPage from "logic/ErrorPage";
import "App.css";
import SideMenu from "component/sidemenu/SideMenu";
import ProfileHeaderInfoCard from "logic/profile/ProfileHeaderInfoCard";
import DashboardPage from "logic/dashboard/DashboardPage";
import SignInPage from "logic/auth/signin/SignInPage";
import SignUpPage from "logic/auth/signup/SignUpPage";
import ProfilePage from "logic/profile/ProfilePage";
import {ApplicationState} from "storeConfig";

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
                    ? <ProfileHeaderInfoCard/>
                    : null}

                <Route path="/" exact>
                    <Redirect to={auth ? "/dashboard" : "/signin"}/>
                </Route>
                <Route path="/signin" exact>
                    {auth ? <Redirect to="/"/> : <SignInPage/>}
                </Route>
                <Route path="/signup" exact>
                    {auth ? <Redirect to="/"/> : <SignUpPage/>}
                </Route>
                <Route path="/error" exact component={ErrorPage}/>

                <Layout>
                    {auth
                        ? <SideMenu/>
                        : null}
                    <Content style={{background: "white", padding: "0 20px"}}>
                        <AuthorizedRoute exact={true} path="/dashboard" component={<DashboardPage/>}/>
                        <AuthorizedRoute exact={true} path="/profile" component={<ProfilePage/>}/>
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
