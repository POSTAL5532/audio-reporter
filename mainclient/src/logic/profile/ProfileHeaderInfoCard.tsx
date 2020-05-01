import React, {useEffect} from 'react';
import {Card, Descriptions, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons/lib";
import UserConfirmStatusTag from "logic/profile/UserConfirmStatusTag";
import {UserInfo} from "logic/profile/userTypes";
import {ApplicationState} from "storeConfig";
import {loadUser} from "logic/profile/userActions";
import {Dispatch} from "redux";

type StateProps = {
    userInfo: UserInfo;
}

const ProfileHeaderInfoCard = () => {
    const dispatch: Dispatch<any> = useDispatch<Dispatch<any>>();
    const {userInfo} = useSelector<ApplicationState, StateProps>(state => ({
        userInfo: state.userState.user
    }));

    useEffect(() => {
            dispatch(loadUser());
        },
        []);

    return (
        <Card style={{marginBottom: 30}}>
            <Spin indicator={<LoadingOutlined style={{fontSize: 40}} spin/>}
                  size="large"
                  spinning={!userInfo}>

                <Descriptions size="small" column={2} style={{width: 400}}>
                    <Descriptions.Item label="Пользователь">{userInfo ? userInfo.login : "..."}</Descriptions.Item>
                    <Descriptions.Item label="Виджеты">33</Descriptions.Item>
                    <Descriptions.Item label="Новые сообщения">44</Descriptions.Item>
                    <Descriptions.Item label="Статус">
                        <UserConfirmStatusTag user={userInfo}/>
                    </Descriptions.Item>
                </Descriptions>

            </Spin>
        </Card>
    );
};

export default ProfileHeaderInfoCard;