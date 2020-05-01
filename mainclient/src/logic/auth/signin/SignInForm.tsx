import React from 'react';
import {Alert, Button, Form, Input} from "antd";
import {Link} from "react-router-dom";
import UserDataRule from "secure/UserDataRule";
import {LockOutlined, UserOutlined} from "@ant-design/icons/lib";

type SignInFormProps = {
    error: boolean;
    errorMessage: string;
    onSubmit: (values: any) => void;
}

const SignInForm = ({error, errorMessage, onSubmit}: SignInFormProps) => {
    return (
        <>
            <Form id="signInForm" size="large" onFinish={onSubmit}>
                <Form.Item
                    name="loginOrEmail"
                    rules={UserDataRule.loginOrEmailRules()}
                    validateTrigger="onBlur">
                    <Input prefix={<UserOutlined/>} placeholder="Логин или email"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={UserDataRule.passwordRules()}
                    validateTrigger="onBlur">
                    <Input.Password prefix={<LockOutlined/>} placeholder="Пароль"/>
                </Form.Item>
            </Form>

            {error ? <Alert message={errorMessage} type="error" showIcon style={{marginBottom: 15}}/> : null}

            <Form.Item htmlFor="signForm">
                <Button block type="primary" form="signInForm" htmlType="submit" size="large">Войти</Button>
            </Form.Item>

            <p>Нету аккаунта? <Link to="/signup">Зарегестрироваться</Link></p>
        </>
    );
};

export default SignInForm;
