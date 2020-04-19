import React, {Component} from 'react';
import {Alert, Button, Form, Input} from "antd";
import {Link} from "react-router-dom";
import UserDataRule from "../../secure/UserDataRule";

const layout = {
    labelCol: {span: 7},
    wrapperCol: {span: 17}
};

type SignInFormProps = {
    error: boolean;
    errorMessage: string;
    onSubmit: (values: any) => void;
}

class SignInForm extends Component<SignInFormProps> {

    render(): React.ReactNode {
        return (
            <>
                <Form {...layout} id="signInForm" onFinish={this.props.onSubmit}>
                    <Form.Item
                        label="Логин или Email"
                        name="loginOrEmail"
                        rules={UserDataRule.loginOrEmailRules()}
                        validateTrigger="onBlur">
                        <Input placeholder="логин или email"/>
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={UserDataRule.passwordRules()}
                        validateTrigger="onBlur">
                        <Input.Password placeholder="пароль"/>
                    </Form.Item>
                </Form>

                {
                    this.props.error
                        ? <Alert message={this.props.errorMessage} type="error" showIcon style={{marginBottom: 15}}/>
                        : null
                }

                <Form.Item htmlFor="signForm">
                    <Button block type="primary" form="signInForm" htmlType="submit">Войти</Button>
                </Form.Item>

                <p>Нету аккаунта? <Link to="/signup">Зарегестрироваться</Link></p>
            </>
        );
    }
}

export default SignInForm;
