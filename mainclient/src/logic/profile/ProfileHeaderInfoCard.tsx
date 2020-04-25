import React, {Component} from 'react';
import {Card, Descriptions, Spin} from "antd";
import {connect} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons/lib";
import UserConfirmStatusTag from "logic/profile/UserConfirmStatusTag";
import {UserState} from "logic/profile/userTypes";
import {ApplicationState} from "storeConfig";
import {loadUser} from "logic/profile/userActions";

type DispatchProps = {
    loadUser: () => void;
}

type StateProps = {
    userState: UserState;
}

type HeaderProps = DispatchProps & StateProps;

class ProfileHeaderInfoCard extends Component<HeaderProps> {

    componentDidMount(): void {
        this.props.loadUser();
    }


    render(): React.ReactNode {
        const {userState: {user}} = this.props;
        return (
            <Card style={{marginBottom: 30}}>
                <Spin indicator={<LoadingOutlined style={{fontSize: 40}} spin/>}
                      size="large"
                      spinning={!user}>

                    <Descriptions size="small" column={2} style={{width: 400}}>
                        <Descriptions.Item label="Пользователь">{user ? user.login : "..."}</Descriptions.Item>
                        <Descriptions.Item label="Виджеты">33</Descriptions.Item>
                        <Descriptions.Item label="Новые сообщения">44</Descriptions.Item>
                        <Descriptions.Item label="Статус">
                            <UserConfirmStatusTag user={user}/>
                        </Descriptions.Item>
                    </Descriptions>

                </Spin>
            </Card>
        );
    }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
    userState: state.userState
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    loadUser: () => dispatch(loadUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeaderInfoCard);