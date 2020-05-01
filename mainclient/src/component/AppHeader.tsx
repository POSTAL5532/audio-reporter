import React from 'react';
import {PageHeader} from "antd";
import {AudioOutlined} from "@ant-design/icons/lib";

const AppHeader = () => {
    return (
        <PageHeader
            title="Reporter"
            avatar={{shape: "square", size: "large", icon: <AudioOutlined/>, style: {backgroundColor: '#87d068'}}}>
        </PageHeader>
    );
};

export default AppHeader;