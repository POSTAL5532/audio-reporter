import React, {Component} from 'react';
import {Card, Spin, Typography} from "antd";
import "./SignIn.css";
import AuthService from "../../service/auth/AuthService";
import {LoadingOutlined} from "@ant-design/icons/lib";
import {ACCESS_TOKEN} from "../../config";
import SignInForm from "./SignInForm";
import {setAuth} from "../../store/auth/actions";
import {connect} from "react-redux";


type SignInState = {
    loading: boolean;
    error: boolean;
    errorMessage: string;
}

type DispatchProps = {
    setAuth: (auth: boolean) => {}
}

type SignInProps = DispatchProps;

class SignIn extends Component<SignInProps, SignInState> {

    state: SignInState = {
        loading: false,
        error: false,
        errorMessage: null
    };

    authService: AuthService = new AuthService();

    onSubmit = (values: any): void => {
        this.setState({
            loading: true,
            error: false,
            errorMessage: null
        });

        this.authService.signIn(values.loginOrEmail, values.password)
            .then(data => {
                localStorage.setItem(ACCESS_TOKEN, data.token);
                this.props.setAuth(true);
                this.setState({...this.state, loading: false});
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: true,
                    errorMessage: "Не верный логин или пароль"
                });
            });
    };

    render(): React.ReactNode {
        return (
            <div className="signInContainer">
                <Typography.Title>Вход</Typography.Title>
                <Spin indicator={<LoadingOutlined style={{fontSize: 30}} spin/>}
                      size="large"
                      spinning={this.state.loading}>

                    <Card>
                        <SignInForm onSubmit={this.onSubmit}
                                    error={this.state.error}
                                    errorMessage={this.state.errorMessage}/>
                    </Card>
                </Spin>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    setAuth: (auth: boolean) => dispatch(setAuth(auth))
});

export default connect(null, mapDispatchToProps)(SignIn);