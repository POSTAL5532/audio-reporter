import React, {Component} from 'react';
import {Card, Spin, Typography} from "antd";
import "logic/auth/signup/SignUpPage.css";
import SignUpForm from "logic/auth/signup/SignUpForm";
import {connect} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons/lib";
import AuthActionCreator from "logic/auth/AuthActionCreator";
import {AuthState} from "logic/auth/authTypes";
import {ApplicationState} from "storeConfig";
import {register} from "logic/auth/authActions";

type DispatchProps = {
    register: (email: string, login: string, password: string, confirmPassword: string) => void;
    clearSignUpError: () => void;
}

type StateProps = {
    authState: AuthState;
}

type SignUpProps = DispatchProps & StateProps;

class SignUpPage extends Component<SignUpProps> {

    componentDidMount(): void {
        this.props.clearSignUpError();
    }

    onSubmit = (values: any): void => {
        this.props.register(values.email, values.login, values.password, values.confirmPassword);
    };

    render(): React.ReactNode {
        return (
            <div className="signUpContainer">
                <Typography.Title>Регистрация</Typography.Title>
                <Spin indicator={<LoadingOutlined style={{fontSize: 40}} spin/>}
                      size="large"
                      spinning={this.props.authState.loading}>
                    <Card>
                        <SignUpForm onSubmit={this.onSubmit}
                                    error={this.props.authState.regError}
                                    errorMessage={this.props.authState.authErrorMessage}/>
                    </Card>
                </Spin>
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
    authState: state.authState
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    register: (email: string, login: string, password: string, confirmPassword: string) =>
        dispatch(register(email, login, password, confirmPassword)),
    clearSignUpError: () => dispatch(AuthActionCreator.setRegErrorAction(false, null))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);