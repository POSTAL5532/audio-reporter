import React, {useEffect} from 'react';
import {Card, Spin, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons/lib";
import SignInForm from "logic/auth/signin/SignInForm";
import AuthActionCreator from "logic/auth/AuthActionCreator";
import "logic/auth/signin/SignInPage.css";
import {ApplicationState} from "storeConfig";
import {authorize} from "logic/auth/authActions";
import {Dispatch} from "redux";

type StateProps = {
    loading: boolean;
    authError: boolean;
    authErrorMessage: string;
}

const SignInPage = () => {
    const dispatch: Dispatch<any> = useDispatch<Dispatch<any>>();
    const {loading, authError, authErrorMessage} = useSelector<ApplicationState, StateProps>(
        (state: ApplicationState) => {
            return {
                loading: state.authState.loading,
                authError: state.authState.authError,
                authErrorMessage: state.authState.authErrorMessage
            }
        });

    useEffect(() => {
            dispatch(AuthActionCreator.setAuthErrorAction(false, null));
        },
        []
    );

    const onSubmit = (values: any): void => {
        dispatch(authorize(values.loginOrEmail, values.password))
    };

    return (
        <div className="signInContainer">
            <Typography.Title>Вход</Typography.Title>
            <Spin indicator={<LoadingOutlined style={{fontSize: 40}} spin/>}
                  size="large"
                  spinning={loading}>

                <Card>
                    <SignInForm onSubmit={onSubmit}
                                error={authError}
                                errorMessage={authErrorMessage}/>
                </Card>
            </Spin>
        </div>
    );
};

export default SignInPage;