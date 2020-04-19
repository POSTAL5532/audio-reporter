import React, {Component} from 'react';
import {Card, Descriptions, Spin, Tag} from "antd";
import {AuthState} from "../../store/auth/types";
import {UserState} from "../../store/user/types";
import {ApplicationState} from "../../configureStore";
import {loadUser} from "../../store/user/actions";
import {connect} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons/lib";

type DispatchProps = {
    loadUser: () => void;
}

type StateProps = {
    userState: UserState;
    authState: AuthState;
}

type HeaderProps = DispatchProps & StateProps;

class HeadUserCard extends Component<HeaderProps> {

    componentDidMount(): void {
        if (this.props.authState.authStatus) {
            this.props.loadUser();
        }
    }

    UNSAFE_componentWillUpdate(nextProps: Readonly<DispatchProps & StateProps>): void {
        if (nextProps !== this.props && nextProps.authState.authStatus !== this.props.authState.authStatus) {
            this.props.loadUser();
        }
    }


    render(): React.ReactNode {
        const {authState: {authStatus}, userState: {user, loading}} = this.props;
        return (authStatus
            ? <Card>
                <Spin indicator={<LoadingOutlined style={{fontSize: 40}} spin/>}
                      size="large"
                      spinning={loading || !user}>

                    <Descriptions size="small" column={2} style={{width: 400}}>
                        <Descriptions.Item label="Пользователь">{user ? user.login : "..."}</Descriptions.Item>
                        <Descriptions.Item label="Виджеты">33</Descriptions.Item>
                        <Descriptions.Item label="Новые сообщения">44</Descriptions.Item>
                        <Descriptions.Item label="Статус">
                            <Tag color="blue">{user ? user.confirmStatus : "..."}</Tag>
                        </Descriptions.Item>
                    </Descriptions>

                </Spin>
            </Card>
            : null);
    }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
    userState: state.userState,
    authState: state.authState
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    loadUser: () => dispatch(loadUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeadUserCard);