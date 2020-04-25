import React, {Component} from "react";
import {Descriptions} from "antd";
import UserConfirmStatusTag from "logic/profile/UserConfirmStatusTag";
import {UserInfo} from "logic/profile/userTypes";

type GeneralUserInfoCardProps = {
    userInfo: UserInfo
}

class ProfileInfoCard extends Component<GeneralUserInfoCardProps> {

    render(): React.ReactNode {
        const {userInfo} = this.props;

        return (
            <Descriptions size="small" column={3} style={{marginBottom: 20}}>
                <Descriptions.Item label="Дата регистрации">{userInfo ? userInfo.regDate : "..."}</Descriptions.Item>
                <Descriptions.Item label="Статус">
                    <UserConfirmStatusTag user={userInfo}/>
                </Descriptions.Item>
            </Descriptions>
        );
    }
}

export default ProfileInfoCard;