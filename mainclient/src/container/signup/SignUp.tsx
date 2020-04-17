import React, {Component} from 'react';
import {Card, Spin, Typography} from "antd";
import "./SignUp.css";
import SignUpForm from "./SignUpForm";
import {AuthState} from "../../store/auth/types";
import {ApplicationState} from "../../configureStore";
import {register} from "../../store/auth/actions";
import {connect} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons/lib";

type DispatchProps = {
    register: (email: string, login: string, password: string, confirmPassword: string) => void
}

type StateProps = {
    authState: AuthState;
}

type SignUpProps = DispatchProps & StateProps;

class SignUp extends Component<SignUpProps> {

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
    register: (email: string, login: string, password: string, confirmPassword: string) =>
        dispatch(register(email, login, password, confirmPassword))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);