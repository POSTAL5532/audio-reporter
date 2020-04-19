import {ThunkAction} from "redux-thunk";
import {AuthAction, AuthState} from "./types";
import AuthActionCreator from "./AuthActionCreator";
import AuthService from "../../service/AuthService";
import {ACCESS_TOKEN} from "../../config";
import {browserHistory} from "../../index";
import {message} from "antd";
import {SecurityErrorMessage} from "../../secure/SecurityErrorMessage";
import {HttpStatusCode} from "../../service/HttpStatusCode";

export type AuthThunkAction = ThunkAction<void, AuthState, unknown, AuthAction>;

export const authorize = (loginOrEmail: string, password: string): AuthThunkAction => dispatch => {
    dispatch(AuthActionCreator.setAuthErrorAction(false, null));
    dispatch(AuthActionCreator.setAuthLoadingAction(true));

    new AuthService().signIn(loginOrEmail, password)
        .then(data => {
            localStorage.setItem(ACCESS_TOKEN, data.token);
            dispatch(AuthActionCreator.setAuthStatusAction(true));
            dispatch(AuthActionCreator.setAuthLoadingAction(false));
            message.success("Успешно авторизован");
        })
        .catch(error => {
            let errorMessage: string;

            if (error.status === HttpStatusCode.UNAUTHORIZED && error.data.message === SecurityErrorMessage.BAD_CREDENTIALS) {
                errorMessage = "Не верный логин или пароль"
            } else if (error.status === HttpStatusCode.FORBIDDEN && error.data.message === SecurityErrorMessage.USER_DISABLED) {
                errorMessage = "Аккаунт удалён"
            } else if (error.status === HttpStatusCode.FORBIDDEN && error.data.message === SecurityErrorMessage.USER_BLOCKED) {
                errorMessage = "Аккаунт заблокирован"
            } else if (error.status === HttpStatusCode.BAD_REQUEST) {
                errorMessage = "Некорректные данные"
            } else {
                errorMessage = "Непредвиденная ошибка"
            }

            dispatch(AuthActionCreator.setAuthErrorAction(true, errorMessage));
            dispatch(AuthActionCreator.setAuthLoadingAction(false));
        })
};

export const register = (email: string, login: string, password: string, confirmPassword: string): AuthThunkAction => dispatch => {
    dispatch(AuthActionCreator.setRegErrorAction(false, null));
    dispatch(AuthActionCreator.setAuthLoadingAction(true));

    new AuthService().signUp(email, login, password, confirmPassword)
        .then(() => {
            browserHistory.push("/signin");
            dispatch(AuthActionCreator.setAuthLoadingAction(false));
            message.success("Успешно зарегестрирован");
        })
        .catch(error => {
            let errorMessage: string;
            if (error.status === HttpStatusCode.BAD_REQUEST) {
                errorMessage = "Некорректные данные";
            } else {
                errorMessage = "Непредвиденная ошибка";
            }

            dispatch(AuthActionCreator.setRegErrorAction(true, errorMessage));
            dispatch(AuthActionCreator.setAuthLoadingAction(false));
        });
};

export const deAuthorize = (redirectPath: string = "/"): void => {
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.href = redirectPath;
};