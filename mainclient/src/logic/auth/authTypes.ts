import {Action} from "redux";

export interface AuthState {
    readonly loading: boolean;
    readonly authStatus: boolean;
    readonly authError: boolean;
    readonly authErrorMessage: string;
    readonly regError: boolean;
    readonly regErrorMessage: string;
}

export enum AuthActionTypes {
    SET_AUTH_STATUS = "SET_AUTH_STATUS",
    SET_AUTH_LOADING = "SET_AUTH_LOADING",
    SET_AUTH_ERROR = "SET_AUTH_ERROR",
    SET_REG_ERROR = "SET_REG_ERROR"
}

export interface SetAuthStatusAction extends Action<AuthActionTypes> {
    readonly type: AuthActionTypes.SET_AUTH_STATUS;
    readonly auth: boolean;
}

export interface SetAuthLoadingAction extends Action<AuthActionTypes> {
    readonly type: AuthActionTypes.SET_AUTH_LOADING;
    readonly loading: boolean;
}

export interface SetAuthErrorAction extends Action<AuthActionTypes> {
    readonly type: AuthActionTypes.SET_AUTH_ERROR;
    readonly authError: boolean;
    readonly authErrorMessage: string;
}

export interface SetRegErrorAction extends Action<AuthActionTypes> {
    readonly type: AuthActionTypes.SET_REG_ERROR;
    readonly regError: boolean;
    readonly regErrorMessage: string;
}

export type AuthAction =
    SetAuthStatusAction
    | SetAuthLoadingAction
    | SetAuthErrorAction
    | SetRegErrorAction;