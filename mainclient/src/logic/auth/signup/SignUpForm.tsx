import React from 'react';
import {Alert, Button, Form, Input} from "antd";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons/lib";
import {Rule} from "antd/lib/form";
import {Link} from "react-router-dom";
import UserDataRule from "secure/UserDataRule";

export const passwordRules: Rule[] = [
    ...UserDataRule.passwordRules(),
    ({getFieldValue}) => ({
        validator(rule, value) {
            if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
            }
            return Promise.reject("Пароли не совпадают")
        }
    })
];

export type SignUpFormProps = {
    error: boolean;
    errorMessage: string;
    onSubmit: (values: any) => void;
}

const SignUpForm = ({error, errorMessage, onSubmit}: SignUpFormProps) => {
    return (
        <>
            <Form id="signUpForm" size="large" onFinish={onSubmit}>
                <Form.Item
                    name="email"
                    rules={UserDataRule.emailRules("notConsideringUser")}
                    validateFirst={true}
                    validateTrigger="onBlur">
                    <Input prefix={<MailOutlined/>} placeholder="Email"/>
                </Form.Item>

                <Form.Item
                    name="login"
                    rules={UserDataRule.loginRules("notConsideringUser")}
                    validateFirst
                    validateTrigger="onBlur">
                    <Input prefix={<UserOutlined />} placeholder="Логин"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={passwordRules}
                    validateTrigger="onBlur">
                    <Input.Password prefix={<LockOutlined/>} placeholder="Пароль"/>
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={passwordRules}
                    validateTrigger="onBlur">
                    <Input.Password prefix={<LockOutlined/>} placeholder="Подтвердить пароль"/>
                </Form.Item>
            </Form>

            {error ? <Alert message={errorMessage} type="error" showIcon style={{marginBottom: 15}}/> : null}

            <Form.Item htmlFor="signUpForm">
                <Button block type="primary" form="signUpForm" htmlType="submit" size="large">Регистрация</Button>
            </Form.Item>

            <p>Уже зарегестрирован? <Link to="/signin">Войти</Link></p>
        </>
    );
};

export default SignUpForm;