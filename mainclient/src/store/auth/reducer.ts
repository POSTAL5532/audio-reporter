import {AuthAction, AuthState, SET_AUTH} from "./types";
import {ACCESS_TOKEN} from "../../config";

const initialAuthState: AuthState = {
    auth: !!localStorage.getItem(ACCESS_TOKEN)
};

export const authReducer = (state: AuthState = initialAuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                auth: action.auth
            };
        default:
            return state;
    }
};