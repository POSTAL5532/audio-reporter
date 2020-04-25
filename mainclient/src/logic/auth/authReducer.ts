import {ACCESS_TOKEN} from "config";
import {AuthAction, AuthActionTypes, AuthState} from "logic/auth/authTypes";

const initialAuthState: AuthState = {
    loading: false,
    authStatus: !!localStorage.getItem(ACCESS_TOKEN),
    authError: false,
    authErrorMessage: null,
    regError: false,
    regErrorMessage: null
};

export const authReducer = (state: AuthState = initialAuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.SET_AUTH_STATUS:
            return {
                ...state,
                authStatus: action.auth
            };
        case AuthActionTypes.SET_AUTH_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case AuthActionTypes.SET_AUTH_ERROR:
            return {
                ...state,
                authError: action.authError,
                authErrorMessage: action.authErrorMessage
            };
        case AuthActionTypes.SET_REG_ERROR:
            return {
                ...state,
                regError: action.regError,
                regErrorMessage: action.regErrorMessage
            };
        default:
            return state;
    }
};