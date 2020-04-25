import React, {Component} from 'react';
import {Alert, Button, Form, Input} from "antd";
import {Link} from "react-router-dom";
import UserDataRule from "secure/UserDataRule";
import {LockOutlined, UserOutlined} from "@ant-design/icons/lib";

type SignInFormProps = {
    error: boolean;
    errorMessage: string;
    onSubmit: (values: any) => void;
}

class SignInForm extends Component<SignInFormProps> {

    render(): React.ReactNode {
        return (
            <>
                <Form id="signInForm" size="large" onFinish={this.props.onSubmit}>
                    <Form.Item
                        name="loginOrEmail"
                        rules={UserDataRule.loginOrEmailRules()}
                        validateTrigger="onBlur">
                        <Input prefix={<UserOutlined />} placeholder="Логин или email"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={UserDataRule.passwordRules()}
                        validateTrigger="onBlur">
                        <Input.Password prefix={<LockOutlined/>} placeholder="Пароль"/>
                    </Form.Item>
                </Form>

                {
                    this.props.error
                        ? <Alert message={this.props.errorMessage} type="error" showIcon style={{marginBottom: 15}}/>
                        : null
                }

                <Form.Item htmlFor="signForm">
                    <Button block type="primary" form="signInForm" htmlType="submit" size="large">Войти</Button>
                </Form.Item>

                <p>Нету аккаунта? <Link to="/signup">Зарегестрироваться</Link></p>
            </>
        );
    }
}

export default SignInForm;
