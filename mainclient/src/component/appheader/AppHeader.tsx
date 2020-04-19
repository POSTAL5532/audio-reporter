import React, {Component} from 'react';
import {PageHeader} from "antd";
import {AudioOutlined} from "@ant-design/icons/lib";
import HeadUserCard from "./HeadUserCard";

class AppHeader extends Component {

    render(): React.ReactNode {
        return (
            <PageHeader
                style={{marginBottom: 30}}
                title="Reporter"
                avatar={{shape: "square", size: "large", icon: <AudioOutlined/>, style: {backgroundColor: '#87d068'}}}>

                <HeadUserCard/>

            </PageHeader>
        );
    }
}

export default AppHeader;