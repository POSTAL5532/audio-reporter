import React from 'react';
import {Layout} from "antd";
import {useSelector} from "react-redux";
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
    authStatus: boolean
}

const App = () => {
    const {authStatus} = useSelector<ApplicationState, StateProps>(
        state => ({authStatus: state.authState.authStatus})
    );

    return (
        <>
            <AppHeader/>

            {authStatus ? <ProfileHeaderInfoCard/> : null}

            <Route path="/" exact>
                <Redirect to={authStatus ? "/dashboard" : "/signin"}/>
            </Route>
            <Route path="/signin" exact>
                {authStatus ? <Redirect to="/"/> : <SignInPage/>}
            </Route>
            <Route path="/signup" exact>
                {authStatus ? <Redirect to="/"/> : <SignUpPage/>}
            </Route>
            <Route path="/error" exact component={ErrorPage}/>

            <Layout>
                {authStatus ? <SideMenu/> : null}
                <Content style={{background: "white", padding: "0 20px"}}>
                    <AuthorizedRoute exact={true} path="/dashboard" component={<DashboardPage/>}/>
                    <AuthorizedRoute exact={true} path="/profile" component={<ProfilePage/>}/>
                </Content>
            </Layout>
        </>
    );
};

export default App;
