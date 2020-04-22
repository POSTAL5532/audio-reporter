import {ThunkAction} from "redux-thunk";
import {UserAction, UserInfo, UserState} from "store/user/types";
import UserActionCreator from "store/user/UserActionCreator";
import UserService from "service/UserService";
import {HttpStatusCode} from "service/HttpStatusCode";
import {message} from "antd";

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
                errorMessage = "Некорректные данные"
            } else {
                errorMessage = "Непредвиденная ошибка"
            }

            dispatch(UserActionCreator.setUserChangePersonalDataError(errorMessage));
            dispatch(UserActionCreator.setUserLoadingAction(false));
        });
};