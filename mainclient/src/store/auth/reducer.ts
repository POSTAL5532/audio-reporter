import {AuthAction, AuthActionTypes, AuthState} from "./types";
import {ACCESS_TOKEN} from "../../config";

const initialAuthState: AuthState = {
    loading: false,
    authStatus: !!localStorage.getItem(ACCESS_TOKEN),
    authError: false,
    authErrorMessage: null
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
        default:
            return state;
    }
};