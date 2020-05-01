import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Form, Input, Row} from "antd";
import {MailOutlined, UserOutlined} from "@ant-design/icons/lib";
import UserDataRule from "secure/UserDataRule";
import {FormInstance} from "antd/lib/form";
import {UserInfo} from "logic/profile/userTypes";

type PersonalDataFormProps = {
    userInfo: UserInfo;
    error: string;
    onSubmit: (login: string, email: string) => void;
}

type PersonalDataFormState = {
    fieldsChanged: boolean
}

const ProfilePersonalDataEditForm = ({onSubmit, error, userInfo}: PersonalDataFormProps) => {
    const [{fieldsChanged}, setState] = useState<PersonalDataFormState>({fieldsChanged: false});
    const personalSettingsForm = React.createRef<FormInstance>();

    const onFormSubmit = (values: any): void => {
        onSubmit(values.login, values.email);
    };

    useEffect(() => {
        fillFormDefaultValues();

        if (userInfo) {
            checkDataDifference();
        }
    }, [userInfo]);

    const fillFormDefaultValues = () => {
        const loginInitValue: string = userInfo ? userInfo.login : "";
        const emailInitValue: string = userInfo ? userInfo.email : "";

        if (personalSettingsForm.current) {
            personalSettingsForm.current.setFieldsValue({
                login: loginInitValue,
                email: emailInitValue
            });
        }
    };

    const checkDataDifference = () => {
        const loginValue: string = personalSettingsForm.current.getFieldValue("login");
        const emailValue: string = personalSettingsForm.current.getFieldValue("email");
        const {login, email} = userInfo;
        setState({
            fieldsChanged: loginValue !== login || emailValue !== email
        });
    };

    return (
        <Form id="personalDataForm"
              size="middle"
              ref={personalSettingsForm}
              onFinish={onFormSubmit}>

            <Form.Item
                name="login"
                rules={UserDataRule.loginRules("consideringUser")}
                validateFirst
                validateTrigger="onBlur">
                <Input prefix={<UserOutlined/>}
                       placeholder="Логин"
                       onChange={checkDataDifference}/>
            </Form.Item>


            <Row gutter={10}>
                <Col span={18}>
                    <Form.Item
                        name="email"
                        rules={UserDataRule.emailRules("consideringUser")}
                        validateFirst={true}
                        validateTrigger="onBlur">
                        <Input prefix={<MailOutlined/>}
                               placeholder="Логин"
                               onChange={checkDataDifference}/>
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Button block
                            disabled={!userInfo || userInfo.confirmStatus === "CONFIRMED"}>Подтвердить</Button>
                </Col>
            </Row>

            {
                error
                    ? <Alert message={error} type="error" showIcon style={{marginBottom: 15}}/>
                    : null
            }

            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={!fieldsChanged}>Сохранить</Button>
            </Form.Item>
        </Form>
    );
};

export default ProfilePersonalDataEditForm;
