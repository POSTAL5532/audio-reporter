import {UserAction, UserActionTypes, UserState} from "store/user/types";

const initialUserState: UserState = {
    loading: false,
    user: null
};

export const userReducer = (state: UserState = initialUserState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            };
        case UserActionTypes.SET_USER_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        default:
            return state
    }
};