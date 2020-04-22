import React, {Component} from 'react';
import {Card, Spin, Typography} from "antd";
import "container/signup/SignUp.css";
import SignUpForm from "container/signup/SignUpForm";
import {AuthState} from "store/auth/types";
import {ApplicationState} from "store/configureStore";
import {register} from "store/auth/actions";
import {connect} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons/lib";
import AuthActionCreator from "store/auth/AuthActionCreator";

type DispatchProps = {
    register: (email: string, login: string, password: string, confirmPassword: string) => void;
    clearSignUpError: () => void;
}

type StateProps = {
    authState: AuthState;
}

type SignUpProps = DispatchProps & StateProps;

class SignUp extends Component<SignUpProps> {

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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);