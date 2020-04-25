import {
    SetUserAction, SetUserChangePasswordError,
    SetUserChangePersonalDataError,
    SetUserLoadingAction,
    UserActionTypes,
    UserInfo
} from "logic/profile/userTypes";


export default class UserActionCreator {

    public static setUserAction(user: UserInfo): SetUserAction {
        return {
            type: UserActionTypes.SET_USER,
            user: user
        };
    }

    public static setUserLoadingAction(loading: boolean): SetUserLoadingAction {
        return {
            type: UserActionTypes.SET_USER_LOADING,
            loading: loading
        };
    }

    public static setUserChangePersonalDataError(errorMessage: string): SetUserChangePersonalDataError {
        return {
            type: UserActionTypes.SET_USER_CHANGE_PERSONAL_DATA_ERROR,
            changePersonalDataError: errorMessage
        };
    }

    public static setUserChangePasswordError(errorMessage: string): SetUserChangePasswordError {
        return {
            type: UserActionTypes.SET_USER_CHANGE_PASSWORD_ERROR,
            changePasswordError: errorMessage
        };
    }
}