import React, {Component} from "react";
import {Descriptions} from "antd";
import {UserInfo} from "store/user/types";
import UserConfirmStatusTag from "component/UserConfirmStatusTag";

type GeneralUserInfoCardProps = {
    userInfo: UserInfo
}

class GeneralUserInfoCard extends Component<GeneralUserInfoCardProps> {

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

export default GeneralUserInfoCard;