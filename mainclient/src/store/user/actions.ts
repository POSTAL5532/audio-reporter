import {ThunkAction} from "redux-thunk";
import {UserAction, UserState} from "./types";
import UserActionCreator from "./UserActionCreator";
import UserService from "../../service/UserService";
import {ACCESS_TOKEN} from "../../config";

export type UserThunkAction = ThunkAction<void, UserState, unknown, UserAction>;

const userService: UserService = new UserService();

export const loadUser = (): UserThunkAction => dispatch => {
    dispatch(UserActionCreator.setUserLoadingAction(true));

    userService.getUser().then(data => {
        dispatch(UserActionCreator.setUserLoadingAction(false));
        dispatch(UserActionCreator.setUserAction(data));
    }).catch(error => {
        dispatch(UserActionCreator.setUserLoadingAction(false));
        if (error.status === 401){
            localStorage.removeItem(ACCESS_TOKEN);
            window.location.href = "/";
        }
    });
};