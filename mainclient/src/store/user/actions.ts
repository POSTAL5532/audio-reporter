import {ThunkAction} from "redux-thunk";
import {UserAction, UserState} from "./types";
import UserActionCreator from "./UserActionCreator";
import UserService from "../../service/UserService";

export type UserThunkAction = ThunkAction<void, UserState, unknown, UserAction>;

const userService: UserService = new UserService();

export const loadUser = (): UserThunkAction => dispatch => {
    dispatch(UserActionCreator.setUserLoadingAction(true));

    userService.getUser().then(data => {
        dispatch(UserActionCreator.setUserAction(data));
        dispatch(UserActionCreator.setUserLoadingAction(false));
    });
};