import {ThunkAction} from "redux-thunk";
import UserActionCreator from "logic/profile/UserActionCreator";
import UserService from "service/UserService";
import {HttpStatusCode} from "service/HttpStatusCode";
import {message} from "antd";
import {UserAction, UserInfo, UserState} from "logic/profile/userTypes";
import {deAuthorize} from "logic/auth/authActions";

export type UserThunkAction = ThunkAction<void, UserState, unknown, UserAction>;

const userService: UserService = new UserService();

export const loadUser = (): UserThunkAction => dispatch => {
    dispatch(UserActionCreator.setUserLoadingAction(true));

    userService.getUser().then(data => {
        dispatch(UserActionCreator.setUserAction(data));
        dispatch(UserActionCreator.setUserLoadingAction(false));
    });
};

export const editPersonalData = (login: string, email: string): UserThunkAction => dispatch => {
    dispatch(UserActionCreator.setUserChangePersonalDataError(null));
    dispatch(UserActionCreator.setUserLoadingAction(true));

    new UserService().editPersonalData(login, email)
        .then((data: UserInfo) => {
            dispatch(UserActionCreator.setUserAction(data));
            dispatch(UserActionCreator.setUserLoadingAction(false));
            message.success("Данные сохранены");
        })
        .catch(error => {
            let errorMessage: string;

            if (error.status === HttpStatusCode.BAD_REQUEST) {
                errorMessage = "Некорректные данные";
            } else {
                errorMessage = "Непредвиденная ошибка";
            }

            dispatch(UserActionCreator.setUserChangePersonalDataError(errorMessage));
            dispatch(UserActionCreator.setUserLoadingAction(false));
        });
};

export const editPassword = (oldPassword: string, newPassword: string, confirmPassword: string): UserThunkAction => dispatch => {
    dispatch(UserActionCreator.setUserChangePasswordError(null));
    dispatch(UserActionCreator.setUserLoadingAction(true));

    new UserService().editPassword(oldPassword, newPassword, confirmPassword)
        .then(() => {
            message.loading({
                content: "Пароль успешно изменён! Вы будете перенаправлены на страницу авторизации",
                key: "redirectMessage"
            });

            setTimeout(() => {
                deAuthorize();
            }, 3000);
        })
        .catch(error => {
            let errorMessage: string;

            if (error.status === HttpStatusCode.BAD_REQUEST && error.data.message === "BAD_OLD_PASSWORD") {
                errorMessage = "Неверный старый пароль";
            } else if (error.status === HttpStatusCode.BAD_REQUEST && error.data.message === "PASSWORDS_NOT_EQUAL") {
                errorMessage = "Пароли не совпадают";
            } else {
                errorMessage = "Непредвиденная ошибка";
            }

            dispatch(UserActionCreator.setUserChangePasswordError(errorMessage));
            dispatch(UserActionCreator.setUserLoadingAction(false));
        });
};
