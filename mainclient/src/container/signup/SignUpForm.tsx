import React, {Component} from 'react';
import {Alert, Button, Form, Input} from "antd";
import {Rule} from "antd/lib/form";
import {Link} from "react-router-dom";
import UserDataRule from "../../secure/UserDataRule";

const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19}
};

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

class SignUpForm extends Component<SignUpFormProps> {

    render(): React.ReactNode {
        return (
            <>
                <Form {...layout} id="signUpForm" onFinish={this.props.onSubmit}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={UserDataRule.emailRules("notConsideringUser")}
                        validateFirst={true}
                        validateTrigger="onBlur">
                        <Input placeholder="email"/>
                    </Form.Item>

                    <Form.Item
                        label="Логин"
                        name="login"
                        rules={UserDataRule.loginRules("notConsideringUser")}
                        validateFirst
                        validateTrigger="onBlur">
                        <Input placeholder="логин"/>
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={passwordRules}
                        validateTrigger="onBlur">
                        <Input.Password placeholder="пароль"/>
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={passwordRules}
                        validateTrigger="onBlur">
                        <Input.Password placeholder="подтвердить пароль"/>
                    </Form.Item>
                </Form>

                {
                    this.props.error
                        ? <Alert message={this.props.errorMessage} type="error" showIcon style={{marginBottom: 15}}/>
                        : null
                }

                <Form.Item htmlFor="signUpForm">
                    <Button block type="primary" form="signUpForm" htmlType="submit">Регистрация</Button>
                </Form.Item>

                <p>Уже зарегестрирован? <Link to="/signin">Войти</Link></p>
            </>
        );
    }
}

export default SignUpForm;