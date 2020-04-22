import {UserAction, UserActionTypes, UserState} from "store/user/types";

const initialUserState: UserState = {
    loading: false,
    user: null,
    changePersonalDataError: null
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
        case UserActionTypes.SET_USER_CHANGE_PERSONAL_DATA_ERROR:
            return {
                ...state,
                changePersonalDataError: action.changePersonalDataError
            };
        default:
            return state
    }
};