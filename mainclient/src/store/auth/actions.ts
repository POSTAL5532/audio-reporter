import {ThunkAction} from "redux-thunk";
import {AuthAction, AuthState, SET_AUTH} from "./types";

export type AuthThunkAction = ThunkAction<void, AuthState, unknown, AuthAction>;

export const setAuth = (auth: boolean): AuthAction => {
    return {
        type: SET_AUTH,
        auth: auth
    }
};