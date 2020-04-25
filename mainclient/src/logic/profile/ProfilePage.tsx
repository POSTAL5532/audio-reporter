import React, {Component} from 'react';
import {Divider, Spin} from "antd";
import {connect} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons/lib";
import {UserState} from "logic/profile/userTypes";
import ProfilePersonalDataEditForm from "logic/profile/ProfilePersonalDataEditForm";
import ProfilePasswordEditForm from "logic/profile/ProfilePasswordEditForm";
import {ApplicationState} from "storeConfig";
import {editPassword, editPersonalData, loadUser} from "logic/profile/userActions";
import ProfileInfoCard from "logic/profile/ProfileInfoCard";

type DispatchProps = {
    loadUser: () => void;
    editPersonalData: (login: string, email: string) => void;
    editPassword: (oldPassword: string, newPassword: string, confirmPassword: string) => void;
}

type StateProps = {
    userState: UserState;
}

type ProfileProps = DispatchProps & StateProps;

class ProfilePage extends Component<ProfileProps> {

    componentDidMount(): void {
        this.props.loadUser();
    }

    render(): React.ReactNode {
        const {user, loading, changePersonalDataError, changePasswordError} = this.props.userState;
        return (
            <>
                <h1>Настройки профиля</h1>
                <Spin indicator={<LoadingOutlined style={{fontSize: 40}} spin/>}
                      size="large"
                      spinning={!user || loading}>

                    <ProfileInfoCard userInfo={user}/>
                    <ProfilePersonalDataEditForm onSubmit={this.props.editPersonalData}
                                                 userInfo={user}
                                                 error={changePersonalDataError}/>
                    <Divider/>
                    <ProfilePasswordEditForm onSubmit={this.props.editPassword}
                                             error={changePasswordError}/>

                </Spin>
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
    userState: state.userState
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    loadUser: () => dispatch(loadUser()),
    editPersonalData: (login: string, email: string) => dispatch(editPersonalData(login, email)),
    editPassword: (oldPassword: string, newPassword: string, confirmPassword: string) => dispatch(editPassword(oldPassword, newPassword, confirmPassword))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);