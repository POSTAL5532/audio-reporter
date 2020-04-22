import {Action} from "redux";

export interface UserInfo {
    readonly login: string;
    readonly email: string;
    readonly regDate: string;
    readonly confirmStatus: string;
}

export interface UserState {
    readonly loading: boolean;
    readonly user: UserInfo;
    readonly changePersonalDataError: string;
}

export enum UserActionTypes {
    SET_USER = "SET_USER",
    SET_USER_LOADING = "SET_USER_LOADING",
    SET_USER_CHANGE_PERSONAL_DATA_ERROR = "SET_USER_CHANGE_PERSONAL_DATA_ERROR"
}

export interface SetUserAction extends Action<UserActionTypes> {
    readonly type: UserActionTypes.SET_USER;
    readonly user: UserInfo;
}

export interface SetUserLoadingAction extends Action<UserActionTypes> {
    readonly type: UserActionTypes.SET_USER_LOADING;
    readonly loading: boolean;
}

export interface SetUserChangePersonalDataError extends Action<UserActionTypes> {
    readonly type: UserActionTypes.SET_USER_CHANGE_PERSONAL_DATA_ERROR;
    readonly changePersonalDataError: string;
}

export type UserAction =
    SetUserAction
    | SetUserLoadingAction
    | SetUserChangePersonalDataError;