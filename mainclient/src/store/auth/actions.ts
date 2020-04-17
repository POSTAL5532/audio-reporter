import {ThunkAction} from "redux-thunk";
import {AuthAction, AuthState} from "./types";
import AuthActionCreator from "./AuthActionCreator";
import AuthService from "../../service/AuthService";
import {ACCESS_TOKEN} from "../../config";
import {browserHistory} from "../../index";
import {message} from "antd";

export type AuthThunkAction = ThunkAction<void, AuthState, unknown, AuthAction>;

const authService: AuthService = new AuthService();

export const authorize = (loginOrEmail: string, password: string): AuthThunkAction => dispatch => {
    dispatch(AuthActionCreator.setAuthErrorAction(false, null));
    dispatch(AuthActionCreator.setAuthLoadingAction(true));

    authService.signIn(loginOrEmail, password)
        .then(data => {
            localStorage.setItem(ACCESS_TOKEN, data.token);
            dispatch(AuthActionCreator.setAuthStatusAction(true));
            dispatch(AuthActionCreator.setAuthLoadingAction(false));
            message.success("Успешно авторизован");
        })
        .catch(error => {
            let errorMessage: string;

            if (error.status === 401) {
                errorMessage = error.message === "Bad credentials" ? "Не верный логин или пароль" : "Аккаунт удалён"
            } else if (error.status === 400) {
                errorMessage = "Не корректные данные"
            } else {
                errorMessage = "Не предвиденная ошибка"
            }

            dispatch(AuthActionCreator.setAuthErrorAction(true, errorMessage));
            dispatch(AuthActionCreator.setAuthLoadingAction(false));
        })
};

export const register = (email: string, login: string, password: string, confirmPassword: string): AuthThunkAction => dispatch => {
    dispatch(AuthActionCreator.setAuthErrorAction(false, null));
    dispatch(AuthActionCreator.setAuthLoadingAction(true));

    authService.signUp(email, login, password, confirmPassword)
        .then(data => {
            browserHistory.push("/signin");
            dispatch(AuthActionCreator.setAuthLoadingAction(false));
            message.success("Успешно зарегестрирован");
        })
        .catch(error => {
            let errorMessage: string;
            if (error.status === 400) {
                errorMessage = "Не корректные данные";
                console.log(error)
            } else {
                errorMessage = "Не предвиденная ошибка";
                console.log(error)
            }

            dispatch(AuthActionCreator.setAuthErrorAction(true, errorMessage));
            dispatch(AuthActionCreator.setAuthLoadingAction(false));
        });
};

export const deAuthorize = (): AuthThunkAction => dispatch => {
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.href = "/";
};