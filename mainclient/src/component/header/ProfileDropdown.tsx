import {Button, Dropdown, Menu} from "antd";
import {ExportOutlined, MoreOutlined, UserOutlined} from "@ant-design/icons/lib";
import React from "react";
import {browserHistory} from "../../index";

type ComponentProps = {
    profilePath: string;
    deAuthorize: () => void;
}

const ProfileDropdown = (props: ComponentProps) => {
    const menuData = (
        <Menu>
            <Menu.Item>
                <Button type="link"
                        onClick={() => browserHistory.push(props.profilePath)}
                        icon={<UserOutlined/>}>
                    Профиль
                </Button>
            </Menu.Item>
            <Menu.Item>
                <Button type="link" icon={<ExportOutlined/>} onClick={props.deAuthorize}>Выход</Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown key="more" overlay={menuData}>
            <Button style={{border: 'none', padding: 0,}}>
                <MoreOutlined style={{fontSize: 20, verticalAlign: 'top',}}/>
            </Button>
        </Dropdown>
    );
};

export default ProfileDropdown;