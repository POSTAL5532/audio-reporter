import React, {Component} from 'react';
import {Card, Spin, Typography} from "antd";
import {connect} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons/lib";
import SignInForm from "container/signin/SignInForm";
import {authorize} from "store/auth/actions";
import {ApplicationState} from "configureStore";
import {AuthState} from "store/auth/types";
import AuthActionCreator from "store/auth/AuthActionCreator";
import "container/signin/SignIn.css";

type DispatchProps = {
    authorize: (loginOrEmail: string, password: string) => void;
    clearSignInError: () => void;
}

type StateProps = {
    authState: AuthState;
}

type SignInProps = DispatchProps & StateProps;

class SignIn extends Component<SignInProps> {

    componentDidMount(): void {
        this.props.clearSignInError();
    }

    onSubmit = (values: any): void => {
        this.props.authorize(values.loginOrEmail, values.password);
    };

    render(): React.ReactNode {
        return (
            <div className="signInContainer">
                <Typography.Title>Вход</Typography.Title>
                <Spin indicator={<LoadingOutlined style={{fontSize: 40}} spin/>}
                      size="large"
                      spinning={this.props.authState.loading}>

                    <Card>
                        <SignInForm onSubmit={this.onSubmit}
                                    error={this.props.authState.authError}
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
    authorize: (loginOrEmail: string, password: string) => dispatch(authorize(loginOrEmail, password)),
    clearSignInError: () => dispatch(AuthActionCreator.setAuthErrorAction(false, null))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);