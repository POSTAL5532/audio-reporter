import React, {Component} from "react";
import {Menu, Layout} from "antd";
import {
    ControlOutlined,
    ExportOutlined,
    PieChartOutlined,
    UserOutlined
} from "@ant-design/icons/lib";
import {Link} from "react-router-dom";
import "./SideMenu.css"
import {connect} from "react-redux";
import {deAuthorize} from "../../store/auth/actions";

const {Sider} = Layout;
const {SubMenu} = Menu;

type DispatchProps = {
    deAuthorize: () => void;
}

class SideMenu extends Component<DispatchProps> {
    render(): React.ReactNode {
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
                        <Menu.Item key="4" onClick={this.props.deAuthorize}>
                            <ExportOutlined/>
                            <span>Выход</span>
                        </Menu.Item>
                    </SubMenu>

                </Menu>
            </Sider>
        );
    }
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    deAuthorize: () => dispatch(deAuthorize())
});

export default connect(null, mapDispatchToProps)(SideMenu);