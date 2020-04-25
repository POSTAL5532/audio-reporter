import React, {Component} from 'react';
import {PageHeader} from "antd";
import {AudioOutlined} from "@ant-design/icons/lib";

class AppHeader extends Component {

    render(): React.ReactNode {
        return (
            <PageHeader
                title="Reporter"
                avatar={{shape: "square", size: "large", icon: <AudioOutlined/>, style: {backgroundColor: '#87d068'}}}>
            </PageHeader>
        );
    }
}

export default AppHeader;