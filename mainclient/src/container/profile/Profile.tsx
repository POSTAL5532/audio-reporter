import React, {Component} from 'react';
import {Divider, Spin} from "antd";
import {connect} from "react-redux";
import PersonalDataForm from "container/profile/PersonalDataForm";
import ChangePasswordForm from "container/profile/ChangePasswordForm";
import GeneralUserInfoCard from "container/profile/GeneralUserInfoCard";
import {UserState} from "store/user/types";
import {ApplicationState} from "store/configureStore";
import {editPersonalData, loadUser} from "store/user/actions";
import {LoadingOutlined} from "@ant-design/icons/lib";

type DispatchProps = {
    loadUser: () => void;
    editPersonalData: (login: string, email: string) => void;
}

type StateProps = {
    userState: UserState;
}

type ProfileProps = DispatchProps & StateProps;

class Profile extends Component<ProfileProps> {

    componentDidMount(): void {
        this.props.loadUser();
    }

    onEditPersonalUserData = (login: string, email: string) => {
        this.props.editPersonalData(login, email);
    };

    render(): React.ReactNode {
        const {user, loading, changePersonalDataError} = this.props.userState;
        return (
            <>
                <h1>Настройки профиля</h1>
                <Spin indicator={<LoadingOutlined style={{fontSize: 40}} spin/>}
                      size="large"
                      spinning={!user || loading}>

                    <GeneralUserInfoCard userInfo={user}/>
                    <PersonalDataForm onSubmit={this.onEditPersonalUserData}
                                      userInfo={user}
                                      error={changePersonalDataError}/>
                    <Divider/>
                    <ChangePasswordForm/>

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
    editPersonalData: (login: string, email: string) => dispatch(editPersonalData(login, email))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);