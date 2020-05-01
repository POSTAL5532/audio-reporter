import React, {useEffect} from 'react';
import {Divider, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons/lib";
import {UserState} from "logic/profile/userTypes";
import ProfilePersonalDataEditForm from "logic/profile/ProfilePersonalDataEditForm";
import ProfilePasswordEditForm from "logic/profile/ProfilePasswordEditForm";
import {ApplicationState} from "storeConfig";
import {editPassword, editPersonalData, loadUser} from "logic/profile/userActions";
import ProfileInfoCard from "logic/profile/ProfileInfoCard";
import {Dispatch} from "redux";

type StateProps = {
    userState: UserState;
}

const ProfilePage = () => {
    const dispatch: Dispatch<any> = useDispatch<Dispatch<any>>();
    const {userState: {user, loading, changePersonalDataError, changePasswordError}} = useSelector<ApplicationState, StateProps>(state => ({
        userState: state.userState
    }));

    useEffect(() => {
        dispatch(loadUser());
    }, []);

    const personalDataFormOnSubmit = (login: string, email: string) => {
        dispatch(editPersonalData(login, email));
    };

    const passwordEditFormOnSubmit = (oldPassword: string, newPassword: string, confirmPassword: string) => {
        dispatch(editPassword(oldPassword, newPassword, confirmPassword))
    };

    return (
        <>
            <h1>Настройки профиля</h1>
            <Spin indicator={<LoadingOutlined style={{fontSize: 40}} spin/>}
                  size="large"
                  spinning={!user || loading}>

                <ProfileInfoCard userInfo={user}/>
                <ProfilePersonalDataEditForm onSubmit={personalDataFormOnSubmit}
                                             userInfo={user}
                                             error={changePersonalDataError}/>
                <Divider/>
                <ProfilePasswordEditForm onSubmit={passwordEditFormOnSubmit}
                                         error={changePasswordError}/>
            </Spin>
        </>
    );
};

export default ProfilePage;
