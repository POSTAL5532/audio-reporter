import {SetUserAction, SetUserLoadingAction, UserActionTypes, UserInfo} from "./types";

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
}