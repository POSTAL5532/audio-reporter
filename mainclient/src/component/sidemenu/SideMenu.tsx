import React from "react";
import {Menu, Layout} from "antd";
import {Link} from "react-router-dom";
import {
    ControlOutlined,
    ExportOutlined,
    PieChartOutlined,
    UserOutlined
} from "@ant-design/icons/lib";
import "component/sidemenu/SideMenu.css"
import {deAuthorize} from "logic/auth/authActions";

const {Sider} = Layout;
const {SubMenu} = Menu;

const SideMenu = () => {
    return (
        <Sider style={{background: "white"}}>

            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>

                <Menu.Item key="1">
                    <PieChartOutlined/>
                    <Link to="/dashboard">Дэшбород</Link>
                </Menu.Item>

                <SubMenu key="2" title={
                    <span>
                        <UserOutlined/>
                        <span>Профиль</span>
                    </span>
                }>
                    <Menu.Item key="3">
                        <ControlOutlined/>
                        <Link to="/profile">Настройки</Link>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={() => deAuthorize()}>
                        <ExportOutlined/>
                        <span>Выход</span>
                    </Menu.Item>
                </SubMenu>

            </Menu>
        </Sider>
    );
};

export default SideMenu;