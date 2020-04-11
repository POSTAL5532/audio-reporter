import React, {Component} from 'react';
import {Button, Card, Form, Input, Typography} from "antd";
import "./SignUp.css";
import {Link} from "react-router-dom";
import {Rule} from "antd/lib/form";

const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19}
};

const loginRules: Rule[] = [
    {required: true, message: 'Поле обязательно для заполнения'},
    {pattern: /^[a-zA-Z0-9]{5,50}$/, message: "Пароль может содержать от 5 до 100 латинских символов и цифр"}
];

const emailRules: Rule[] = [
    {required: true, message: 'Поле обязательно для заполнения'},
    {type: 'email', message: "Значение должно быть email"}
];

const passwordRules: Rule[] = [
    {required: true, message: 'Поле обязательно для заполнения'},
    {pattern: /^[a-zA-Z0-9]{5,50}$/, message: "Пароль может содержать от 5 до 50 латинских символов и цифр"}
];

class SignUp extends Component {

    render(): React.ReactNode {
        return (
            <div className="signUpContainer">
                <Typography.Title>Регистрация</Typography.Title>
                <Card>
                    <Form {...layout} id="signUpForm">
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={emailRules}
                            validateTrigger="onBlur">
                            <Input placeholder="email"/>
                        </Form.Item>

                        <Form.Item
                            label="Логин"
                            name="login"
                            rules={loginRules}
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

                    <Form.Item htmlFor="signForm">
                        <Button block type="primary" form="signUpForm" htmlType="submit">Регистрация</Button>
                    </Form.Item>

                    <p>Уже зарегестрирован? <Link to="/signin">Войти</Link></p>
                </Card>
            </div>
        );
    }
}

export default SignUp;