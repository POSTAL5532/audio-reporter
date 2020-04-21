import {
    AuthActionTypes,
    SetAuthErrorAction,
    SetAuthLoadingAction,
    SetAuthStatusAction, SetRegErrorAction,
} from "store/auth/types";

export default class AuthActionCreator {

    public static setAuthStatusAction(status: boolean): SetAuthStatusAction {
        return {
            type: AuthActionTypes.SET_AUTH_STATUS,
            auth: status
        };
    }

    public static setAuthLoadingAction(loading: boolean): SetAuthLoadingAction {
        return {
            type: AuthActionTypes.SET_AUTH_LOADING,
            loading: loading
        };
    }

    public static setAuthErrorAction(authError: boolean, authErrorMessage: string): SetAuthErrorAction {
        return {
            type: AuthActionTypes.SET_AUTH_ERROR,
            authError: authError,
            authErrorMessage: authErrorMessage
        };
    }

    public static setRegErrorAction(regError: boolean, regErrorMessage: string): SetRegErrorAction {
        return {
            type: AuthActionTypes.SET_REG_ERROR,
            regError: regError,
            regErrorMessage: regErrorMessage
        };
    }
}