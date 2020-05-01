import React from 'react';
import {Rule} from "antd/lib/form";
import {Alert, Button, Col, Form, Input, Row} from "antd";
import {LockOutlined} from "@ant-design/icons/lib";
import UserDataRule from "secure/UserDataRule";

export const passwordRules: Rule[] = [
    ...UserDataRule.passwordRules(true),
    ({getFieldValue}) => ({
        validator(rule, value) {
            if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
            }
            return Promise.reject("Пароли не совпадают")
        }
    })
];

type ChangePasswordFormProps = {
    error: string;
    onSubmit: (oldPassword: string, newPassword: string, confirmPassword: string) => void;
}

const ProfilePasswordEditForm = ({error, onSubmit}: ChangePasswordFormProps) => {

    const onFormSubmit = (values: any) => {
        onSubmit(values.oldPassword, values.newPassword, values.confirmPassword);
    };

    return (
        <Form id="changePasswordForm"
              layout={"vertical"}
              onFinish={onFormSubmit}>

            <Form.Item
                name="oldPassword"
                rules={UserDataRule.passwordRules(true)}
                validateTrigger="onBlur">
                <Input.Password prefix={<LockOutlined/>} placeholder="Старый пароль"/>
            </Form.Item>

            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item
                        name="newPassword"
                        rules={passwordRules}
                        validateTrigger="onBlur">
                        <Input.Password prefix={<LockOutlined/>} placeholder="Новый пароль"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={passwordRules}
                        validateTrigger="onBlur">
                        <Input.Password prefix={<LockOutlined/>} placeholder="Подтвердить новый пароль"/>
                    </Form.Item>
                </Col>
            </Row>

            {
                error
                    ? <Alert message={error} type="error" showIcon style={{marginBottom: 15}}/>
                    : null
            }

            <Form.Item>
                <Button type="primary" form="changePasswordForm" htmlType="submit">Изменить пароль</Button>
            </Form.Item>
        </Form>
    );
};

export default ProfilePasswordEditForm;
