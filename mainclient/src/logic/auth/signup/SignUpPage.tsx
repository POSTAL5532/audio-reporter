import React, {useEffect} from 'react';
import {Card, Spin, Typography} from "antd";
import "logic/auth/signup/SignUpPage.css";
import SignUpForm from "logic/auth/signup/SignUpForm";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons/lib";
import AuthActionCreator from "logic/auth/AuthActionCreator";
import {ApplicationState} from "storeConfig";
import {register} from "logic/auth/authActions";
import {Dispatch} from "redux";

type StateProps = {
    loading: boolean;
    regError: boolean;
    regErrorMessage: string;
}

const SignUpPage = () => {
    const dispatch: Dispatch<any> = useDispatch<Dispatch<any>>();
    const {loading, regError, regErrorMessage} = useSelector<ApplicationState, StateProps>(
        (state: ApplicationState) => {
            return {
                loading: state.authState.loading,
                regError: state.authState.regError,
                regErrorMessage: state.authState.regErrorMessage
            }
        });

    useEffect(() => {
            dispatch(AuthActionCreator.setAuthErrorAction(false, null));
        },
        []
    );

    const onSubmit = (values: any): void => {
        dispatch(register(values.email, values.login, values.password, values.confirmPassword))
    };

    return (
        <div className="signUpContainer">
            <Typography.Title>Регистрация</Typography.Title>
            <Spin indicator={<LoadingOutlined style={{fontSize: 40}} spin/>}
                  size="large"
                  spinning={loading}>
                <Card>
                    <SignUpForm onSubmit={onSubmit}
                                error={regError}
                                errorMessage={regErrorMessage}/>
                </Card>
            </Spin>
        </div>
    );
};

export default SignUpPage;