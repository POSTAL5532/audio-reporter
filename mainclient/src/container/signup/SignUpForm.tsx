import React, {Component} from 'react';
import {Alert, Button, Form, Input} from "antd";
import {Rule} from "antd/lib/form";
import {Link} from "react-router-dom";
import UserService from "../../service/UserService";

const userService: UserService = new UserService();

const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19}
};

const loginRules: Rule[] = [
    {required: true, message: 'Поле обязательно для заполнения'},
    {pattern: /^[a-zA-Z0-9]{5,50}$/, message: "Пароль может содержать от 5 до 100 латинских символов и цифр"},
    () => ({
        validator(rule, value) {
            return userService.checkLogin(value)
                .then(() => Promise.resolve())
                .catch(() => Promise.reject("Этот логин занят"));
        }
    })
];

const emailRules: Rule[] = [
    {required: true, message: 'Поле обязательно для заполнения'},
    {type: 'email', message: "Значение должно быть email"},
    () => ({
        validator(rule, value) {
            return userService.checkEmail(value)
                .then(() => Promise.resolve())
                .catch(() => Promise.reject("Этот Email занят"));
        }
    })
];

const passwordRules: Rule[] = [
    {required: true, message: 'Поле обязательно для заполнения'},
    {pattern: /^[a-zA-Z0-9]{5,50}$/, message: "Пароль может содержать от 5 до 50 латинских символов и цифр"},
    ({getFieldValue}) => ({
        validator(rule, value) {
            if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
            }
            return Promise.reject("Пароли не совпадают")
        }
    })
];

type SignUpFormProps = {
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
                        rules={emailRules}
                        validateFirst={true}
                        validateTrigger="onBlur">
                        <Input placeholder="email"/>
                    </Form.Item>

                    <Form.Item
                        label="Логин"
                        name="login"
                        rules={loginRules}
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