import React, {Component} from 'react';
import SignIn from "../signin/SignIn";
import {Redirect, Route} from "react-router";
import SignUp from "../signup/SignUp";
import {ApplicationState} from "../../configureStore";
import {connect} from "react-redux";
import AuthorizedRoute from "../../component/customrouter/AuthorizedRoute";
import Dashboard from "../dashboard/Dashboard";
import Profile from "../profile/Profile";
import {Layout} from "antd";
import AppHeader from "../../component/appheader/AppHeader";
import SideMenu from "../../component/side/SideMenu";
import ErrorPage from "../ErrorPage";
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
