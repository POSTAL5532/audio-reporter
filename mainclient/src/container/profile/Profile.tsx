import React, {Component} from 'react';
import {Divider, Spin} from "antd";
import {connect} from "react-redux";
import PersonalDataForm from "container/profile/PersonalDataForm";
import ChangePasswordForm from "container/profile/ChangePasswordForm";
import GeneralUserInfoCard from "container/profile/GeneralUserInfoCard";
import {UserState} from "store/user/types";
import {ApplicationState} from "store/configureStore";
import {editPassword, editPersonalData, loadUser} from "store/user/actions";
import {LoadingOutlined} from "@ant-design/icons/lib";

type DispatchProps = {
    loadUser: () => void;
    editPersonalData: (login: string, email: string) => void;
    editPassword: (oldPassword: string, newPassword: string, confirmPassword: string) => void;
}

type StateProps = {
    userState: UserState;
}

type ProfileProps = DispatchProps & StateProps;

class Profile extends Component<ProfileProps> {

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

                    <GeneralUserInfoCard userInfo={user}/>
                    <PersonalDataForm onSubmit={this.props.editPersonalData}
                                      userInfo={user}
                                      error={changePersonalDataError}/>
                    <Divider/>
                    <ChangePasswordForm onSubmit={this.props.editPassword}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);