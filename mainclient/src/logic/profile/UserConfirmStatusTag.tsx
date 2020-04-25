import React from "react";
import {Tag, Tooltip} from "antd";
import {UserInfo} from "logic/profile/userTypes";

type UserConfirmStatusTagProps = {
    user: UserInfo
}

const UserConfirmStatusTag = (props: UserConfirmStatusTagProps) => {
    const {user} = props;
    const statusLabelColor: string = user ? (user.confirmStatus === "CONFIRMED" ? "blue" : "orange") : null;
    const statusTooltipText: string = user && user.confirmStatus === "CONFIRMED" ? " " : " не ";

    return (
        <Tooltip placement="bottom" title={`Email${statusTooltipText}подтверждён`}>
            <Tag color={statusLabelColor}>
                {user ? user.confirmStatus : "..."}
            </Tag>
        </Tooltip>
    );
};

export default UserConfirmStatusTag;