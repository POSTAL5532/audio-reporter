import React, {Component} from 'react';
import {Avatar, PageHeader, Tag, Tooltip} from "antd";
import {AuthState} from "../../store/auth/types";
import {UserState} from "../../store/user/types";
import {ApplicationState} from "../../configureStore";
import {loadUser} from "../../store/user/actions";
import {connect} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons/lib";
import ProfileDropdown from "./ProfileDropdown";
import {deAuthorize} from "../../store/auth/actions";

type DispatchProps = {
    loadUser: () => void;
    deAuthorize: () => void;
}

type StateProps = {
    userState: UserState;
    authState: AuthState;
}

type HeaderProps = DispatchProps & StateProps;

class Header extends Component<HeaderProps> {

    componentDidMount(): void {
        if (this.props.authState.authStatus) {
            this.props.loadUser();
        }
    }

    UNSAFE_componentWillUpdate(nextProps: Readonly<DispatchProps & StateProps>): void {
        if (nextProps !== this.props && nextProps.authState.authStatus !== this.props.authState.authStatus) {
            this.props.loadUser();
        }
    }

    render(): React.ReactNode {
        const {authState: {authStatus}, userState: {user, loading}} = this.props;
        const extra: React.ReactNode[] = loading
            ? [<LoadingOutlined key={1} style={{fontSize: 24}} spin/>]
            : [
                <Tooltip key={2} title={user ? user.login : null}>
                    <Avatar shape="square" size="large" style={{backgroundColor: '#87d068'}}>
                        {user ? user.login[0].toUpperCase() : null}
                    </Avatar>
                </Tooltip>,
                <ProfileDropdown profilePath="/profile" deAuthorize={this.props.deAuthorize} key={1}/>
            ];

        return (
            <PageHeader
                title="Reporter"
                subTitle="This is a startup"
                tags={authStatus ? <Tag color="blue">Online</Tag> : null}
                extra={authStatus ? extra : null}/>
        );
    }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
    userState: state.userState,
    authState: state.authState
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    loadUser: () => dispatch(loadUser()),
    deAuthorize: () => dispatch(deAuthorize())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);