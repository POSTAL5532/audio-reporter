import React, {Component} from 'react';
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

class ProfilePersonalDataEditForm extends Component<PersonalDataFormProps, PersonalDataFormState> {

    state: PersonalDataFormState = {
        fieldsChanged: false
    };

    personalSettingsForm = React.createRef<FormInstance>();

    onSubmit = (values: any): void => {
        this.props.onSubmit(values.login, values.email);
    };

    componentDidUpdate(prevProps: Readonly<PersonalDataFormProps>): void {
        if (prevProps === this.props) {
            return;
        }

        this.fillFormDefaultValues();

        if (this.props.userInfo) {
            this.checkDataDifference();
        }
    }

    fillFormDefaultValues = () => {
        const {userInfo} = this.props;
        const loginInitValue: string = userInfo ? userInfo.login : "";
        const emailInitValue: string = userInfo ? userInfo.email : "";

        if (this.personalSettingsForm.current) {
            this.personalSettingsForm.current.setFieldsValue({
                login: loginInitValue,
                email: emailInitValue
            });
        }
    };

    checkDataDifference = () => {
        const loginValue: string = this.personalSettingsForm.current.getFieldValue("login");
        const emailValue: string = this.personalSettingsForm.current.getFieldValue("email");
        const {login, email} = this.props.userInfo;

        this.setState({
            ...this.state,
            fieldsChanged: loginValue !== login || emailValue !== email
        });
    };

    render(): React.ReactNode {
        const {userInfo} = this.props;

        return (
            <Form id="personalDataForm"
                  size="middle"
                  ref={this.personalSettingsForm}
                  onFinish={this.onSubmit}>

                <Form.Item
                    name="login"
                    rules={UserDataRule.loginRules("consideringUser")}
                    validateFirst
                    validateTrigger="onBlur">
                    <Input prefix={<UserOutlined/>}
                           placeholder="Логин"
                           onChange={this.checkDataDifference}/>
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
                                   onChange={this.checkDataDifference}/>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Button block disabled={!userInfo || userInfo.confirmStatus === "CONFIRMED"}>Подтвердить</Button>
                    </Col>
                </Row>

                {
                    this.props.error
                        ? <Alert message={this.props.error} type="error" showIcon style={{marginBottom: 15}}/>
                        : null
                }

                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={!this.state.fieldsChanged}>Сохранить</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default ProfilePersonalDataEditForm;